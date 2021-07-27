### 0.5.0
- Added inline formatting arguments. 
- Updated `README.md`.
- Added more options in the config.

### 0.4.6
- Fixed small issue.

### 0.4.5
- Fixed bug that could appear on the ending brackets one tabbed.
- Improved formatting jumping speed per formatting.

### 0.4.4
- Added support for switch cases without break. #4 (read commit for more detail)
- Improved spacing formation smoothness for bracketless if, else, for...

### 0.4.3
- Fixed bug when variable is set to negativ: `myInt = - 1;` -> `myInt = -1;`.
- Fixed issue with the format not inserting spaces: `i +=1;` -> `i += 1;`.
- Performance improvements.

### 0.4.2
- Fixed error on formatting negative numbers. #5 
- Update changelog format.

### 0.4.1
- Added support for formatting switch statements. #4

### 0.4.0
- The formatter honor the current indentation mode of the current file. #2
- Added support for different tab spaces. 
- Fixed bug that caused the formation to stop working in cases like `( (`.
- Now supports changes in settings without a restart.

### 0.3.14
- Added feature that makes formatting to ignore strings. #1
- Fixed bug that caused multiline comments to format on the first row.

### 0.3.13
- Fixed problem with the `logChanges` setting.
- `logChanges` setting is now set to `false` as default.
- Added formatting as shown: `}else if ()` -> `} else if ()`.

### 0.3.12
- Fixed occurrences when formatting didn't remove all extra tabs.
- Fixed formatting error on `else if`.

### 0.3.11
- Fixed formatting error when converting from spaces to tabs.
- Fixed formatting conflict when a class's `{` is on new row;
- Fixed problem of random spaces occurring during horizontal formatting.
- Added setting to disable logs.

### 0.3.10
- Fixed formatting error on lists.
- Added project to the Extension Marketplace.

### 0.3.9
- Added proper support for bracketless `for`, `else`, and `if`.

### 0.3.8
- Added formatting for selected `(` `)`.

### 0.3.7
- Fixed issue that occurred when a variable had `for`, `else`, or `if` in the name.

### 0.3.6
- Fixed incorrect formatting of horizontal spacing on `}`.

### 0.3.5
- Added formatting for `for` and `else`.

### 0.3.4
- Fixed formatting issue with improper horizontal spacing in special cases.

### 0.3.3
- Fixed formatting conflict when `(` was after an operator.

### 0.3.2
- Fixed formatting issue that cased the operators `+` and `-` to not get spaces.

### 0.3.1
- Fixed formatting issue when `{` was on a new line.

### 0.3.0
- Added config support.

### 0.2.6
- Fixed issues regarding `(`.

### 0.2.5
- Added `[` and `]` formatting.

### 0.2.4
- Fixed incorrect formatting on this particular case: if `(! boolVar)` -> `if (!boolVar)`.

### 0.2.3
- Fixed a critical bug that could cause code deletion.

### 0.2.2
- Handles spaces between operators.

### 0.2.1
- Handles spaces between brackets.

### 0.2.0
- Handles horizontal spacing.



