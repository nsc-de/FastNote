# FastNote Language Reference

## Table of Contents

## Introduction

`FastNote` is a simple note-taking tool that allows you to quickly take notes.
It is quite similar to markdown, you can write in clear text, but you can use commants to format your text.

## Features

### Formatting

✅ This is already implemented.

You can use formatting to highlight text. Formatting is defined by a `*` followed by the text and a `*`.

```markdown
_Italic text_
**Bold text**
***Italic and bold text***
~Strikethrough text~
```

### Headings

✅ This is already implemented.

You can use headings to structure your notes. Headings are defined by a `#` followed by a space and the heading text.
You can use up to 6 `#` to define a heading. The more `#` you use, the smaller the heading will be.

```markdown
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

### Lists

You can use lists to structure your notes. Lists are defined by a `-` followed by a space and the list item text.
You can nest lists by indenting the list item with a tab.

```markdown
- List item 1
- List item 2
  - Nested list item 1
  - Nested list item 2
```

### Links

✅ This is already implemented.

You can use links to reference other notes or external resources. Links are defined by a `[]` followed by a `()` and the link text.

```markdown
[Link text](https://example.com)
```

### Images

```markdown
![Image text](https://example.com/image.png)
```

### Code

You can use code blocks to display code. Code blocks are defined by a ` ``` ` followed by the language and the code.

````markdown
```javascript
console.log("Hello World!");
```
````

### Insert symbols (aka dollar-symbols)

✅ This is already implemented.

If you want to insert a symbol, you can use the dollar-symbol syntax. The dollar-symbol syntax is defined by a `$` followed by the symbol name.

```markdown
$copyright
```

This will insert the symbol `©`.

### Insert a formula

If you want to insert a formula, you can use the formula syntax. The formula syntax is defined by a `$$` followed by the formula.

```markdown
$$\frac{1}{2}$$
```

This will insert the formula `1/2`.

### Insert a table

If you want to insert a table, you can use the table syntax. The table syntax is defined by a `|` followed by the table.

```markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
```

This will insert the table:

| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |

### Insert a horizontal rule

If you want to insert a horizontal rule, you can use the horizontal rule syntax. The horizontal rule syntax is defined by a `---`.

```markdown
---
```

This will insert a horizontal rule.
