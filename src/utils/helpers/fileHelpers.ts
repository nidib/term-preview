import { LANGUAGE } from '../constants/fileNamePlaceholders';
import getInitialConfig from './getConfig';

export const getFilePaths = (): string[] => {
	const { languages, filePath } = getInitialConfig();

	return languages.map(language => filePath.replace(LANGUAGE, language));
}