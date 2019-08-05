
const assert = require('assert');

import Pixabay from '../src/js/Pixabay';

describe('Pixabay connector', () => {

	describe('encodeQuery', () => {

		it('Trims leading whitespace (\\s)', () => {
			assert.equal(Pixabay.encodeQuery('  teapot'), 'teapot');
			assert.equal(Pixabay.encodeQuery('         teapot'), 'teapot');
			assert.equal(Pixabay.encodeQuery('	teapot'), 'teapot');
		});

		it('Trims trailing whitespace (\\s)', () => {
			assert.equal(Pixabay.encodeQuery('teapot '), 'teapot');
			assert.equal(Pixabay.encodeQuery('teapot           '), 'teapot');
			assert.equal(Pixabay.encodeQuery('teapot	'), 'teapot');
		});

		it('Simultaneously trims leading and trailing whitespace', () => {
			assert.equal(Pixabay.encodeQuery('  teapot '), 'teapot');
			assert.equal(Pixabay.encodeQuery('    teapot		'), 'teapot');
			assert.equal(Pixabay.encodeQuery('	teapot  '), 'teapot');
		});

		it('Does not affect mid-string whitespace', () => {
			// %20 is the encoding for space
			assert.equal(Pixabay.encodeQuery('tea pot'), 'tea%20pot');
			assert.equal(Pixabay.encodeQuery('t e a p o t'), 't%20e%20a%20p%20o%20t');
		});

		it('Transforms strings to lowercase', () => {
			assert.equal(Pixabay.encodeQuery('TEAPOT'), 'teapot');
			assert.equal(Pixabay.encodeQuery('teAPoT'), 'teapot');
		});

		it('Encodes query as a URI Component', () => {
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
			// Not Escaped: A-Z a-z 0-9 - _ . ! ~ * ' ( )

			// all non-escaped, should return equivalently
			assert.equal(
				Pixabay.encodeQuery('teapot-123_!*~(\')'),
				'teapot-123_!*~(\')'
			);

			// characters encoded in a URI component, but not in a URI
			assert.equal(
				Pixabay.encodeQuery(';,/?:@&=+$#'),
				'%3B%2C%2F%3F%3A%40%26%3D%2B%24%23'
			)

			// spaces encoded ("a" bookends to avoid trimming, for testing)
			assert.equal(Pixabay.encodeQuery('a a'), 'a%20a');
		});

		it('Returns an empty string if an empty/only-whitespace string sent', () => {
			assert.equal(Pixabay.encodeQuery(''), '');
			assert.equal(Pixabay.encodeQuery('     '), '');
			assert.equal(Pixabay.encodeQuery('  		   '), '');
		});

	});

	describe('encodeCategory', () => {

		it('Returns null if empty string was sent', () => {
			assert.equal(Pixabay.encodeCategory(''), null);
		});

		it('Returns the category if it is in the accepted list', () => {
			assert.equal(Pixabay.encodeCategory('fashion'), 'fashion');
			assert.equal(Pixabay.encodeCategory('nature'), 'nature');
		});

		it('Returns null if the category is invalid', () => {
			assert.equal(Pixabay.encodeCategory('This one is fake!'), null);
			assert.equal(Pixabay.encodeCategory('teapots'), null);
		});

	});

	describe('buildQueryString', () => {

		it('Always appends a query argument, even if query is empty', () => {
			let url = Pixabay.buildQueryString('', 'fashion');
			assert.equal(true, (/&q=/).test(url));
		});

		it('Only appends a category if a valid category is sent', () => {
			let url;

			url = Pixabay.buildQueryString('teapot', 'fashion');
			assert.equal(true, (/&category=fashion/).test(url));

			url = Pixabay.buildQueryString('teapot', 'teapots');
			assert.equal(false, (/&category=fashion/).test(url));
		});

	});

});
