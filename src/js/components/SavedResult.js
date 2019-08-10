
import React from 'react';
import Result from './Result';

class SavedResult extends Result {

	constructor(props) {
		super(props);
	}

	renderMeta() {
		return (<div>
			<h3>{this.getType()} by {this.getAuthor()}</h3>
			<div>{this.renderEngagement()}</div>
			<div>{this.renderTags()}</div>
		</div>)
	}

	renderActions() {
		return (
			<div className="action-wrapper">
				<button
					onClick={() => {
						this.props.onUnsave(this.props.data);
					}}
				>Unsave</button>
				<a
					href={this.getLinkURL()}
					target="_blank"
					rel="noopener noreferrer"
				>View on Pixabay</a>
			</div>
		)
	}

	renderImage() {
		let url = this.getImageURL();

		let styles = {
			'width': this.props.data.webformatWidth,
			'height': 'auto',
		}

		return (
			<div className="image-wrapper">
				<img src={url} alt={this.getAltText()} style={styles} />
			</div>
		)
	}

	render() {
		return (
			<div className="SavedResult">
				{this.renderMeta()}
				{this.renderImage()}
				{this.renderActions()}
			</div>
		);
	}

}

export default SavedResult;

