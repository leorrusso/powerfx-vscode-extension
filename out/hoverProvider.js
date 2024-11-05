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
exports.registerHoverProvider = registerHoverProvider;
const vscode = __importStar(require("vscode"));
const formulas_1 = require("./formulas"); // Import the formulas
function registerHoverProvider(context) {
    // Register the HoverProvider
    const hoverProvider = vscode.languages.registerHoverProvider('powerfx', {
        provideHover(document, position, token) {
            // Get the word at the current position
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range);
            // Check if the word has hover information
            if (formulas_1.formulaDescriptions[word]) {
                const hoverText = new vscode.MarkdownString(`**${word}** – ${formulas_1.formulaDescriptions[word]}`);
                return new vscode.Hover(hoverText);
            }
            return; // No hover information
        }
    });
    // Add the hoverProvider to the context subscriptions
    context.subscriptions.push(hoverProvider);
}
