"use strict";

const fs = require("fs");
const logger = require("../libs/logger");
const path = require("path");

const config = require("../config.json");

class Theme {
	constructor(theme) {
		this.theme = theme;
		// this.css = Theme.getCss(theme);
		// this.path = Theme.getFilePath(theme);

		const cfg = Theme.getConfig(theme);

		this.config = cfg;
		this.name = cfg.name;
		this.description = cfg.description;
		this.url = cfg.url;
		this.author = cfg.author;
	}

	get chat() {
		return Theme.getFilePath(this.theme, "main") || Theme.getFilePath(defaultTheme, "main");
	}

	get yt_emoji() { // eslint-disable-line
		return Theme.getFilePath(this.theme, "yt_emoji") || Theme.getFilePath(defaultTheme, "yt_emoji");
	}

	get api() {
		return Theme.getFilePath(this.theme, "api") || Theme.getFilePath(defaultTheme, "api");
	}

	get animate() {
		return Theme.getFilePath(this.theme, "animate") || Theme.getFilePath(defaultTheme, "animate");
	}

	get colors() {
		return Theme.getFilePath(this.theme, "colors") || Theme.getFilePath(defaultTheme, "colors");
	}

	get context() {
		return Theme.getFilePath(this.theme, "context") || Theme.getFilePath(defaultTheme, "context");
	}

	static get currentTheme() {
		return new Theme(config.theme);
	}

	static get DEFAULT_THEME() {
		return "../public/css";
	}

	static getConfig(theme) {
		// const themeFolder = path.normalize(`${__dirname}/../themes/${theme}`);
		const themeJson = path.normalize(`${__dirname}/../themes/${theme}/theme.json`);

		try {
			return require(themeJson);
		} catch (e) {
			logger.warn(`По пути ${themeJson} нет файла`, "themes");

			return null;
		}
	}

	static getCss(/* theme */) {
		return logger.warn("Theme.getCss is deplecated!");
		/*
		const thconfig = Theme.getConfig(theme);

		if (!thconfig) return logger.error(`Да нет у меня темы ${theme}!`);

		const cssfile = thconfig.main;

		const tmp = path.normalize(`${__dirname}/../themes/${theme}/${cssfile}`);

		if (!fs.existsSync(tmp)) return logger.error(`У темы ${theme} нет файла ${cssfile}, который указан в theme.json!`);

		const css = fs.readFileSync(tmp, "utf8");


		return css;*/
	}

	static getFilePath(theme, file = "undefined") {
		const thconfig = Theme.getConfig(theme);

		if (!thconfig) return logger.error(`Да нет у меня темы ${theme}!`);

		let cssfile = thconfig[file];

		if (!cssfile) {
			theme = Theme.DEFAULT_THEME;
			const defconfig = Theme.getConfig(theme);

			cssfile = defconfig[file];
		}

		if (!cssfile) return logger.warn(`Нет данных для ${file} в конфиге темы!`);

		const tmp = path.normalize(`${__dirname}/../themes/${theme}/${cssfile}`);

		if (!fs.existsSync(tmp)) return logger.error(`У темы ${theme} нет файла ${cssfile}, который указан в theme.json!`, {"level": "themes"});

		return tmp;
	}
}

// const defaultTheme = new Theme("../public/css");

module.exports = Theme;