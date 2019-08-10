
import React, { Component } from 'react';

import SearchResult from './SearchResult';

class SearchResultList extends Component {

	constructor(props) {
		super(props);
	}

	renderResult(result) {
		return (
			<SearchResult key={result.id} data={result} />
		)
	}

	renderBlank() {
		let contents;
		if (this.props.query && !this.props.loading) {
			contents = 'No results, sorry.';
		} else {
			contents = 'Use the search above to find pictures!'
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
			contents = this.props.results.slice(0, 20).map(this.renderResult);
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


