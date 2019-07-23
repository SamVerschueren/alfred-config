#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const pathExists = require('path-exists');
const resolveAlfredPrefs = require('resolve-alfred-prefs');
const readPkgUp = require('read-pkg-up');
const mkdirp = require('mkdirp');
const readConfig = require('./utils/read-config');
const {merge} = require('./utils/merge-config');
const textEditor = require('./utils/text-editor');

const srcPath = path.join(process.cwd(), 'config.json');

console.log(process.cwd());

if (!pathExists.sync(srcPath)) {
	// No `config.json` file found, gracefully exit because we don't need to merge
	process.exit();
}

(async () => {
	try {
		const alfredPrefs = await resolveAlfredPrefs();

		const {name} = readPkgUp.sync().package;

		const destPath = path.join(path.dirname(alfredPrefs), 'Workflow Config', name, 'config.json');

		// Read the current user workflow config and the original workflow config
		const currentConfig = readConfig(destPath);
		const srcConfig = readConfig(srcPath);

		// Make sure the target location exists
		mkdirp.sync(path.dirname(destPath));

		// Write the file to the target location
		fs.writeFileSync(destPath, merge(srcConfig, currentConfig));

		// Open the file in the preferred text editor
		textEditor.open(destPath);
	} catch (error) {
		console.error(error);

		process.exit(1);
	}
})();
