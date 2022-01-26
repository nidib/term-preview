import * as vscode from 'vscode';
import App from './app/app';

export function activate(context: vscode.ExtensionContext) {
	const app = new App();

	app.run(context);
}

export function deactivate() {}