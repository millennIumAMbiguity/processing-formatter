# Processing (pde) formatter for VSCode

[![Version](https://vsmarketplacebadges.dev/version-short/millenniumambiguity.processing-formatter.svg)](https://marketplace.visualstudio.com/items?itemName=millenniumambiguity.processing-formatter)
[![Downloads](https://vsmarketplacebadges.dev/downloads-short/millenniumambiguity.processing-formatter.svg)](https://marketplace.visualstudio.com/items?itemName=millenniumambiguity.processing-formatter)
[![Ratings](https://vsmarketplacebadges.dev/rating-star/millenniumambiguity.processing-formatter.svg)](https://marketplace.visualstudio.com/items?itemName=millenniumambiguity.processing-formatter)

## Usage
It uses the Formatting API so use the following command for formating: <br>
* On Windows <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>F</kbd>
* On Linux <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd>
* On Mac <kbd>Shift</kbd> + <kbd>Option</kbd> + <kbd>F</kbd>

It is recommended to use `Insert Spaces` for the best possible experience.

## Features
* Handles spaces between operators, brackets, and so on.
* Handles horizontal spacing.
* Edit formatting settings to your preferences.

## Formatting examples

Before | After
------------ | -------------
`if( i==k){} ;` | `if (i == k) {};`
`int k=i&1;` | `int k = i & 1;`
`if (i == k &&`<br>`i != 0)`<br>`myFunction();` | `if (i == k &&`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`i != 0)`<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`myFunction();`
