# Style Guide

## Overview
In general, the Airbnb styleguide for javascript and React will be followed. For specifics of the style guide, refer to the
write-up on [javascript style](https://github.com/airbnb/javascript/blob/master/README.md) as well as the write-up on [react style](https://github.com/airbnb/javascript/tree/master/react#class-vs-reactcreateclass-vs-stateless).
Since these style guides do not mention function and class documentation, we will use JSDoc (outlined [below](#commenting-methods-and-classes)).

## Getting Set Up

To enforce the style guide, we use ESLint and the Airbnb configurations for it. To get started with the linter, simply run
```
npm install
```
and the linter as well as the linter's plugins should be installed.

After this, the linter can be run via the command line if you are in the project's main directory by...
```
./node_modules/.bin/eslint <path/to/file>
```

Since running this in the terminal over and over again would get tedious, there are a couple options for integrating the linter
into your text editor.

* If you are using Atom, you can install the [linter-eslint](https://github.com/AtomLinter/linter-eslint) plugin.
* If you are using Sublime, you can use Airbnb's [Sublime linter settings](https://github.com/airbnb/javascript/blob/master/linters/SublimeLinter/SublimeLinter.sublime-settings).

## Commenting Methods and Classes

Note that if you are using Atom, a good tool to help you write these docstrings is [docblockr](https://atom.io/packages/docblockr).

### Methods
```
/**
 * Illustrates line wrapping for long param/return descriptions.
 * @param {string} foo This is a param with a description too long to fit in
 *     one line.
 * @return {number} This returns something that has a description too long to
 *     fit in one line.
 */
project.MyClass.prototype.method = function(foo) {
  return 5;
};
```

### Classes
```
/**
 * Class making something fun and easy.
 * @param {string} arg1 An argument that makes this more interesting.
 * @param {Array.<number>} arg2 List of numbers to be processed.
 * @constructor
 * @extends {goog.Disposable}
 */
project.MyClass = function(arg1, arg2) {
  // ...
};
goog.inherits(project.MyClass, goog.Disposable);
```
