import * as vscode from 'vscode';

export default function convertHashKeys(editor: vscode.TextEditor) {
  const currentLine = currentLineSelection(editor);
  const lineText = editor.document.getText(currentLine);
  const newText = isStringKey(lineText) ? lineText.replaceAll(/"(\w+)" =>/g, '$1:') : lineText.replaceAll(/(\w+):/g, '"$1" =>');

  editor.edit(editBuilder => {
    editBuilder.replace(currentLine, newText);
  });
}

function currentLineSelection(editor: vscode.TextEditor): vscode.Selection {
  const startPosition = new vscode.Position(editor.selection.active.line, 0);
  const endPosition = new vscode.Position(editor.selection.active.line + 1, 0);
  const lineRange = new vscode.Range(startPosition, endPosition);

  return new vscode.Selection(lineRange.start, lineRange.end);
}

function isStringKey(hash: string): boolean {
  return hash.match(/"\s*=>/) !== null;
}