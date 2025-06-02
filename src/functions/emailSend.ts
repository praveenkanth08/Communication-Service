// src/functions/emailSend.ts - Azure Functions wrapper for single email
import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";
import {
  EmailController,
  RequestContext,
  HandlerResponse,
} from "@/controller/emailController";

const emailController = new EmailController();

// Helper to convert Azure Functions request to our common format
const createAzureContext = async (
  request: HttpRequest
): Promise<RequestContext> => ({
  body: await request.json(),
  headers: Object.fromEntries(request.headers.entries()),
  clientId:
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-client-ip") ||
    "unknown",
});

const createAzureResponse = (
  handlerResponse: HandlerResponse
): HttpResponseInit => ({
  status: handlerResponse.statusCode,
  jsonBody: handlerResponse.body,
});

// Email send function
async function emailSend(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  try {
    const requestContext = await createAzureContext(request);
    const response = await emailController.handleEmailSend(requestContext);
    return createAzureResponse(response);
  } catch (error) {
    context.error("Error in emailSend function:", error);
    return {
      status: 500,
      jsonBody: {
        success: false,
        error: "Internal server error",
      },
    };
  }
}

// Register Azure Function
app.http("emailSend", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "email/send",
  handler: emailSend,
});
