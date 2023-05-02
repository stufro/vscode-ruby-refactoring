import * as vscode from 'vscode';
import rspecExtractLet from './rspecExtractLet';

export function activate(context: vscode.ExtensionContext) {
	let extractLet = vscode.commands.registerCommand('ruby-refactoring.rspecExtractLet', () => rspecExtractLet() );

	context.subscriptions.push(extractLet);
}

export function deactivate() { }
