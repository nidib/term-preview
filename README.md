&#xa0;
<h1 align="center">Terms Preview | VS Code Extension</h1>
<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-getting-started">Getting started</a> &#xa0; | &#xa0;
  <a href="#rocket-upcoming-features">Upcoming features</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-how-to-contribute">How to contribute</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0;
</p>
&#xa0;
<img alt="Extension screenshot" src="" />
&#xa0;

## 🎯 About

Tired of having to lookup your terms on the web every time? Then this extension will be pretty handy!</br>
Simply install it and configure it to see them without ever leaving the IDE.

## ✨ Getting started

After installing it, you basically need to let this extension know of three things: </br>
1. The absolute location to your terms folder
2. The file name
3. A list of languages to have the terms translated to

You can configure it using the VS Code UI, or through the `json` configuration following the example below:
```json
{
  "termPreview.absolutePathToTermsRoot": "/Users/john/your-project/language/terms",
  "termPreview.file": "{{LANGUAGE}}.utf-8.po",
  "termPreview.languages": ["en-us", "pt-br"],
}
```

## 🚀 Upcoming features

- [ ] An user-friendly interface with a searchable list of your terms
- [ ] Right click on a term to see it on the web

## ✅ How to contribute

First of all, thank your for being interesting on improving this project! Now secondly, </br>
- Found a bug/issue? Simply open one issue with its corresponding label. The more evidence to the issue, the better :smile:
- Have a cool idea? Hit me up to talk about it, or open an enhancement issue


## 📋 License

This project is under license from MIT. For more details, see the [LICENSE](LICENSE.md) file.

&#xa0;
<p align="center">Made with :heart: by Richard Bidin</p>
&#xa0;