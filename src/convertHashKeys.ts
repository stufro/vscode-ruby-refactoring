import * as vscode from 'vscode';
import { currentLineSelection } from './common';

export default function convertHashKeys() {
  const editor = vscode.window.activeTextEditor;
	if (!editor) { return; }

  const hashSelection = editor.selection.isEmpty ? currentLineSelection(editor) : editor.selection;
  const hashText = editor.document.getText(hashSelection);
  const newText = isStringKey(hashText) ? convertToSymbolKeys(hashText) : convertToStringKeys(hashText);

  editor.edit(editBuilder => editBuilder.replace(hashSelection, newText));
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