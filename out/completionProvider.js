"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCompletionItemProvider = registerCompletionItemProvider;
const vscode = __importStar(require("vscode"));
const formulas_1 = require("./formulas"); // Import the main formulas
function registerCompletionItemProvider(context) {
    // Define additional methods for specific formulas
    const methodDescriptions = {
        "User()": {
            "Email": "Email address of the current user. The User().Email function returns the user's UPN and not the SMTP email address.",
            "EntraObjectId": "Microsoft Entra Object ID of the current user, useful for calling APIs that use this value. This is a GUID value and unique for each user.",
            "FullName": "Full name of the current user, including first and last names.",
            "Image": "Image of the current user. This will be an image URL of the form 'blob:identifier'. Set the Image property of the Image control to this value to display the image in the app."
        }
        // Add more formulas and their methods here if needed
    };
    // Register the CompletionItemProvider
    const completionProvider = vscode.languages.registerCompletionItemProvider('powerfx', // Your language identifier
    {
        provideCompletionItems(document, position, token, context) {
            const completionItems = [];
            // Check the current text in the document to decide which completion items to show
            const textBeforeCursor = document.getText(new vscode.Range(new vscode.Position(position.line, 0), position));
            // If the text contains "User()", suggest its methods
            if (textBeforeCursor.includes("User()")) {
                const methods = methodDescriptions["User()"];
                for (const method in methods) {
                    const item = new vscode.CompletionItem(method, vscode.CompletionItemKind.Method);
                    item.detail = methods[method];
                    item.documentation = new vscode.MarkdownString(methods[method]);
                    completionItems.push(item);
                }
            }
            else {
                // Default to suggesting main formulas
                for (const formula in formulas_1.formulaDescriptions) {
                    const item = new vscode.CompletionItem(formula, vscode.CompletionItemKind.Function);
                    item.detail = formulas_1.formulaDescriptions[formula];
                    item.documentation = new vscode.MarkdownString(formulas_1.formulaDescriptions[formula]);
                    completionItems.push(item);
                }
            }
            return completionItems;
        }
    }, '(', '.' // Trigger IntelliSense on '(' or '.' characters
    );
    // Add the completionProvider to the context subscriptions
    context.subscriptions.push(completionProvider);
}
