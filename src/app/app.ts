import * as fs from 'fs';
import * as vscode from 'vscode';
import { ExtensionConfig, Map } from '../@types/types';
import { termsfileParserRegex } from '../utils/constants/regexConstants';
import { getFilePaths } from '../utils/helpers/fileHelpers';
import getInitialConfig from '../utils/helpers/getConfig';
import TermHover from './termHover';

const APP_STATUS_BAR_ID = 'app-name_status-bar';

class App {
	config: ExtensionConfig;
	statusBarItem: vscode.StatusBarItem;
	terms: Map<Map<string>>;

	constructor() {
		this.config = getInitialConfig();
		this.statusBarItem = this.getInitialStatusBarItem();
		this.terms = {};

		this.getTranslationsByTerm = this.getTranslationsByTerm.bind(this);

		this.statusBarItem.show();
	}

	getInitialStatusBarItem() {
		return vscode.window.createStatusBarItem(APP_STATUS_BAR_ID, vscode.StatusBarAlignment.Right);
	}

	getTranslationsByTerm(term: string): string[] {
		const { languages } = this.config;

		return languages.map(language => this.terms[language][term]);
	}

	getTermsFromFile(path: string): Map<string> {
		let terms: Map<string> = {};
		let file: string;
		let matchedFileTerms: IterableIterator<RegExpMatchArray>;

		try {
			file = fs.readFileSync(path, 'utf-8');
			matchedFileTerms = file.matchAll(termsfileParserRegex);

			Array.from(matchedFileTerms).forEach(match => {
				const term = match[1];
				const value = match[2];

				terms[term] = value;
			});
		} catch (_e) {
			throw new Error(`Could not find or parse ${path}`);
		}

		return terms;
	}

	setStatusBarText(text: string, tooltip:string, icon: string ) {
		this.statusBarItem.tooltip = tooltip;
		this.statusBarItem.text = `$(${icon}) ${text}`;
	}

	run(context: vscode.ExtensionContext) {
		const { enabled, languages } = this.config;
		let files: string[];
		let termHover, disposableHover;
		
		if (!enabled) {
			return;
		}

		files = getFilePaths();

		files.forEach((file, index) => {
			const language = languages[index];

			this.terms[language] = this.getTermsFromFile(file);
		});

		this.setStatusBarText('Terms file(s) loaded!', 'Your file(s) seem(s) to be loaded and parsed', 'check');

		termHover = new TermHover(this.getTranslationsByTerm);
		disposableHover = vscode.languages.registerHoverProvider('*', termHover);

		context.subscriptions.push(disposableHover);
	}
}

export default App;