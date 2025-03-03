import * as vscode from 'vscode';
import { registerHoverProvider } from './hoverProvider';
import { registerCompletionItemProvider } from './completionProvider'; // Import the completion provider
import { registerYamlEmbeddedLanguage } from 'yaml-embedded-languages'; // Pc75f

export function activate(context: vscode.ExtensionContext) {
    // Register HoverProvider and CompletionItemProvider
    registerHoverProvider(context);
    registerCompletionItemProvider(context); // Register IntelliSense
    registerYamlEmbeddedLanguage(context); // P02d6
}

export function deactivate() {}
