import * as path from 'path';
import test from 'ava';
import WorkflowConfig from '..';

const config = new WorkflowConfig({
	cwd: path.join(__dirname, 'fixtures')
});

test('get', t => {
	t.is(config.get('apiKey'), '1234');
	t.is(config.get('user.name'), 'Sam Verschueren');
	t.is(config.get('user.email'), 'sam.verschueren@gmail.com');
	t.is(config.get('user.password', 'fallback'), 'fallback');
});

test('has', t => {
	t.true(config.has('apiKey'));
	t.true(config.has('user.name'));
	t.true(config.has('user.email'));
	t.false(config.has('user.password'));
});

test('size', t => {
	t.is(config.size, 2);
});

test('config is iterable', t => {
	t.deepEqual([...config], [
		['apiKey', '1234'],
		['user', {name: 'Sam Verschueren', email: 'sam.verschueren@gmail.com'}]
	]);
});
