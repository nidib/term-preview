import * as vscode from 'vscode';

export interface ITermHover extends vscode.HoverProvider {
	getTranslationsByTerm: Callback<string, string[]>;
}

export interface ExtensionConfig {
	enabled: boolean,
	filePath: string;
	languages: string[];
}

export type Map<T> = { [key: string]: T };

export type Callback<I, T> = (_arg0: I) => T;