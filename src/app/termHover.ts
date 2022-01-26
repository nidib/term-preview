import * as vscode from 'vscode';
import { ITermHover, MapCallback } from '../@types/types';
import flags from '../utils/constants/flags';
import { termRegex } from '../utils/constants/regexConstants';

class TermHover implements ITermHover {
	getTerms;
	showFlag;
	language;

	constructor(getTerms: MapCallback<string>, showFlag: boolean, language: string) {
		this.getTerms = getTerms;
		this.showFlag = showFlag;
		this.language = language;
	}

	private getTranslation(translation: string): string {
		if (this.showFlag) {
			return `${flags[this.language]} ${translation}`;
		}

		return translation;
	}

	provideHover(document: vscode.TextDocument, position: vscode.Position, _token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
		const range = document.getWordRangeAtPosition(position);
		const word = document.getText(range);
		let isTerm = termRegex.test(word);
		let translation, markdownTranslation;
		let terms;

		if (isTerm) {
			terms = this.getTerms();
			translation = terms[word];
	
			if (translation) {
				translation = this.getTranslation(translation);
				markdownTranslation = new vscode.MarkdownString(translation);
				markdownTranslation.supportHtml = true;

				return new vscode.Hover(markdownTranslation);
			}
		}

		return null;
	}
}

export default TermHover;