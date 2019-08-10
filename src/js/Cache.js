

/**
 * A storage-handling class
 * Uses localStorage if available;
 * otherwise, falls back to a global-ish sessiondata variable
 *
 * @class
 */
class Cache {

	/**
	 * Tests if local storage is available
	 *
	 * https://stackoverflow.com/q/16427636
	 *
	 * @returns {boolean}
	 */
	static canUseLocalStorage() {
		if (!window.localStorage) {
			return false; // well, no, guess not
		}

		const testKey = 'piccest-test-key';

		try {
			localStorage.setItem(testKey, testKey);
			localStorage.removeItem(testKey);
		} catch (e) {
			return false;
		}

		return true;
	}

	/**
	 * Sets a JSON value into storage via key
	 * Handles JSON-encoding
	 *
	 * @param {string} key - The key to store & retrieve the cached value
	 * @param {*} value - Any valid JSON
	 */
	static setItem(key, value) {
		if (Cache.canUseLocalStorage()) {
			let json = JSON.stringify(value);
			if (typeof json !== 'string') {
				throw new Error('Invalid JSON');
			}
			localStorage.setItem(key, json);
		} else {
			// json encoding & decoding is expensive
			Cache.sessionData[key] = value;
		}
	}


	/**
	 * Retrieves a JSON value from storage via key
	 * Will return null if the key was not previously set,
	 * or is invalid JSON in localStorage
	 * Handles JSON-decoding
	 *
	 * @param {string} key - The key to store & retrieve the cached value
	 * @returns {*}
	 */
	static getItem(key) {
		if (Cache.canUseLocalStorage()) {
			let json = localStorage.getItem(key);
			try {
				return JSON.parse(json);
			} catch (e) {
				return null;
			}
		}

		return (
			key in Cache.sessionData ?
				Cache.sessionData[key] :
				null
		);
	}

}

Cache.sessionData = {};


export default Cache;

