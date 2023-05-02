import * as vscode from 'vscode';

type RubyVariable = { name : String, content : String };

export default function rspecExtractLet() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) { return; }

  editor.selection = currentLineSelection(editor);
  const rubyVariable = findVariable(editor);
  const nearestBlockIndex = findNearestBlock(editor);

  const blockStartPosition = editor.document.positionAt(nearestBlockIndex);
  const insertPosition = blockStartPosition.with({ line: blockStartPosition.line + 1 });

  editor.edit(editBuilder => {
    editBuilder.delete(editor.selection);
    editBuilder.insert(insertPosition, `let(:${rubyVariable.name}) { ${rubyVariable.content} }\n`);
  });
}

function currentLineSelection(editor : vscode.TextEditor) : vscode.Selection {
  const startPosition = new vscode.Position(editor.selection.active.line, 0);
  const endPosition = new vscode.Position(editor.selection.active.line + 1, 0);
  const lineRange = new vscode.Range(startPosition, endPosition);

  return new vscode.Selection(lineRange.start, lineRange.end);
}

function findVariable(editor : vscode.TextEditor) : RubyVariable {
  const textToExtract = editor.document.getText(editor.selection);
  const letContent = textToExtract.split("=")[1].trim();
  const letName = textToExtract.split("=")[0].trim();

  return { name: letName, content: letContent };
}

function findNearestBlock(editor : vscode.TextEditor) : number {
  const documentText = editor.document.getText();
  const blockRegEx = /(describe|context)\s*/;

  const match = blockRegEx.exec(documentText);
  if (!match) { return -1; }

  return match.index;
}