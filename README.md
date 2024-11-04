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

Contributing

We welcome contributions to improve and expand this extension! Here’s how you can get involved:

	1.	Fork the Repository: Click on the “Fork” button at the top of the repository page on GitHub.
	2.	Clone Your Fork:

git clone https://github.com/your-username/powerfx-vscode-extension.git


	3.	Create a New Branch:

git checkout -b feature/your-feature-name


	4.	Make Your Changes: Improve the code, fix bugs, or add new features. Make sure to follow the coding standards and guidelines.
	5.	Test Your Changes: Run the extension in the Extension Development Host to ensure everything works as expected.
	6.	Commit and Push:

git commit -m "Description of your changes"
git push origin feature/your-feature-name


	7.	Open a Pull Request: Go to the original repository and open a pull request describing your changes and why they should be merged.

Reporting Issues

If you find any bugs or have suggestions for new features, please open an issue on the GitHub repository.

Code of Conduct

Please read and adhere to our Code of Conduct to ensure a welcoming environment for all contributors.

Known Issues

	•	Highlighting Inside Quotes: Function names and keywords will not be highlighted when used inside string literals, as intended. If you find any issues, please report them!

Development & Contribution

Setting Up

	1.	Clone the repository and open it in Visual Studio Code.
	2.	Press F5 to run the extension in the Extension Development Host for testing.

License

This extension is licensed under the MIT License.

Acknowledgments

	•	Thanks to the Power FX and Visual Studio Code communities for their support and inspiration.
	•	Special thanks to Microsoft for the Power FX language.

Enjoy coding with Power FX in Visual Studio Code! If you have any questions or feedback, feel free to reach out or submit an issue.

Notes

	•	Make sure to replace your-username and other placeholders with your actual GitHub information.
	•	Add a link to your LICENSE file and CODE_OF_CONDUCT.md if you create those files.