import * as vscode from 'vscode';
import rspecExtractLet from './rspecExtractLet';
import convertHashKeys from './convertHashKeys';

export function activate(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;
	if (!editor) { return; }

	let extractLet = vscode.commands.registerCommand('ruby-refactoring.rspecExtractLet', () => rspecExtractLet(editor) );
	let convertHash= vscode.commands.registerCommand('ruby-refactoring.convertHashKeys', () => convertHashKeys(editor) );

	context.subscriptions.push(extractLet);
	context.subscriptions.push(convertHash);
}

export function deactivate() { }
