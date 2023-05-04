import * as vscode from 'vscode';

export function currentLineSelection(editor: vscode.TextEditor): vscode.Selection {
  const startPosition = new vscode.Position(editor.selection.active.line, 0);
  const endPosition = new vscode.Position(editor.selection.active.line + 1, 0);
  const lineRange = new vscode.Range(startPosition, endPosition);

  return new vscode.Selection(lineRange.start, lineRange.end);
}

export function entireDocumentSelection(editor: vscode.TextEditor): vscode.Selection {
  const startPosition = new vscode.Position(0, 0);
  const endPosition = editor.document.lineAt(editor.document.lineCount - 1).range.end;
  const documentRange = new vscode.Range(startPosition, endPosition);

  return new vscode.Selection(documentRange.start, documentRange.end);
}