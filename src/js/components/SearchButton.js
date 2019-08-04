
import React, { Component } from 'react';

class SearchButton extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<button
					disabled={this.props.loading}
					onClick={this.props.onClick}
				>Search!</button>
			</div>
		);
	}

}

export default SearchButton;


