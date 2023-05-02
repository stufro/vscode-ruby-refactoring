import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as sinon from 'sinon';
import { goToLine, sleep } from '../testHelper';
import rspecExtractLet from '../../rspecExtractLet';

suite('rspecExtractLet.ts', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('extracts the let to the top of the describe block', async () => {
		const fixture = vscode.Uri.file(path.join(__dirname + '/../../../src/test/fixtures/rspecExtractLet/describeBefore.rb'));
		const document = await vscode.workspace.openTextDocument(fixture);
		const editor = await vscode.window.showTextDocument(document);

		goToLine(editor, 3);
		rspecExtractLet(editor);
		await sleep(50);

		const expectedFixture = __dirname + '/../../../src/test/fixtures/rspecExtractLet/describeAfter.rb';
		const expected = fs.readFileSync(expectedFixture, "utf8");
		assert.equal(editor.document.getText(), expected);
	});

	test('extracts the let to the nearest context block', async () => {
		const fixture = vscode.Uri.file(path.join(__dirname + '/../../../src/test/fixtures/rspecExtractLet/contextBefore.rb'));
		const document = await vscode.workspace.openTextDocument(fixture);
		const editor = await vscode.window.showTextDocument(document);

		goToLine(editor, 4);
		rspecExtractLet(editor);
		await sleep(60);

		const expectedFixture = __dirname + '/../../../src/test/fixtures/rspecExtractLet/contextAfter.rb';
		const expected = fs.readFileSync(expectedFixture, "utf8");
		assert.equal(editor.document.getText(), expected);
	});

	test('shows an information message when the cursor is not on a line with a variable', async () => {
		const fixture = vscode.Uri.file(path.join(__dirname + '/../../../src/test/fixtures/rspecExtractLet/contextBefore.rb'));
		const document = await vscode.workspace.openTextDocument(fixture);
		const editor = await vscode.window.showTextDocument(document);

		const showInformationMessage = sinon.stub(vscode.window, "showInformationMessage");

		goToLine(editor, 1);
		rspecExtractLet(editor);
		await sleep(60);

		assert.ok(showInformationMessage.calledOnce);
	});
});
