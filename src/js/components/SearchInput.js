
import React, { Component } from 'react';

class SearchInput extends Component {

	constructor(props) {
		super(props);
	}

	getPlaceholder() {
		return 'Type to search...';
	}

	render() {
		return (
			<div className="SearchInput">
				<input
					placeholder={this.getPlaceholder()}
					onChange={this.props.onUpdate}
					value={this.props.searchQuery}
				/>
			</div>
		);
	}

}

export default SearchInput;


