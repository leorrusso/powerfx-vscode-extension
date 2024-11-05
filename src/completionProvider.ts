import * as vscode from 'vscode';
import { formulaDescriptions } from './formulas'; // Import the main formulas

export function registerCompletionItemProvider(context: vscode.ExtensionContext) {
    // Define additional methods for specific formulas
    const methodDescriptions: { [key: string]: { [method: string]: string } } = {
        "User()": {
            "Email": "Email address of the current user. The User().Email function returns the user's UPN and not the SMTP email address.",
            "EntraObjectId": "Microsoft Entra Object ID of the current user, useful for calling APIs that use this value. This is a GUID value and unique for each user.",
            "FullName": "Full name of the current user, including first and last names.",
            "Image": "Image of the current user. This will be an image URL of the form 'blob:identifier'. Set the Image property of the Image control to this value to display the image in the app."
        }
        // Add more formulas and their methods here if needed
    };

    // Register the CompletionItemProvider
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        'powerfx', // Your language identifier
        {
            provideCompletionItems(document, position, token, context) {
                const completionItems: vscode.CompletionItem[] = [];

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
                } else {
                    // Default to suggesting main formulas
                    for (const formula in formulaDescriptions) {
                        const item = new vscode.CompletionItem(formula, vscode.CompletionItemKind.Function);
                        item.detail = formulaDescriptions[formula];
                        item.documentation = new vscode.MarkdownString(formulaDescriptions[formula]);
                        completionItems.push(item);
                    }
                }

                return completionItems;
            }
        },
        '(', '.' // Trigger IntelliSense on '(' or '.' characters
    );

    // Add the completionProvider to the context subscriptions
    context.subscriptions.push(completionProvider);
}