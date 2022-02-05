import { LANGUAGE } from '../constants/fileNamePlaceholders';
import getInitialConfig from './getConfig';

export function getFiles(): string[] {
	const { languages, filePath } = getInitialConfig();

	return languages.map(language => filePath.replace(LANGUAGE, language));
}