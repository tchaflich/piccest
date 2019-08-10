
import React, { Component } from 'react';

import SavedResult from './SavedResult.js';

class SavedResultList extends Component {

	constructor(props) {
		super(props);
	}

	renderResult(result) {
		return (
			<SavedResult
				key={result.id}
				data={result}
				onUnsave={this.props.onUnsave}
			/>
		)
	}

	renderBlank() {
		return (
			<div className="blank">
				Results you save will go here
			</div>
		);
	}

	render() {
		let contents;
		let classes = [];

		if (!this.props.results || !this.props.results.length) {
			contents = this.renderBlank();
		} else {
			contents = this.props.results.map((r) => {
				return this.renderResult(r);
			});
			classes.push('grid');
		}

		return (
			<div className="SavedResultList">
				<div className={classes.join(' ')}>{contents}</div>
			</div>
		);
	}

}

export default SavedResultList;


