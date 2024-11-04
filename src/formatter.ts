import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider('powerfx', {
            provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
                const edits: vscode.TextEdit[] = [];
                const fullRange = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(document.getText().length)
                );
                const formattedText = formatPowerFxCode(document.getText());
                edits.push(vscode.TextEdit.replace(fullRange, formattedText));
                return edits;
            }
        })
    );
}

function formatPowerFxCode(code: string): string {
    const lines = code.split('\n');
    let formattedLines: string[] = [];
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