import * as fs from 'fs';
import * as path from 'path';
import test from 'ava';
import * as globby from 'globby';
import * as HJSON from '../utils/hjson';
import {merge} from '../utils/merge-config';

const dir = path.join(__dirname, 'fixtures/merge-config');

const files = globby.sync('*.json', {cwd: dir});

function macro(t, data) {
	const actual = merge(data.input.newConfig, data.input.oldConfig);

	const expected = HJSON.stringify(data.expected);

	t.is(actual.replace(/\t/g, ''), expected.replace(/\t/g, ''));
}

macro.title = (title, data) => title || data.title;

for (const file of files) {
	const data = HJSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));

	const testSuits = Array.isArray(data) ? data : [data];

	for (const testSuit of testSuits) {
		test(macro, testSuit);
	}
}
