
import React, { Component } from 'react';

import SavedResult from './SavedResult.js';

class SavedResultList extends Component {

	constructor(props) {
		super(props);
		console.log(props);
	}

	renderResult(result) {
		return (
			<SavedResult key={result.id} data={result} />
		)
	}

	renderBlank() {
		return (
			<div className="blank">
				{/* nothing? */}
			</div>
		);
	}

	render() {
		let contents;
		let classes = [];

		if (!this.props.results || !this.props.results.length) {
			contents = this.renderBlank();
		} else {
			contents = this.props.results.slice(0, 20).map(this.renderResult);
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


