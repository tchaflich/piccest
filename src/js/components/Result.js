
import React, { Component } from 'react';

class Result extends Component {

	constructor(props) {
		super(props);
	}

	renderImagePreview() {
		const width = this.props.data.previewWidth;
		const height = this.props.data.previewHeight;
		const url = this.props.data.previewURL;

		return (
			<div className="image-wrapper">
				<img width={width} height={height} alt={this.getAltText()} src={url} />
			</div>
		);
	}

	renderTag(tag) {
		return (<span className="tag" key={tag}>{tag}</span>);
	}

	renderTags() {
		let tags;
		try {
			tags = this.props.data.tags.split(/,\s*/g);
		} catch (e) {
			return <div></div>;
		}

		return (<div>{tags.map(this.renderTag)}</div>)
	}

	getAltText() {
		return 'Photo description: ' + this.props.data.tags;
	}

	renderEngagement(key, icon) {
		let count = this.props.data[key];
		let src = './media/' + icon + '.png';
		return (
			<div key={key} className="engagement">
				<img src={src} />
				<span>{count}</span>
			</div>
		)
	}

	getEngagements() {
		return [
			{'key': 'likes', 'icon': 'thumbsup'},
			{'key': 'favorites', 'icon': 'heart'},
			{'key': 'downloads', 'icon': 'clouddown'},
		];
	}

	renderEngagements() {
		let content = this.getEngagements().map((i) => {
			return this.renderEngagement(i.key, i.icon);
		});

		return (
			<div className="engagements">{content}</div>
		);
	}

	render() {
		return (<div className="Result">
			{this.renderImagePreview()}
			{this.renderTags()}
			{this.renderEngagements()}
		</div>);
	}

}

export default Result;


