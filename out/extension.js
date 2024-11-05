"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const hoverProvider_1 = require("./hoverProvider");
const completionProvider_1 = require("./completionProvider"); // Import the completion provider
function activate(context) {
    // Register HoverProvider and CompletionItemProvider
    (0, hoverProvider_1.registerHoverProvider)(context);
    (0, completionProvider_1.registerCompletionItemProvider)(context); // Register IntelliSense
}
function deactivate() { }
