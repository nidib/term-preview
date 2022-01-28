import * as nodePath from 'path';
import * as vscode from 'vscode';
import { ExtensionConfig } from '../../@types/types';
import configDefaults from '../../utils/constants/configDefaults';

function getInitialConfig(): ExtensionConfig {
	const appConfig = vscode.workspace.getConfiguration('termPreview');
	const abs = appConfig.get('absolutePathToTermsRoot', configDefaults.ABS_PATH);
	const file = appConfig.get('file', configDefaults.FILE);
	const languages = appConfig.get('languages', configDefaults.LANGUAGES);
	const enabled = appConfig.get('enabled', configDefaults.ENABLED);
	const filePath = nodePath.join(abs, file);

	return { enabled, filePath, languages };
}

export default getInitialConfig;