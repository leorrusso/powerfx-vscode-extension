import * as vscode from 'vscode';
import { registerHoverProvider } from './hoverProvider';
import { registerCompletionItemProvider } from './completionProvider'; // Import the completion provider

export function activate(context: vscode.ExtensionContext) {
    // Register HoverProvider and CompletionItemProvider
    registerHoverProvider(context);
    registerCompletionItemProvider(context); // Register IntelliSense
}

export function deactivate() {}