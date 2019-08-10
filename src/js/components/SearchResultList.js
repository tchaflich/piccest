
import React, { Component } from 'react';

import SearchResult from './SearchResult';
import Pixabay from './../Pixabay';

class SearchResultList extends Component {

	constructor(props) {
		super(props);
	}

	renderResult(result) {
		return (
			<SearchResult
				key={result.id}
				data={result}
				saved={this.props.saved}
				onSave={this.props.onSave}
				onUnsave={this.props.onUnsave}
			/>
		)
	}

	shouldHaveResults() {
		return (
			// trimmed query exists
			Pixabay.encodeQuery(this.props.query) &&
			// not currently attempting to load results
			!this.props.loading
		);
	}

	renderBlank() {
		let contents;
		if (this.shouldHaveResults()) {
			contents = 'No results, sorry';
		} else {
			contents = this.props.loading ? '' : 'Use the search above to find pictures'
		}
		return (
			<div className="blank">
				{contents}
			</div>
		);
	}

	render() {
		let contents;
		let classes = [];

		if (!this.props.results || !this.props.results.length) {
			contents = this.renderBlank();
		} else {
			contents = this.props.results.slice(0, 20).map((r) => {
				return this.renderResult(r);
			});
			classes.push('grid');
		}

		return (
			<div className="SearchResultList">
				<div className={classes.join(' ')}>{contents}</div>
				<hr />
			</div>
		);
	}

}

export default SearchResultList;


