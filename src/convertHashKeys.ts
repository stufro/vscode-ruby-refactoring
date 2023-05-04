import * as vscode from 'vscode';
import { currentLineSelection } from './common';

export default function convertHashKeys(editor: vscode.TextEditor) {
  const currentLine = currentLineSelection(editor);
  const lineText = editor.document.getText(currentLine);
  const newText = isStringKey(lineText) ? convertToSymbolKeys(lineText) : convertToStringKeys(lineText);

  editor.edit(editBuilder => editBuilder.replace(currentLine, newText));
}

function isStringKey(line: string): boolean {
  return line.match(/"\s*=>/) !== null;
}

function convertToSymbolKeys(line: string): string {
  return line.replaceAll(/"(\w+)" =>/g, '$1:');
}

function convertToStringKeys(line: string): string {
  return line.replaceAll(/(\w+):/g, '"$1" =>');
}