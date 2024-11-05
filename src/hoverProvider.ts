import * as vscode from 'vscode';
import { formulaDescriptions } from './formulas'; // Import the formulas

export function registerHoverProvider(context: vscode.ExtensionContext) {
    // Register the HoverProvider
    const hoverProvider = vscode.languages.registerHoverProvider('powerfx', {
        provideHover(document, position, token) {
            // Get the word at the current position
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);

            // Check if the word has hover information
            if (formulaDescriptions[word]) {
                const hoverText = new vscode.MarkdownString(`**${word}** – ${formulaDescriptions[word]}`);
                return new vscode.Hover(hoverText);
            }

            return; // No hover information
        }
    });

    // Add the hoverProvider to the context subscriptions
    context.subscriptions.push(hoverProvider);
}