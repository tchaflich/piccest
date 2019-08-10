
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

	isAlreadySaved() {
		let i;
		const ilen = this.props.saved.length;

		for (i = 0; i < ilen; i++) {
			if (this.props.saved[i].id === this.props.data.id) {
				return true;
			}
		}

		return false;
	}

	getMasonryHeight() {
		let h = (this.props.data.webformatHeight);
		let w = (this.props.data.webformatWidth);

		// 1 x unit: 640px
		// 1 y unit: 10px

		return Math.max(Math.floor(
			(h / 10) * (w / 640)
		), 1);
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

		let classes = ['SearchResult'];
		if (this.isAlreadySaved()) {
			classes.push('saved');
		} else {
			classes.push('saveable');
		}

		return (
			<div
				className={classes.join(' ')}
				style={styles}
				onClick={() => {
					this.isAlreadySaved() ?
						this.props.onUnsave(this.props.data) :
						this.props.onSave(this.props.data);
				}}
			>
				{this.renderImagePreview()}
				{this.renderMeta()}
			</div>
		);
	}

}

export default SearchResult;

