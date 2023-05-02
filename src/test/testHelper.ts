import * as vscode from 'vscode';

export function goToLine(textEditor: vscode.TextEditor, lineNumber: number): void {
  const position = new vscode.Position(lineNumber - 1, 0);
  const selection = new vscode.Selection(position, position);
  textEditor.selection = selection;
  textEditor.revealRange(selection);
}

export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}