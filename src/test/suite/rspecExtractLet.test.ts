import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
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
});

function goToLine(textEditor: vscode.TextEditor, lineNumber: number): void {
  const position = new vscode.Position(lineNumber - 1, 0);
  const selection = new vscode.Selection(position, position);
  textEditor.selection = selection;
  textEditor.revealRange(selection);
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}