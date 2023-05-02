import * as vscode from 'vscode';
import rspecExtractLet from './rspecExtractLet';

export function activate(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;
	if (!editor) { return; }

	let extractLet = vscode.commands.registerCommand('ruby-refactoring.rspecExtractLet', () => rspecExtractLet(editor) );

	context.subscriptions.push(extractLet);
}

export function deactivate() { }
