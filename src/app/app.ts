import * as fs from 'fs';
import * as vscode from 'vscode';
import { ExtensionConfig, Map } from '../@types/types';
import { poRegex } from '../utils/constants/regexConstants';
import { getFiles } from '../utils/helpers/fileHelpers';
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

		this.statusBarItem.show();

		this.getTranslationsByTerm = this.getTranslationsByTerm.bind(this);
		this.handleFiles = this.handleFiles.bind(this);
	}

	setStatusBarText(text: string, icon: string): void {
		this.statusBarItem.text = `$(${icon}) ${text}`;
	}

	hasMinimumConfigurationsSet(): boolean {
		const { enabled, file } = this.config;

		if (!enabled) {
			return false;
		}

		if (!file) {
			return false;
		}

		return true;
	}

	getInitialStatusBarItem() {
		return vscode.window.createStatusBarItem(APP_STATUS_BAR_ID, vscode.StatusBarAlignment.Right);
	}

	/* this method is used by its child as a callback */
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
			matchedFileTerms = file.matchAll(poRegex);

			Array.from(matchedFileTerms).forEach(match => terms[match[1]] = match[2]);
		} catch (err) {
			this.setStatusBarText('Could not load terms', 'close');

			throw new Error(`Could not find ${path}`);
		}

		return terms;
	}

	handleFiles(): void {
		getFiles().forEach((file, index) => {
			const language = this.config.languages[index];

			this.terms[language] = this.getTermsFromFile(file);
		});

		this.setStatusBarText('Terms file(s) loaded!', 'check');
	}

	run(): vscode.Disposable | undefined { 
		this.config = getInitialConfig();
		this.terms = {};

		if (!this.hasMinimumConfigurationsSet()) {
			return;
		}

		this.setStatusBarText('Loading terms', 'sync~spin');
		
		setTimeout(this.handleFiles, 2000);

		return vscode.languages.registerHoverProvider('*', new TermHover(this.getTranslationsByTerm));
	}
}

export default App;