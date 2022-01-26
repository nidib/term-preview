import * as nodePath from 'path';
import * as vscode from 'vscode';
import { ExtensionConfig } from '../../@types/types';
import configDefaults from '../../utils/constants/configDefaults';

function getInitialConfig(): ExtensionConfig {
	const hoverTestConfiguration = vscode.workspace.getConfiguration('termPreview');
	const abs = hoverTestConfiguration.get('absolutePathToProjectRoot', configDefaults.ABS_PATH);
	const rel = hoverTestConfiguration.get('innerPathToTermsRoot', configDefaults.REL_PATH);
	const filePrefix = hoverTestConfiguration.get('filePrefix', configDefaults.FILE_PREFIX);
	const language = hoverTestConfiguration.get('language', configDefaults.LANGUAGE);
	const fileSuffix = hoverTestConfiguration.get('fileSuffix', configDefaults.FILE_SUFFIX);
	const fileSeparator = hoverTestConfiguration.get('fileSeparator', configDefaults.FILE_SEPARATOR);
	const showFlag = hoverTestConfiguration.get('showFlag', configDefaults.SHOW_FLAG);
	const watchForChanges = hoverTestConfiguration.get('watchForChanges', configDefaults.WATCH_FILES);
	const file = [filePrefix, language, fileSuffix].join(fileSeparator);
	const path = (abs && rel && file) ? nodePath.join(abs, rel, file): null;

	return { language, path, showFlag, watchForChanges };
}

export default getInitialConfig;