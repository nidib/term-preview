import * as vscode from 'vscode';
import { Callback, ITermHover } from '../@types/types';
import { termRegex } from '../utils/constants/regexConstants';

class TermHover implements ITermHover {
	getTranslationsByTerm;

	constructor(getTranslationsByTerm: Callback<string, string[]>) {
		this.getTranslationsByTerm = getTranslationsByTerm;
	}

	provideHover(document: vscode.TextDocument, position: vscode.Position, _token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
		const range = document.getWordRangeAtPosition(position);
		const word = document.getText(range);
		let isTerm = termRegex.test(word);
		let translations: string[];
		let markdownTranslations: vscode.MarkdownString[] = [];

		if (!isTerm) {
			return null;
		}

		translations = this.getTranslationsByTerm(word);

		if (!translations.length) {
			return null;
		}

		markdownTranslations = translations.map(translation => {
			const curr = new vscode.MarkdownString(translation);

			curr.supportHtml = true;

			return curr;
		});

		return new vscode.Hover(markdownTranslations);
	}
}

export default TermHover;