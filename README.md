work in progress...
please report any and all bugs and problems.


A Processing (pde) formatter for VSCode

## Installation

how to install a VSIX file: [code.visualstudio.com/docs/editor/extension-gallery](https://code.visualstudio.com/docs/editor/extension-gallery#:~:text=Install%20from%20a%20VSIX%23&text=Using%20the%20Install%20from%20VSIX,vsix%20file.)

It uses the Formatting API so use the following command for formating:
Format Document (`Shift+Alt+F`) - Format the entire active file.
Format Selection (`Ctrl+K Ctrl+F`) - Format the selected text.


## Formatting examples

Before | After
------------ | -------------
`if( i==k){} ;` | `if (i == k) {};`
`int k=i&1;` | `int k = i & 1;`
`if (i == k &&`<br>`i != 0)`<br>`myFunction();` | `if (i == k &&`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`i != 0)`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`myFunction();`