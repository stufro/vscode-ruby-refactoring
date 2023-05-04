import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { sleep } from '../testHelper';
import { entireDocumentSelection } from '../../common';
import convertHashKeys from '../../convertHashKeys';

suite('convertHashKeys.ts', () => {
	test('converts a symbol key hash into a string key hash', async () => {
		const fixture = vscode.Uri.file(path.join(__dirname + '/../../../src/test/fixtures/convertHashKeys/symbolKeys.rb'));
		const document = await vscode.workspace.openTextDocument(fixture);
		const editor = await vscode.window.showTextDocument(document);

		convertHashKeys();
		await sleep(50);

		const expectedFixture = __dirname + '/../../../src/test/fixtures/convertHashKeys/stringKeys.rb';
		const expected = fs.readFileSync(expectedFixture, "utf8");
		assert.equal(editor.document.getText(), expected);
	});

	test('converts a string key hash into a symbol key hash', async () => {
		const fixture = vscode.Uri.file(path.join(__dirname + '/../../../src/test/fixtures/convertHashKeys/stringKeys.rb'));
		const document = await vscode.workspace.openTextDocument(fixture);
		const editor = await vscode.window.showTextDocument(document);

		convertHashKeys();
		await sleep(50);

		const expectedFixture = __dirname + '/../../../src/test/fixtures/convertHashKeys/symbolKeys.rb';
		const expected = fs.readFileSync(expectedFixture, "utf8");
		assert.equal(editor.document.getText(), expected);
	});

	test('converts the keys of a multi-line hash', async () => {
		const fixture = vscode.Uri.file(path.join(__dirname + '/../../../src/test/fixtures/convertHashKeys/multiLineSymbolKeys.rb'));
		const document = await vscode.workspace.openTextDocument(fixture);
		const editor = await vscode.window.showTextDocument(document);

		editor.selection = entireDocumentSelection(editor);
		convertHashKeys();
		await sleep(50);

		const expectedFixture = __dirname + '/../../../src/test/fixtures/convertHashKeys/multiLineStringKeys.rb';
		const expected = fs.readFileSync(expectedFixture, "utf8");
		assert.equal(editor.document.getText(), expected);
	});
});
