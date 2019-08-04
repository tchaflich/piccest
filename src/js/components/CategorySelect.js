
import React, { Component } from 'react';

class CategorySelect extends Component {

	constructor(props) {
		super(props);
	}

	static getCategoryOptions() {
		return [
			'animals',
			'backgrounds',
			'buildings',
			'business',
			'computer',
			'education',
			'fashion',
			'feelings',
			'food',
			'health',
			'industry',
			'music',
			'nature',
			'people',
			'places',
			'religion',
			'science',
			'sports',
			'transportation',
			'travel',
		];
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
			<option key={null} value="">All</option>
		);
		optionElements = optionElements.concat(
			CategorySelect.getCategoryOptions().map(this.renderOption)
		);

		return (
			<div className="CategorySelect">
				<select
					value={this.props.searchCategory}
					onChange={this.props.onUpdate}
				>{optionElements}</select>
			</div>
		);
	}

}

export default CategorySelect;


