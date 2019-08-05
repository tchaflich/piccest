
/* eslint-disable */

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

	static buildQueryString(query, category) {
		// todo
	}



}

Pixabay.lastRequest_ = null;


export default Pixabay;

/* eslint-enable */
