
const assert = require('assert');

import Cache from '../src/js/Cache';

global.window = {}
import 'mock-local-storage'
// window.localStorage = global.localStorage

describe('Cache', () => {


	describe('canUseLocalStorage', () => {
		afterEach(() => {
			window.localStorage = global.localStorage;
			window.localStorage.clear();
			window.localStorage.itemInsertionCallback = null;
		});

		it('Returns false if localStorage is not present / undefined', () => {
			window.localStorage = null;
			assert.equal(Cache.canUseLocalStorage(), false);
		});

		it('Returns true if localStorage is present and functional', () => {
			assert.equal(Cache.canUseLocalStorage(), true);
		});

		it('Returns false if localStorage is present, but nonfunctional', () => {
			window.localStorage.itemInsertionCallback = () => {
				throw new Error('Does not work');
			};
			assert.equal(Cache.canUseLocalStorage(), false);
		});

	});

	describe('setItem', () => {
		afterEach(() => {
			window.localStorage = global.localStorage;
			window.localStorage.clear();
			window.localStorage.itemInsertionCallback = null;
		});

		it('Stores in localStorage if available', () => {
			// equivalent to:
			// window.localStorage.setItem('tea', JSON.stringify('pot'));
			Cache.setItem('tea', 'pot');
			assert.equal(window.localStorage.getItem('tea'), '"pot"');
		});

		it('Otherwise stores in its own variable cache', () => {
			window.localStorage = null;
			Cache.setItem('tea', 'pot');
			assert.equal(Cache.sessionData.tea, 'pot');
		});

		it('Stores in localStorage as JSON string', () => {
			Cache.setItem('tea', {'type': 'black'});
			assert.equal(window.localStorage.getItem('tea'), '{"type":"black"}');

			Cache.setItem('coffee', 12);
			assert.equal(window.localStorage.getItem('coffee'), '12');

			Cache.setItem('cocoa', null);
			assert.equal(window.localStorage.getItem('cocoa'), 'null');
		});

		it('Throws an error when attempting to store invalid JSON in localStorage', () => {
			assert.throws(() => {
				Cache.setItem('water'); // undefined is not valid json
			});
		});

		it('Stores as JSON object or primitive in its own variable cache', () => {
			window.localStorage = null;

			Cache.setItem('tea', {'type': 'black'});
			assert.deepStrictEqual(Cache.sessionData['tea'], {'type': 'black'});

			Cache.setItem('coffee', 12);
			assert.equal(Cache.sessionData['coffee'], 12);

			Cache.setItem('cocoa', null);
			assert.equal(Cache.sessionData['cocoa'], null);
		});

		it('Does not throw an error when attempting to store invalid JSON in own variable cache', () => {
			window.localStorage = null;
			Cache.setItem('water');
		});
	});

	describe('getItem', () => {
		afterEach(() => {
			window.localStorage = global.localStorage;
			window.localStorage.clear();
			window.localStorage.itemInsertionCallback = null;
		});

		it('Retrieves from localStorage if available', () => {
			window.localStorage.setItem('tea', '"pot"');
			assert.equal(Cache.getItem('tea'), 'pot');
		});

		it('Otherwise retrieves from its own variable cache', () => {
			window.localStorage = null;
			Cache.sessionData['tea'] = 'pot';
			assert.equal(Cache.getItem('tea'), 'pot');
		});

		it('Retrieves from localStorage as JSON object', () => {
			window.localStorage.setItem('tea', '{"type":"black"}');
			assert.deepStrictEqual(Cache.getItem('tea'), {'type': 'black'});

			window.localStorage.setItem('coffee', '12');
			assert.equal(Cache.getItem('coffee'), 12);

			window.localStorage.setItem('cocoa', 'null');
			assert.equal(Cache.getItem('cocoa'), null);
		});

		it('Returns null for keys not previously defined in localStorage', () => {
			assert.equal(Cache.getItem('water'), null);
		});

		it('Retrieves as JSON object from its own variable cache', () => {
			window.localStorage = null;

			Cache.sessionData['tea'] = {'type': 'black'};
			assert.deepStrictEqual(Cache.getItem('tea'), {'type': 'black'});

			Cache.sessionData['coffee'] = 12;
			assert.equal(Cache.getItem('coffee'), 12);

			Cache.sessionData['cocoa'] = null;
			assert.equal(Cache.getItem('cocoa'), null);
		});

		it('Returns null for keys not previously defined in own variable cache', () => {
			window.localStorage = null;
			assert.equal(Cache.getItem('water'), null);
		});
	});

});
