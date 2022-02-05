import * as vscode from 'vscode';
import App from './app/app';

export function activate(_context: vscode.ExtensionContext) {
	const app = new App();
	let disposable: vscode.Disposable | undefined;
	let runApp = () => {
		try {
			disposable && disposable.dispose();
			disposable = app.run();
		} catch (err: any) {
			vscode.window.showErrorMessage(err.message);
		}
	};

	runApp();

	vscode.commands.registerCommand('term-preview.loadTerms', runApp);
	vscode.workspace.onDidChangeConfiguration(runApp);
}

export function deactivate() {}