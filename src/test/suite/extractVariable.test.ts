import * as assert from 'assert';
import * as vscode from 'vscode';
import * as sinon from 'sinon';
import * as path from 'path';
import * as fs from 'fs';
import { sleep } from '../testHelper';
import extractVariable from '../../extractVariable';

suite('extractVariable.ts', () => {
	test.only('extracts the let to the top of the describe block', async () => {
		const fixture = vscode.Uri.file(path.join(__dirname + '/../../../src/test/fixtures/extractVariable/before.rb'));
		const document = await vscode.workspace.openTextDocument(fixture);
		const editor = await vscode.window.showTextDocument(document);

		const selection = new vscode.Selection(new vscode.Position(0, 11), new vscode.Position(0, 20));
		editor.selection = selection;

		const showInputBox = sinon.stub(vscode.window, 'showInputBox');
		showInputBox.resolves('new_var');
		extractVariable();
		await sleep(50);

		const expectedFixture = __dirname + '/../../../src/test/fixtures/extractVariable/after.rb';
		const expected = fs.readFileSync(expectedFixture, "utf8");
		assert.equal(editor.document.getText(), expected);
	});
});
