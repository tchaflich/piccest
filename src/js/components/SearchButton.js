
import React, { Component } from 'react';

class SearchButton extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="SearchButton">
				<button
					disabled={this.props.loading || !this.props.searchQuery}
					onClick={this.props.onClick}
				>Search!</button>
			</div>
		);
	}

}

export default SearchButton;


