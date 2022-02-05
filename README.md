# Term Preview - VS Code extension

### How to use it
- Install it through VS Code extensions tab
- Manually configure it through the settings page or use the template below in your `settings.json` file
- Example:
```json
{
	"termPreview.absolutePathToTermsRoot": "/Users/richard/big-project/terms/",
	"termPreview.file": "terms.{{LANGUAGE}}.utf-8.inc",
	"termPreview.languages": ["pt-br", "en-us"],
}
```