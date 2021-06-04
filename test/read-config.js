const path = require('path');
const test = require('ava');
const readConfig = require('../utils/read-config');

test('read config', t => {
	const config = readConfig(path.join(__dirname, 'fixtures/user-config.json'));

	t.deepEqual(config, {
		apiKey: '1234',
		user: {
			name: 'Sam Verschueren',
			email: 'sam.verschueren@gmail.com'
		}
	});
});

test('read unknown config', t => {
	const config = readConfig(path.join(__dirname, 'fixtures/unicorn.json'));

	t.deepEqual(config, {});
});
