
import React, { Component } from 'react';

import Pixabay from './../Pixabay.js';

class CategorySelect extends Component {

	constructor(props) {
		super(props);
	}

	static capitalize(str) {
		return (
			str.charAt(0).toUpperCase() +
			str.substr(1)
		);
	}

	renderOption(option) {
		const name = CategorySelect.capitalize(option);
		return (
			<option key={option} value={option}>{name}</option>
		);
	}

	render() {
		let optionElements = [];
		optionElements.push(
			<option key={null} value="">All categories</option>
		);
		optionElements = optionElements.concat(
			Pixabay.getCategoryOptions().map(this.renderOption)
		);

		return (
			<div className="CategorySelect">
				<label>Which category would you like to look in?</label>
				<select
					value={this.props.searchCategory}
					onChange={this.props.onUpdate}
				>{optionElements}</select>
			</div>
		);
	}

}

export default CategorySelect;


