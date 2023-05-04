import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { sleep, goToLine } from '../testHelper';
import convertPostConditional from '../../convertPostConditional';

suite('convertPostConditional.ts', () => {
	test('converts a symbol key hash into a string key hash', async () => {
		const fixture = vscode.Uri.file(path.join(__dirname + '/../../../src/test/fixtures/convertPostConditional/before.rb'));
		const document = await vscode.workspace.openTextDocument(fixture);
		const editor = await vscode.window.showTextDocument(document);

		goToLine(editor, 2);
		convertPostConditional(editor);
		await sleep(50);

		const expectedFixture = __dirname + '/../../../src/test/fixtures/convertPostConditional/after.rb';
		const expected = fs.readFileSync(expectedFixture, "utf8");
		assert.equal(editor.document.getText(), expected);
	});
});
