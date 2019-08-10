
import React, { Component } from 'react';

class Result extends Component {

	constructor(props) {
		super(props);
	}

	getImageURL() {
		// 640 preview image
		return this.props.data.webformatURL;
	}

	getTags() {
		let tags;

		try {
			tags = this.props.data.tags.split(/,\s*/g);
		} catch (e) {
			tags = [];
		}

		return tags;
	}

	getAuthor() {
		return this.props.data.user;
	}

	getType() {
		let type = (this.props.data.type) || '';

		return (
			type.charAt(0).toUpperCase() +
			type.substr(1)
		);
	}

	getAltText() {
		return 'Photo description: ' + this.props.data.tags;
	}

	getEngagement() {
		const keys = [
			'likes',
			'favorites',
			'comments',
			// 'downloads',
			// 'views',
		];

		return keys.map((key) => {
			return {
				'type': key,
				'count': this.props.data[key],
			};
		});
	}

	render() {
		// overwrite in subclass
		return (<div className="Result"></div>);
	}

}

export default Result;


