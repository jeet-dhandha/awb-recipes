# Rich-text editors: `fill` works on contenteditable

`fill` sets native `<input>` and `<textarea>` values and also handles `[contenteditable]` hosts (ProseMirror, Lexical, Slate) by focusing, selecting and inserting text. It reports `mode: "value"` or `mode: "contenteditable"`.

CodeMirror editors are different: set the value through the instance (`el.CodeMirror.setValue(...)`) with `evaluate`.
