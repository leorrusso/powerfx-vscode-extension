# Power FX Language Support for Visual Studio Code

Welcome to the Power FX Language Support extension for Visual Studio Code! This extension provides comprehensive syntax highlighting for Power FX, the formula language used in Microsoft Power Apps. Whether you’re developing complex formulas or just starting with Power FX, this extension aims to make your coding experience smoother and more intuitive.

Features

	•	Syntax Highlighting: Accurate and visually appealing syntax highlighting for Power FX formulas, including:
	•	Keywords: If, Switch, And, Or, Not, etc.
	•	Operators: =, <>, &&, ||, in, exactin, etc.
	•	Boolean Literals: true and false
	•	Function Names: Highlighting for over 200 built-in Power FX functions
	•	Comments: Both single-line (//) and block (/* ... */) comments
	•	String Literals: Support for single and double-quoted strings
	•	Numbers: Recognition of numeric constants

Installation

	1.	Clone or Download: If you are testing locally, ensure you have the extension files ready.
	2.	Package Your Extension:

vsce package

This will generate a .vsix file for your extension.

	3.	Install the VSIX File:
	•	Open Visual Studio Code.
	•	Go to the Extensions view (Ctrl + Shift + X or Cmd + Shift + X on macOS).
	•	Click on the three dots in the top-right corner and select “Install from VSIX…”.
	•	Select your packaged .vsix file and reload VS Code.

Usage

	•	Open a Power FX File: Create or open a file with the .fx extension to see the syntax highlighting in action.
	•	Custom Highlighting: The extension provides detailed and customizable syntax scopes for Power FX elements. You can personalize the colors through your VS Code theme settings.

Language Features

	1.	Keywords & Control Structures: Highlighting for control flow constructs like If, Switch, and logical operators.
	2.	Built-In Functions: Includes highlighting for popular functions such as Abs, Sum, Filter, Patch, Rand, and more.
	3.	Comment Support: Easily distinguish comments in your code using intuitive green highlighting.
	4.	Number and String Recognition: Automatic recognition and highlighting of numeric literals and string values.
	5.	Operator Highlighting: Clear differentiation of mathematical and logical operators.

Known Issues

	•	Highlighting Inside Quotes: Function names and keywords will not be highlighted when used inside string literals, as intended. If you find any issues, please report them!

Development & Contribution

Setting Up

	1.	Clone the repository and open it in Visual Studio Code.
	2.	Press F5 to run the extension in the Extension Development Host for testing.

Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or create a pull request on the GitHub repository.

License

This extension is licensed under the MIT License.

Acknowledgments

	•	Thanks to the Power FX and Visual Studio Code communities for their support and inspiration.
	•	Special thanks to Microsoft for the Power FX language.

Enjoy coding with Power FX in Visual Studio Code! If you have any questions or feedback, feel free to reach out or submit an issue.