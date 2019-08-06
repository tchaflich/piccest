
import CategorySelect from './components/CategorySelect.js';

let configuration = null;
try {
	configuration = require('./../../configuration.json');
} catch (e) {
	// eslint-disable-next-line
	console.error('Need a valid config file! Did you forget?');
}


/**
 * Connector class - handles logic for Pixabay API
 * URL construction, async functionality, etc
 *
 * @class
 */
class Pixabay {

	// (∩ ❛ ہ ❛⋆)つ══ ☆ﾟ.*･｡ﾟ✫*ﾟ･ﾟ｡.★.*｡･ﾟ✫*.

	/**
	 * Do the given parameters match the last request sent?
	 * Avoid returning old / outdated results
	 *
	 * @private
	 *
	 * @param {string} query
	 * @param {string} category
	 */
	static isLastRequest(query, category) {
		return (
			Pixabay.lastRequest_ &&
			Pixabay.lastRequest_.query === query &&
			Pixabay.lastRequest_.category === category
		);
	}


	/**
	 * Keep the last request in mind
	 * See "isLastRequest" for more details on why this is done
	 *
	 * @private
	 *
	 * @param {string} query
	 * @param {string} category
	 */
	static stashLastRequest(query, category) {
		Pixabay.lastRequest_ = {
			'query': query,
			'category': category,
		};
	}


	/**
	 * Big main search function
	 * Returns a Promise that ideally will resolve with the entire return data
	 * If the request that's returning is not the last one
	 * (for example, if there was a race condition),
	 * The Promise will reject
	 * DOES send empty strings as queries
	 *
	 * @param {string} query - The query string (raw)
	 * @param {string} category - The category string (raw, enum)
	 * @returns {Promise}
	 */
	static search(query, category) {
		Pixabay.stashLastRequest(query, category);

		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.addEventListener('readystatechange', () => {
				if (xhr.status === 200 && xhr.responseText) {
					try {
						resolve(JSON.parse(xhr.responseText));
					} catch (e) {
						reject();
					}
				}
			});
			xhr.open('GET', Pixabay.buildQueryString(query, category));
			xhr.send();
		});

		// return new Promise((resolve, reject) => {
		// 	setTimeout(() => {
		// 		if (!Pixabay.isLastRequest(query, category)) {
		// 			reject();
		// 		}

		// 		resolve(fakeData);
		// 	}, 100 + Math.round(Math.random() * 500));
		// });
	}


	/**
	 * Retrieve the API key from configuration object
	 * Should perform zero transformations on this
	 *
	 * Can return null in the event that the key is not set
	 *
	 * @returns {?string}
	 */
	static getAPIKey() {
		if (!configuration) {
			return null;
		}
		return configuration.PixabayAPIKey || null;
	}

	static encodeQuery(query) {
		return encodeURIComponent(
			query.replace(/(^\s*)|(\s*$)/g, '').toLowerCase()
		);
	}

	static encodeCategory(category) {
		let categoryEncoded = null;

		if (category && (CategorySelect.getCategoryOptions()).indexOf(category) !== -1) {
			categoryEncoded = encodeURIComponent(category); // can't be too careful!
		}

		return categoryEncoded;
	}

	/**
	 * Create a full API query string (escaped)
	 *
	 * - Case insensitive
	 * - Trim whitespace
	 *
	 * @param {string} query - The user's entered search query
	 * @param {string} category - The selected search category
	 */
	static buildQueryString(query, category) {
		let url = 'https://pixabay.com/api/';

		const key = Pixabay.getAPIKey();

		const queryEncoded = Pixabay.encodeQuery(query);
		const categoryEncoded = Pixabay.encodeCategory(category);

		url += '?key=' + key;
		url += '&q=' + queryEncoded;

		if (categoryEncoded) {
			url += '&category=' + category;
		}

		return url;
	}


	/**
	 * Returns a wrapper function that calls the sent callback once initially,
	 * then at most once every n milliseconds thereafter
	 *
	 * The callback does not preserve context; It does preserve arguments
	 *
	 * @param {Function} callback - The function to throttle
	 * @param {number} period - Timeout, in milliseconds
	 */
	static throttle(callback, period) {
		let last = null;
		let timer = null;

		return function() {
			const now = new Date();

			// call immediately if:
			// - this is the first time the function has ever been called,
			// - we're past the window for another call to be applicable
			if (!last || now > last + period) {
				last = now;
				callback.apply(this, arguments);
				return;
			}

			// set a timer if one is NOT already set
			// this timer unsets its own variable for later
			if (!timer) {
				timer = setTimeout(() => {
					last = new Date(); // the new now
					callback.apply(this, arguments);

					timer = null;
				}, period - (now - last));
			}
		};
	}



}

Pixabay.lastRequest_ = null;


export default Pixabay;
