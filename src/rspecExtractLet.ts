import * as vscode from 'vscode';
import { currentLineSelection } from './common';

type RubyVariable = { name: String, content: String };

export default function rspecExtractLet() {
  const editor = vscode.window.activeTextEditor;
	if (!editor) { return; }

  try {
    editor.selection = currentLineSelection(editor);
    const rubyVariable = findVariable(editor);
    const blockStartPosition = editor.document.lineAt(findNearestBlock(editor, editor.selection.start));
    const indentationLevel = calculateIndentationLevel(editor, blockStartPosition);
    const insertPosition = blockStartPosition.range.start.with({ line: blockStartPosition.lineNumber + 1, character: indentationLevel });

    editor.edit(editBuilder => {
      editBuilder.delete(editor.selection);
      editBuilder.insert(insertPosition, `let(:${rubyVariable.name}) { ${rubyVariable.content} }\n${' '.repeat(indentationLevel)}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      vscode.window.showInformationMessage(error.message);
    } else {
      vscode.window.showErrorMessage("ruby-refactoring: Unknown error occurred");
    }
  }
}

function findVariable(editor: vscode.TextEditor): RubyVariable {
  const textToExtract = editor.document.getText(editor.selection);

  if (!textToExtract.includes("=")) { throw new Error("ruby-refactoring: No variable found at current cursor position"); }

  const letContent = textToExtract.split("=")[1].trim();
  const letName = textToExtract.split("=")[0].trim();

  return { name: letName, content: letContent };
}

function findNearestBlock(editor: vscode.TextEditor, position: vscode.Position): number {
  const blockRegEx = /(describe|context)\s/;

  for (let lineNumber = position.line; lineNumber >= 0; lineNumber--) {
    const line = editor.document.lineAt(lineNumber);
    const match = line.text.match(blockRegEx);

    if (match) {
      return lineNumber;
    }
  }

  return -1;
}

function calculateIndentationLevel(editor: vscode.TextEditor, position: vscode.TextLine): number {
  const line = editor.document.lineAt(position.lineNumber + 1);
  const matchedSpaces = line.text.match(/^\s+/);

  if (!matchedSpaces) { return 0; };

  return (matchedSpaces[0] || []).length;
}