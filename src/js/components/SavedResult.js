
import React from 'react';
import Result from './Result';

class SavedResult extends Result {

	constructor(props) {
		super(props);
	}

	render() {
		console.log('saved result', this.props);

		return (
			<div className="SavedResult">
				wello
			</div>
		);
	}

}

export default SavedResult;

