// src/functions/index.ts - Main Azure Functions entry point
// This file imports and registers all Azure Functions

// Import all function definitions
import "./emailSend";
import "./emailBulkSend";

// The functions are automatically registered when imported
// because they call app.http() in their respective files

console.log("Azure Functions registered: emailSend, emailBulkSend");
