'use strict';
const path = require('path');
const dotProp = require('dot-prop');
const readPkgUp = require('read-pkg-up');
const readConfig = require('./utils/read-config');

const getEnv = key => process.env[`alfred_${key}`] || '';

class WorkflowConfig {
	constructor(options) {
		const {name} = readPkgUp.sync().package;

		const opts = {
			cwd: path.join(path.dirname(getEnv('preferences')), 'Workflow Config', name),
			...options
		};

		const configFile = path.join(opts.cwd, 'config.json');

		this.store = readConfig(configFile);
	}

	get(key, defaultValue) {
		return dotProp.get(this.store, key, defaultValue);
	}

	has(key) {
		return dotProp.has(this.store, key);
	}

	get size() {
		return Object.keys(this.store).length;
	}

	* [Symbol.iterator]() {
		for (const [key, value] of Object.entries(this.store)) {
			yield [key, value];
		}
	}
}

module.exports = WorkflowConfig;
