import * as vscode from 'vscode';
import rspecExtractLet from './rspecExtractLet';
import extractVariable from './extractVariable';
import convertHashKeys from './convertHashKeys';
import convertPostConditional from './convertPostConditional';

export function activate(context: vscode.ExtensionContext) {

	let extractLet = vscode.commands.registerCommand('ruby-refactoring.rspecExtractLet', () => rspecExtractLet() );
	let extractVar = vscode.commands.registerCommand('ruby-refactoring.extractVariable', () => extractVariable() );
	let convertHash = vscode.commands.registerCommand('ruby-refactoring.convertHashKeys', () => convertHashKeys() );
	let convertConditional = vscode.commands.registerCommand('ruby-refactoring.convertPostConditional', () => convertPostConditional() );

	context.subscriptions.push(extractLet);
	context.subscriptions.push(extractVar);
	context.subscriptions.push(convertHash);
	context.subscriptions.push(convertConditional);
}

export function deactivate() { }
