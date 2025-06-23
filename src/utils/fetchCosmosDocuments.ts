import { EmailAttachment } from "../types/events";

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedAt: string;
}

interface IndividualShareholder {
  fullName: string;
  passportDocument?: DocumentItem[];
  residentialAddressDocument?: DocumentItem[];
  singaporeIC?: DocumentItem[];
  [key: string]: any;
}

interface UserData {
  incorporationCertificate?: DocumentItem[];
  shareholdingChart?: DocumentItem[];
  cddDocument?: DocumentItem[];
  individualShareholders?: {
    [key: string]: IndividualShareholder;
  };
  [key: string]: any;
}

// Conservative limits to ensure we stay well under 10MB
const MAX_EMAIL_SIZE_MB = 8; // Much more conservative
const MAX_EMAIL_SIZE_BYTES = MAX_EMAIL_SIZE_MB * 1024 * 1024;
const MAX_INDIVIDUAL_FILE_SIZE_MB = 1.5; // Smaller individual file limit
const MAX_INDIVIDUAL_FILE_SIZE_BYTES = MAX_INDIVIDUAL_FILE_SIZE_MB * 1024 * 1024;

/**
 * More accurate size estimation for email payload
 * Accounts for base64 encoding overhead and JSON structure
 */
function estimateEmailPayloadSize(attachments: EmailAttachment[]): number {
  let totalSize = 0;
  
  for (const attachment of attachments) {
    // Base64 content size
    const base64Size = attachment.contentInBase64.length;
    
    // Add overhead for JSON structure (name, contentType, etc.)
    const jsonOverhead = JSON.stringify({
      name: attachment.name,
      contentType: attachment.contentType,
      contentInBase64: ""
    }).length + 100; // Extra buffer for JSON formatting
    
    totalSize += base64Size + jsonOverhead;
  }
  
  // Add overhead for the entire email structure (headers, body, etc.)
  const emailStructureOverhead = 50 * 1024; // 50KB for email metadata
  
  return totalSize + emailStructureOverhead;
}

/**
 * Converts URL to base64 with strict size validation
 */
async function urlToBase64WithStrictValidation(
  url: string,
  documentName: string
): Promise<{ content: string; size: number } | null> {
  try {
    console.log(`Fetching document: ${documentName} from ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch ${documentName}: ${response.statusText}`);
      return null;
    }

    // Check content length if available
    const contentLength = response.headers.get("content-length");
    if (contentLength) {
      const fileSizeBytes = parseInt(contentLength);
      console.log(`Document ${documentName} size: ${(fileSizeBytes / 1024 / 1024).toFixed(2)}MB`);
      
      if (fileSizeBytes > MAX_INDIVIDUAL_FILE_SIZE_BYTES) {
        console.warn(`Document ${documentName} too large (${(fileSizeBytes / 1024 / 1024).toFixed(2)}MB), skipping`);
        return null;
      }
    }

    const arrayBuffer = await response.arrayBuffer();
    const actualSize = arrayBuffer.byteLength;
    
    console.log(`Actual downloaded size for ${documentName}: ${(actualSize / 1024 / 1024).toFixed(2)}MB`);
    
    if (actualSize > MAX_INDIVIDUAL_FILE_SIZE_BYTES) {
      console.warn(`Document ${documentName} exceeds size limit after download, skipping`);
      return null;
    }

    const buffer = Buffer.from(arrayBuffer);
    const base64Content = buffer.toString("base64");
    
    // Calculate the actual base64 size
    const base64Size = base64Content.length;
    console.log(`Base64 size for ${documentName}: ${(base64Size / 1024 / 1024).toFixed(2)}MB`);
    
    return {
      content: base64Content,
      size: base64Size
    };
  } catch (error) {
    console.error(`Error processing document ${documentName}:`, error);
    return null;
  }
}

/**
 * Processes documents with real-time size tracking
 */
async function processDocumentsWithRealTimeTracking(
  documents: DocumentItem[],
  prefix: string,
  currentAttachments: EmailAttachment[]
): Promise<EmailAttachment[]> {
  const newAttachments: EmailAttachment[] = [];
  
  console.log(`Processing ${documents.length} documents with prefix: ${prefix}`);

  for (let i = 0; i < documents.length; i++) {
    const doc = documents[i];
    
    // Check current total size before processing next document
    const currentTotalSize = estimateEmailPayloadSize([...currentAttachments, ...newAttachments]);
    const currentSizeMB = (currentTotalSize / 1024 / 1024).toFixed(2);
    
    console.log(`Current email payload size: ${currentSizeMB}MB`);
    
    if (currentTotalSize > MAX_EMAIL_SIZE_BYTES * 0.7) { // Stop at 70% to be safe
      console.warn(`Approaching email size limit (${currentSizeMB}MB), stopping document processing`);
      break;
    }

    const result = await urlToBase64WithStrictValidation(doc.url, doc.name);
    
    if (result) {
      const testAttachment: EmailAttachment = {
        name: `${prefix}_${doc.name || (i + 1)}`,
        contentType: doc.type,
        contentInBase64: result.content,
      };
      
      // Test if adding this attachment would exceed the limit
      const testTotalSize = estimateEmailPayloadSize([...currentAttachments, ...newAttachments, testAttachment]);
      
      if (testTotalSize > MAX_EMAIL_SIZE_BYTES) {
        console.warn(`Adding document ${doc.name} would exceed email size limit, stopping`);
        break;
      }
      
      newAttachments.push(testAttachment);
      console.log(`Successfully added: ${doc.name}, new total: ${(testTotalSize / 1024 / 1024).toFixed(2)}MB`);
    }
  }

  return newAttachments;
}

