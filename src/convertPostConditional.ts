import * as vscode from 'vscode';
import { currentLineSelection } from './common';

type Conditional = { condition: string, statement: string };

export default function convertPostConditional() {
  const editor = vscode.window.activeTextEditor;
	if (!editor) { return; }

  const lineSelection = currentLineSelection(editor);
  const lineText = editor.document.getText(lineSelection);

  const conditional = parseConditional(lineText);
  const whitespace = ' '.repeat(calculateIndentationLevel(lineText));

  const newConditional = `${whitespace}${conditional.condition}\n${whitespace}  ${conditional.statement}\n${whitespace}end\n`;
  editor.edit(editBuilder => editBuilder.replace(lineSelection, newConditional));
}

function parseConditional(text: string): Conditional {
  const conditionMatch = text.trim().match(/([\s\w]+) (if[\s\(].*)$/);

  if (!conditionMatch) { throw new Error("Unable to find post conditional under cursor"); };

  return { statement: conditionMatch[1], condition: conditionMatch[2] };
}

function calculateIndentationLevel(line: string): number {
  const matchedSpaces = line.match(/^\s+/);

  if (!matchedSpaces) { return 0; };

  return (matchedSpaces[0] || []).length;
}