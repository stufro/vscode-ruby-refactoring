import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import convertHashKeys from '../../convertHashKeys';

suite('convertHashKeys.ts', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('converts a symbol key hash into a string key hash', async () => {
		const fixture = vscode.Uri.file(path.join(__dirname + '/../../../src/test/fixtures/convertHashKeys/symbolKeysBefore.rb'));
		const document = await vscode.workspace.openTextDocument(fixture);
		const editor = await vscode.window.showTextDocument(document);

		convertHashKeys(editor);

		const expectedFixture = __dirname + '/../../../src/test/fixtures/convertHashKeys/symbolKeysAfter.rb';
		const expected = fs.readFileSync(expectedFixture, "utf8");
		assert.equal(editor.document.getText(), expected);
	});
});
