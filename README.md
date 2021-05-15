# Processing (pde) formatter for VSCode

[![Version](https://vsmarketplacebadge.apphb.com/version/millenniumambiguity.processing-formatter.svg)](https://marketplace.visualstudio.com/items?itemName=millenniumambiguity.processing-formatter)
[![Visual Studio Marketplace](https://vsmarketplacebadge.apphb.com/installs/millenniumambiguity.processing-formatter.svg)](https://marketplace.visualstudio.com/items?itemName=millenniumambiguity.processing-formatter)
[![Ratings](https://vsmarketplacebadge.apphb.com/rating/millenniumambiguity.processing-formatter.svg)](https://marketplace.visualstudio.com/items?itemName=millenniumambiguity.processing-formatter)

## Usage
It uses the Formatting API so use the following command for formating: <br>
* On Windows <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd>
* On Linux <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>
* On Mac <kbd>Shift</kbd> + <kbd>Option</kbd> + <kbd>F</kbd>

It is recommended to use `Insert Spaces` for the best possible experience.

## Features
* Handles spaces between operators, brackets, and so on.
* Handles horizontal spacing.
* Inline formatting arguments.
* Edit formatting settings to your preferences.

## Formatting examples

Before | After
------------ | -------------
`if( i==k){} ;` | `if (i == k) {};`
`int k=i&1;` | `int k = i & 1;`
`if (i == k &&`<br>`i != 0)`<br>`myFunction();` | `if (i == k &&`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`i != 0)`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`myFunction();`

## Inline arguments
Inline formatting arguments are a feature to change how the format formats the code by typing in arguments in comments. Arguments are not case sensitive and will ignore spaces. You can add thes arguments like this: `//[argument 1][argument 2]`

You can enable, disable, and toggle arguments.
* `[Ignore Argument]` -> disable Argument.
* `[Apply Argument]` -> enable Argument.
* `[Argument]` -> toggle Argument.

#### Available arguments

* Formatting.
Disable or Enable formatting.
Formatting will also affect spacing.

* Spacing.
Disable or Enable spacing.