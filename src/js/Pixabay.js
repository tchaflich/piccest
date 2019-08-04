
/* eslint-disable */

import fakeData from './../../yellow_flowers.json';

class Pixabay {

	// (∩ ❛ ہ ❛⋆)つ══ ☆ﾟ.*･｡ﾟ✫*ﾟ･ﾟ｡.★.*｡･ﾟ✫*.
	// todo - actually hook up to the API
	// currently the promise returned is a setTimeout,
	// to emulate an asynchronous API functionality

	static search(query, category) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(fakeData);
			}, 1000);
		});
	}

	static buildQueryString(query, category) {
		// todo
	}



}

export default Pixabay;

/* eslint-enable */