function isDocumentArray(value: any): value is DocumentItem[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.url === "string" &&
        typeof item.name === "string" &&
        typeof item.type === "string"
    )
  );
}

/**
 * Processes shareholder documents with size tracking
 */
async function processShareholderDocumentsWithTracking(
  shareholders: { [key: string]: IndividualShareholder },
  currentAttachments: EmailAttachment[]
): Promise<EmailAttachment[]> {
  const allNewAttachments: EmailAttachment[] = [];

  for (const [shareholderId, shareholder] of Object.entries(shareholders)) {
    const currentTotal = estimateEmailPayloadSize([...currentAttachments, ...allNewAttachments]);
    
    if (currentTotal > MAX_EMAIL_SIZE_BYTES * 0.7) {
      console.warn(`Email size limit approaching, skipping remaining shareholders`);
      break;
    }

    const shareholderName = shareholder.fullName?.replace(/[^a-zA-Z0-9]/g, "_") || shareholderId;

    for (const [key, value] of Object.entries(shareholder)) {
      if (isDocumentArray(value)) {
        console.log(`Processing shareholder documents: ${shareholderName}_${key}`);
        const docs = await processDocumentsWithRealTimeTracking(
          value,
          `${shareholderName}_${key}`,
          [...currentAttachments, ...allNewAttachments]
        );
        allNewAttachments.push(...docs);
        
        // Check size after each shareholder document type
        const newTotal = estimateEmailPayloadSize([...currentAttachments, ...allNewAttachments]);
        if (newTotal > MAX_EMAIL_SIZE_BYTES * 0.7) {
          console.warn(`Size limit reached after processing ${shareholderName}_${key}`);
          return allNewAttachments;
        }
      }
    }
  }

  return allNewAttachments;
}

/**
 * Main extraction function with comprehensive size control
 */
export async function extractAllDocuments(userData: UserData): Promise<EmailAttachment[]> {
  console.log(`Starting document extraction with ${MAX_EMAIL_SIZE_MB}MB limit`);
  
  let allAttachments: EmailAttachment[] = [];

  try {
    // Process individualShareholders first (usually most important)
    if (userData.individualShareholders && typeof userData.individualShareholders === "object") {
      console.log("Processing individual shareholders documents...");
      const shareholderAttachments = await processShareholderDocumentsWithTracking(
        userData.individualShareholders,
        allAttachments
      );
      allAttachments.push(...shareholderAttachments);
    }

    // Process root-level documents
    const rootLevelKeys = Object.keys(userData).filter(key => 
      key !== "individualShareholders" && isDocumentArray(userData[key])
    );
    
    console.log(`Found ${rootLevelKeys.length} root-level document arrays:`, rootLevelKeys);

    for (const key of rootLevelKeys) {
      const currentSize = estimateEmailPayloadSize(allAttachments);
      if (currentSize > MAX_EMAIL_SIZE_BYTES * 0.7) {
        console.warn(`Size limit reached, skipping remaining root-level documents`);
        break;
      }

      console.log(`Processing root-level documents: ${key}`);
      const docs = await processDocumentsWithRealTimeTracking(
        userData[key] as DocumentItem[],
        key,
        allAttachments
      );
      allAttachments.push(...docs);
    }

    const finalSize = estimateEmailPayloadSize(allAttachments);
    const finalSizeMB = (finalSize / 1024 / 1024).toFixed(2);
    
    console.log(`=== FINAL SUMMARY ===`);
    console.log(`Total documents processed: ${allAttachments.length}`);
    console.log(`Estimated email payload size: ${finalSizeMB}MB`);
    console.log(`Size limit: ${MAX_EMAIL_SIZE_MB}MB`);
    console.log(`Size percentage: ${((finalSize / MAX_EMAIL_SIZE_BYTES) * 100).toFixed(1)}%`);
    
    if (finalSize > MAX_EMAIL_SIZE_BYTES) {
      console.error(`WARNING: Estimated size (${finalSizeMB}MB) exceeds limit!`);
      // Remove attachments until we're under the limit
      while (allAttachments.length > 0 && estimateEmailPayloadSize(allAttachments) > MAX_EMAIL_SIZE_BYTES) {
        const removed = allAttachments.pop();
        console.warn(`Removed attachment to reduce size: ${removed?.name}`);
      }
      
      const adjustedSize = estimateEmailPayloadSize(allAttachments);
      console.log(`Adjusted size after removals: ${(adjustedSize / 1024 / 1024).toFixed(2)}MB`);
    }

    return allAttachments;
  } catch (error) {
    console.error("Error in extractAllDocuments:", error);
    throw error;
  }
}

/**
 * Updated getCosmosDocuments function with enhanced logging
 */
export async function getCosmosDocuments(instanceId: string): Promise<EmailAttachment[]> {
  if (!instanceId) {
    console.log("No instanceId provided, returning empty attachments");
    return [];
  }

  try {
    console.log(`Fetching Cosmos documents for instance: ${instanceId}`);
    
    const response = await fetch(`http://localhost:3000/api/form-data/${instanceId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const userData: any = await response.json();
    console.log("Successfully fetched user data from Cosmos");

    const processedDocuments = await extractAllDocuments(userData);
    
    console.log(`Returning ${processedDocuments.length} processed documents`);
    return processedDocuments;
  } catch (error) {
    console.error("Error in getCosmosDocuments:", error);
    return [];
  }
}