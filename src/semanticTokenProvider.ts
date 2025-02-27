import * as vscode from 'vscode';

export class PowerFXSemanticTokensProvider implements vscode.DocumentSemanticTokensProvider {
    private readonly tokenTypes = new Map<string, number>();
    private readonly legend: vscode.SemanticTokensLegend;

    constructor() {
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

    public getLegend(): vscode.SemanticTokensLegend {
        return this.legend;
    }

    async provideDocumentSemanticTokens(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): Promise<vscode.SemanticTokens> {
        const builder = new vscode.SemanticTokensBuilder(this.legend);
        
        for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber++) {
            const line = document.lineAt(lineNumber);
            const text = line.text;

            // Skip lines that are comments
            if (text.trim().startsWith('//')) {
                builder.push(
                    lineNumber,
                    0,
                    text.length,
                    this.tokenTypes.get('comment')!,
                    0
                );
                continue;
            }

            // Handle block comments
            if (text.includes('/*')) {
                const startIndex = text.indexOf('/*');
                builder.push(
                    lineNumber,
                    startIndex,
                    text.length - startIndex,
                    this.tokenTypes.get('comment')!,
                    0
                );
                continue;
            }

            // Only process non-comment sections
            if (!text.trim().startsWith('//') && !text.includes('/*')) {
                // Functions
                const functionRegex = /\b(Abs|Acceleration|Acos|Acot|AddColumns|AIClassify|AIExtract|AIReply|AISentiment|AISummarize|AITranslate|App|Asin|Assert|AsType|Atan|Atan2|Average|Back|Blank|Boolean|Calendar|Char|Choices|Clear|ClearCollect|ClearData|Clock|Coalesce|Collect|Color|ColorFade|ColorValue|Column|ColumnNames|Compass|Concat|Concatenate|Concurrent|Connection|Copy|Count|Cos|Cot|CountA|CountIf|CountRows|DataSourceInfo|Date|DateAdd|DateDiff|DateTime|DateTimeValue|DateValue|Day|Dec2Hex|Defaults|Degrees|Disable|Distinct|Download|DropColumns|EDate|EditForm|Enable|EncodeHTML|EncodeUrl|EndsWith|EOMonth|Error|Errors|Exit|Exp|Filter|Find|First|FirstN|ForAll|GroupBy|GUID|HashTags|Hex2Dec|Host|Hour|If|IfError|Index|Int|IsBlank|IsBlankOrError|IsEmpty|IsError|IsMatch|IsNumeric|ISOWeekNum|IsToday|IsType|IsUTCToday|JSON|Language|Last|LastN|Launch|Left|Len|Ln|LoadData|Location|Log|LookUp|Lower|Match|MatchAll|Max|Mid|Min|Minute|Mod|Month|Navigate|NewForm|Not|Notify|Now|Or|Param|Parent|ParseJSON|Patch|PDF|Pi|PlainText|Power|Proper|Radians|Rand|RandBetween|ReadNFC|RecordInfo|Refresh|Relate|Remove|RemoveIf|RenameColumns|Replace|RequestHide|Reset|ResetForm|Revert|RGBA|Right|Round|RoundDown|RoundUp|SaveData|Search|Second|Select|Self|Sequence|SendAppNotification|Set|SetFocus|SetProperty|ShowColumns|ShowHostInfo|Shuffle|Sin|Sort|SortByColumns|Split|Sqrt|StartsWith|StdevP|Substitute|SubmitForm|Sum|Switch|Table|Tan|Text|ThisItem|ThisRecord|Time|TimeValue|TimeZoneOffset|Today|Trace|Trim|TrimEnds|Trunc|Ungroup|UniChar|Unrelate|Update|UpdateContext|UpdateIf|Upper|User|UTCNow|UTCToday|Validate|Value|VarP|ViewForm|Weekday|WeekNum|With|Year)\b/g;
                let match: RegExpExecArray | null;
                while ((match = functionRegex.exec(text)) !== null) {
                    builder.push(
                        lineNumber,
                        match.index,
                        match[0].length,
                        this.tokenTypes.get('function')!,
                        0
                    );
                }

                // Keywords
                const keywordRegex = /\b(If|Switch|And|Or|Not|Parent|Self|ThisItem|ThisRecord)\b/g;
                while ((match = keywordRegex.exec(text)) !== null) {
                    builder.push(
                        lineNumber,
                        match.index,
                        match[0].length,
                        this.tokenTypes.get('keyword')!,
                        0
                    );
                }

                // Operators
                const operatorRegex = /(=|<|>|<=|>=|<>|\+|\-|\*|\/|\^|&&|\|\||&|in|exactin|%)/g;
                while ((match = operatorRegex.exec(text)) !== null) {
                    builder.push(
                        lineNumber,
                        match.index,
                        match[0].length,
                        this.tokenTypes.get('operator')!,
                        0
                    );
                }

                // Strings
                const stringRegex = /"[^"]*"|'[^']*'/g;
                while ((match = stringRegex.exec(text)) !== null) {
                    builder.push(
                        lineNumber,
                        match.index,
                        match[0].length,
                        this.tokenTypes.get('string')!,
                        0
                    );
                }

                // Numbers
                const numberRegex = /\b\d+(\\.\\d+)?([eE][+-]?\\d+)?\\b/g;
                while ((match = numberRegex.exec(text)) !== null) {
                    builder.push(
                        lineNumber,
                        match.index,
                        match[0].length,
                        this.tokenTypes.get('number')!,
                        0
                    );
                }

                // Boolean
                const booleanRegex = /\b(true|false)\b/g;
                while ((match = booleanRegex.exec(text)) !== null) {
                    builder.push(
                        lineNumber,
                        match.index,
                        match[0].length,
                        this.tokenTypes.get('boolean')!,
                        0
                    );
                }
            }
        }

        return builder.build();
    }
}

export function registerSemanticTokensProvider(context: vscode.ExtensionContext): void {
    const selector: vscode.DocumentSelector = { language: 'powerfx' };
    const provider = new PowerFXSemanticTokensProvider();

    context.subscriptions.push(
        vscode.languages.registerDocumentSemanticTokensProvider(
            selector,
            provider,
            provider.getLegend()
        )
    );
}
