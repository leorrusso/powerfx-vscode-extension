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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerFXSemanticTokensProvider = void 0;
exports.registerSemanticTokensProvider = registerSemanticTokensProvider;
const vscode = __importStar(require("vscode"));
class PowerFXSemanticTokensProvider {
    constructor() {
        this.tokenTypes = new Map();
        const tokenTypesLegend = [
            'function',
            'keyword',
            'operator',
            'string',
            'number',
            'comment',
            'boolean'
        ];
        tokenTypesLegend.forEach((tokenType, index) => this.tokenTypes.set(tokenType, index));
        this.legend = new vscode.SemanticTokensLegend(tokenTypesLegend);
    }
    getLegend() {
        return this.legend;
    }
    provideDocumentSemanticTokens(document, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const builder = new vscode.SemanticTokensBuilder(this.legend);
            for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber++) {
                const line = document.lineAt(lineNumber);
                const text = line.text;
                // Skip lines that are comments
                if (text.trim().startsWith('//')) {
                    builder.push(lineNumber, 0, text.length, this.tokenTypes.get('comment'), 0);
                    continue;
                }
                // Handle block comments
                if (text.includes('/*')) {
                    const startIndex = text.indexOf('/*');
                    builder.push(lineNumber, startIndex, text.length - startIndex, this.tokenTypes.get('comment'), 0);
                    continue;
                }
                // Only process non-comment sections
                if (!text.trim().startsWith('//') && !text.includes('/*')) {
                    // Functions
                    const functionRegex = /\b(Abs|Acceleration|Acos|Acot|AddColumns|AIClassify|AIExtract|AIReply|AISentiment|AISummarize|AITranslate|App|Asin|Assert|AsType|Atan|Atan2|Average|Back|Blank|Boolean|Calendar|Char|Choices|Clear|ClearCollect|ClearData|Clock|Coalesce|Collect|Color|ColorFade|ColorValue|Column|ColumnNames|Compass|Concat|Concatenate|Concurrent|Connection|Copy|Count|Cos|Cot|CountA|CountIf|CountRows|DataSourceInfo|Date|DateAdd|DateDiff|DateTime|DateTimeValue|DateValue|Day|Dec2Hex|Defaults|Degrees|Disable|Distinct|Download|DropColumns|EDate|EditForm|Enable|EncodeHTML|EncodeUrl|EndsWith|EOMonth|Error|Errors|Exit|Exp|Filter|Find|First|FirstN|ForAll|GroupBy|GUID|HashTags|Hex2Dec|Host|Hour|If|IfError|Index|Int|IsBlank|IsBlankOrError|IsEmpty|IsError|IsMatch|IsNumeric|ISOWeekNum|IsToday|IsType|IsUTCToday|JSON|Language|Last|LastN|Launch|Left|Len|Ln|LoadData|Location|Log|LookUp|Lower|Match|MatchAll|Max|Mid|Min|Minute|Mod|Month|Navigate|NewForm|Not|Notify|Now|Or|Param|Parent|ParseJSON|Patch|PDF|Pi|PlainText|Power|Proper|Radians|Rand|RandBetween|ReadNFC|RecordInfo|Refresh|Relate|Remove|RemoveIf|RenameColumns|Replace|RequestHide|Reset|ResetForm|Revert|RGBA|Right|Round|RoundDown|RoundUp|SaveData|Search|Second|Select|Self|Sequence|SendAppNotification|Set|SetFocus|SetProperty|ShowColumns|ShowHostInfo|Shuffle|Sin|Sort|SortByColumns|Split|Sqrt|StartsWith|StdevP|Substitute|SubmitForm|Sum|Switch|Table|Tan|Text|ThisItem|ThisRecord|Time|TimeValue|TimeZoneOffset|Today|Trace|Trim|TrimEnds|Trunc|Ungroup|UniChar|Unrelate|Update|UpdateContext|UpdateIf|Upper|User|UTCNow|UTCToday|Validate|Value|VarP|ViewForm|Weekday|WeekNum|With|Year)\b/g;
                    let match;
                    while ((match = functionRegex.exec(text)) !== null) {
                        builder.push(lineNumber, match.index, match[0].length, this.tokenTypes.get('function'), 0);
                    }
                    // Keywords
                    const keywordRegex = /\b(If|Switch|And|Or|Not|Parent|Self|ThisItem|ThisRecord)\b/g;
                    while ((match = keywordRegex.exec(text)) !== null) {
                        builder.push(lineNumber, match.index, match[0].length, this.tokenTypes.get('keyword'), 0);
                    }
                    // Operators
                    const operatorRegex = /(=|<|>|<=|>=|<>|\+|\-|\*|\/|\^|&&|\|\||&|in|exactin|%)/g;
                    while ((match = operatorRegex.exec(text)) !== null) {
                        builder.push(lineNumber, match.index, match[0].length, this.tokenTypes.get('operator'), 0);
                    }
                    // Strings
                    const stringRegex = /"[^"]*"|'[^']*'/g;
                    while ((match = stringRegex.exec(text)) !== null) {
                        builder.push(lineNumber, match.index, match[0].length, this.tokenTypes.get('string'), 0);
                    }
                    // Numbers
                    const numberRegex = /\b\d+(\\.\\d+)?([eE][+-]?\\d+)?\\b/g;
                    while ((match = numberRegex.exec(text)) !== null) {
                        builder.push(lineNumber, match.index, match[0].length, this.tokenTypes.get('number'), 0);
                    }
                    // Boolean
                    const booleanRegex = /\b(true|false)\b/g;
                    while ((match = booleanRegex.exec(text)) !== null) {
                        builder.push(lineNumber, match.index, match[0].length, this.tokenTypes.get('boolean'), 0);
                    }
                }
            }
            return builder.build();
        });
    }
}
exports.PowerFXSemanticTokensProvider = PowerFXSemanticTokensProvider;
function registerSemanticTokensProvider(context) {
    const selector = { language: 'powerfx' };
    const provider = new PowerFXSemanticTokensProvider();
    context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider(selector, provider, provider.getLegend()));
}
