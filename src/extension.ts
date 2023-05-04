import * as vscode from 'vscode';
import rspecExtractLet from './rspecExtractLet';
import convertHashKeys from './convertHashKeys';
import convertPostConditional from './convertPostConditional';

export function activate(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;
	if (!editor) { return; }

	let extractLet = vscode.commands.registerCommand('ruby-refactoring.rspecExtractLet', () => rspecExtractLet(editor) );
	let convertHash = vscode.commands.registerCommand('ruby-refactoring.convertHashKeys', () => convertHashKeys(editor) );
	let convertConditional = vscode.commands.registerCommand('ruby-refactoring.convertPostConditional', () => convertPostConditional(editor) );

	context.subscriptions.push(extractLet);
	context.subscriptions.push(convertHash);
	context.subscriptions.push(convertConditional);
}

export function deactivate() { }
