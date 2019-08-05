
import fakeData from './../../yellow_flowers.json';

class Pixabay {

	// (∩ ❛ ہ ❛⋆)つ══ ☆ﾟ.*･｡ﾟ✫*ﾟ･ﾟ｡.★.*｡･ﾟ✫*.
	// todo - actually hook up to the API
	// currently the promise returned is a setTimeout,
	// to emulate an asynchronous API functionality

	static isLastRequest(query, category) {
		return (
			Pixabay.lastRequest_ &&
			Pixabay.lastRequest_.query === query &&
			Pixabay.lastRequest_.category === category
		);
	}

	static stashLastRequest(query, category) {
		Pixabay.lastRequest_ = {
			'query': query,
			'category': category,
		};
	}

	static search(query, category) {
		Pixabay.stashLastRequest(query, category);

		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (!Pixabay.isLastRequest(query, category)) {
					reject();
				}

				resolve(fakeData);
			}, 100 + Math.round(Math.random() * 500));
		});
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
	static buildQueryString(query, category) { // eslint-disable-line
		// let url = 'https://pixabay.com/api/';

		// todo!
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
