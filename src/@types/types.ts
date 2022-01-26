import * as vscode from 'vscode';

export interface ITermHover extends vscode.HoverProvider {
	getTerms: MapCallback<string>;
	language: string;
	showFlag: boolean;
}

export interface ExtensionConfig {
	language: string;
	path: string | null;
	showFlag: boolean;
	watchFiles: boolean;
}

export type Map<T> = { [key: string]: T };

export type MapCallback<T> = () => Map<T>;