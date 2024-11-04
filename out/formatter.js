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
exports.activate = activate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('powerfx', {
        provideDocumentFormattingEdits(document) {
            const edits = [];
            const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length));
            const formattedText = formatPowerFxCode(document.getText());
            edits.push(vscode.TextEdit.replace(fullRange, formattedText));
            return edits;
        }
    }));
}
function formatPowerFxCode(code) {
    const lines = code.split('\n');
    let formattedLines = [];
    let indentLevel = 0;
    const indentString = '  '; // 2 spaces for indentation
    for (let line of lines) {
        line = line.trim();
        // Handle function calls that open with '(' but do not end on the same line
        if (line.match(/^[a-zA-Z_][a-zA-Z0-9_]*\s*\(/) && !line.endsWith(');')) {
            const functionName = line.split('(')[0].trim();
            formattedLines.push(indentString.repeat(indentLevel) + `${functionName}(`);
            indentLevel++;
            continue;
        }
        // Handle lines that are object or array opening
        if (line.startsWith('{') || line.startsWith('[')) {
            formattedLines.push(indentString.repeat(indentLevel) + line);
            indentLevel++;
            continue;
        }
        // Handle lines that are object or array closing
        if (line.startsWith('}') || line.startsWith(']')) {
            indentLevel = Math.max(indentLevel - 1, 0);
            formattedLines.push(indentString.repeat(indentLevel) + line);
            continue;
        }
        // Handle arguments within function calls, ensuring commas are added correctly
        if (line.endsWith(',') || line.endsWith('},')) {
            formattedLines.push(indentString.repeat(indentLevel) + line);
            continue;
        }
        // Handle function call closing, such as ');'
        if (line.endsWith(');')) {
            indentLevel = Math.max(indentLevel - 1, 0);
            formattedLines.push(indentString.repeat(indentLevel) + line);
            continue;
        }
        // Default case for other lines
        formattedLines.push(indentString.repeat(indentLevel) + line);
    }
    return formattedLines.join('\n');
}
