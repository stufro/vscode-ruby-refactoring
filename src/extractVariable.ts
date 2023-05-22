import * as vscode from 'vscode';

export default async function extractVariable() {
  const editor = vscode.window.activeTextEditor;
	if (!editor) { return; }

  const variableName = await vscode.window.showInputBox({
    placeHolder: "Variable Name",
    prompt: "Enter New Variable Name",
  });

  if (variableName === undefined || variableName.length < 1) {
    return vscode.window.showErrorMessage("ruby-refactoring: No variable name entered");
  }

  const variableValue = editor.document.getText(editor.selection);

  const line = editor.document.lineAt(editor.selection.start);
  const indentationLevel = calculateIndentationLevel(line);

  editor.edit(async editBuilder => {
    editBuilder.delete(editor.selection);
    editBuilder.insert(editor.selection.start, variableName);
    editBuilder.insert(line.range.start, `${' '.repeat(indentationLevel)}${variableName} = ${variableValue}\n`);
  });
}

function calculateIndentationLevel(line: vscode.TextLine): number {
  const matchedSpaces = line.text.match(/^\s+/);

  if (!matchedSpaces) { return 0; };

  return (matchedSpaces[0] || []).length;
}