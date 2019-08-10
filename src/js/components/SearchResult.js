
import React from 'react';
import Result from './Result';

class SearchResult extends Result {

	constructor(props) {
		super(props);
	}

	renderMeta() {
		return (<div className="metadata">
			{this.renderTags()}
			{this.renderCredits()}
			{this.renderEngagement()}
		</div>)
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

	renderEngagement() {
		const engagement = this.getEngagement();

		let text = engagement.map((each) => {
			return each.count + ' ' + each.type;
		}).join(', ');

		return (<div className="engagement">{text}</div>)
	}

	getMasonryHeight() {
		let h = (this.props.data.webformatHeight);

		return Math.floor(h / 64) || 1;
	}

	renderImagePreview() {
		let url = this.getImageURL();
		let styles = {
			'backgroundImage': 'url(' + url + ')',
		};

		return (
			<div className="image-preview" style={styles}></div>
		)
	}


	render() {
		let styles = {
			'gridRow': 'span ' + this.getMasonryHeight(),
		};

		return (
			<div className="SearchResult" style={styles}>
				{this.renderImagePreview()}
				{this.renderMeta()}
			</div>
		);
	}

}

export default SearchResult;

