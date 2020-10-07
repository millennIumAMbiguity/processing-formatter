# Processing (pde) formatter for VSCode

## Installation

See [releases](https://github.com/millennIumAMbiguity/processing-formatter/releases) for downloads.

How to install a VSIX file: [code.visualstudio.com/docs/editor/extension-gallery](https://code.visualstudio.com/docs/editor/extension-gallery#:~:text=Install%20from%20a%20VSIX%23&text=Using%20the%20Install%20from%20VSIX,vsix%20file.)

## Usage

It uses the Formatting API so use the following command for formating:
* Format Document (`Shift+Alt+F`) - Format the entire active file.
* Format Selection (`Ctrl+K Ctrl+F`) - Format the selected text.

## Features
* Handles spaces between operators, brackets, and so on.
* Handles horizontal spacing.

## Formatting examples

Before | After
------------ | -------------
`if( i==k){} ;` | `if (i == k) {};`
`int k=i&1;` | `int k = i & 1;`
`if (i == k &&`<br>`i != 0)`<br>`myFunction();` | `if (i == k &&`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`i != 0)`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`myFunction();`
