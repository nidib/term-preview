import * as fs from 'fs';
import * as vscode from 'vscode';
import { ExtensionConfig, Map } from '../@types/types';
import { termsfileParserRegex } from '../utils/constants/regexConstants';
import getInitialConfig from '../utils/helpers/getConfig';
import TermHover from './termHover';

class App {
	config: ExtensionConfig;
	statusBarItem: vscode.StatusBarItem;
	terms: Map<string>;

	constructor() {
		this.config = getInitialConfig();
		this.statusBarItem = this.getInitialStatusBarItem();
		this.terms = {};

		this.getTerms = this.getTerms.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);

		this.statusBarItem.show();
	}

	getTerms() {
		return this.terms;
	}

	getInitialStatusBarItem() {
		return vscode.window.createStatusBarItem('app-name_status-bar', vscode.StatusBarAlignment.Right);
	}

	getTermsFromFile(): Map<string> {
		const { path } = this.config;
		let file: string;
		let matchedFileTerms: IterableIterator<RegExpMatchArray>;

		try {
			file = fs.readFileSync(path as string, 'utf-8');
			matchedFileTerms = file.matchAll(termsfileParserRegex);

			Array.from(matchedFileTerms).forEach(match => {
				const term = match[1];
				const value = match[2];

				this.terms[term] = value;
			});
		} catch (e) {
			throw new Error('Could not find or parse the specified file');
		} finally {
			this.setStatusBarText('Terms file loaded!', 'Your terms file seems to be loaded and parsed. You can now hover over a term!', 'check');
		}

		return this.terms;
	}

	setStatusBarText(text: string, tooltip:string, icon: string ) {
		this.statusBarItem.tooltip = tooltip;
		this.statusBarItem.text = `$(${icon}) ${text}`;
	}

	handleFileChange(): void {
		this.terms = this.getTermsFromFile();
	}
	
	run(context: vscode.ExtensionContext) {
		const { path, showFlag, language } = this.config;
		let termHover, disposableHover;
		
		if (path) {
			this.terms = this.getTermsFromFile();
			termHover = new TermHover(this.getTerms, showFlag, language);

			if (this.config.watchForChanges) {
				fs.watchFile(path, this.handleFileChange);
			}

			disposableHover = vscode.languages.registerHoverProvider('*', termHover);

			context.subscriptions.push(disposableHover);
		} else {
			throw new Error('You must provide a the global and relative path to your terms file. Ctrl + , to set it up');
		}
	}
}

export default App;