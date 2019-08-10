
import React, { Component } from 'react';

class Result extends Component {

	constructor(props) {
		super(props);
	}

	getImageURL() {
		// 640 preview image
		return this.props.data.webformatURL;
	}

	getLinkURL() {
		return this.props.data.pageURL;
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

	renderEngagement() {
		const engagement = this.getEngagement();

		let text = engagement.map((each) => {
			return each.count + ' ' + each.type;
		}).join(', ');

		return (<div className="engagement">{text}</div>)
	}


	renderTags() {
		let tags = this.getTags().map((tag) => {
			return <span key={tag}>{'#' + tag}</span>;
		});

		return (<div className="tags">{tags}</div>);
	}

	renderCredits() {
		return (
			<div className="credits">{this.getType()} by {this.getAuthor()}</div>
		);
	}

	render() {
		// overwrite in subclass
		return (<div className="Result"></div>);
	}

}

export default Result;


