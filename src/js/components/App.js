
import React, { Component } from 'react';

import CategorySelect from './CategorySelect';
import SearchResultList from './SearchResultList';
import SavedResultList from './SavedResultList';
import SearchButton from './SearchButton';
import SearchInput from './SearchInput';
import Pixabay from '../Pixabay';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			'searchQuery': '',
			'searchCategory': '',
			'searchResults': null,
			'savedResults': [],
			'loading': false,
		};

		this.handleCategorySelectUpdate = this.handleCategorySelectUpdate.bind(this);
		this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
		this.handleSearchInputUpdate = this.handleSearchInputUpdate.bind(this);
		this.handleResultSave = this.handleResultSave.bind(this);
		this.handleResultUnsave = this.handleResultUnsave.bind(this);
	}

	handleSearchButtonClick() {
		this.setState({
			'loading': true,
		});

		let randint = function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		Pixabay.search().then((data) => {
			// todo: fix up when search works!
			// this hits a random subsection of the fake results
			const tmp1 = randint(0, data.hits.length - 1);
			const tmp2 = randint(0, data.hits.length - 1);
			this.setState({
				'searchResults': (data.hits.slice(
					tmp1 > tmp2 ? tmp2 : tmp1,
					tmp1 > tmp2 ? tmp1 : tmp2,
				)),
				'loading': false,
			});
		});
	}

	handleSearchInputUpdate(e) {
		this.setState({
			'searchQuery': e.target.value,
		});
	}

	handleCategorySelectUpdate(e) {
		this.setState({
			'searchCategory': e.target.value,
		});
	}

	handleResultSave() {
		// todo
		console.log('Result save called');
	}

	handleResultUnsave() {
		// todo
		console.log('Result unsave called');
	}

	render() {
		return (
			<div className="App">
				<SearchInput
					onUpdate={this.handleSearchInputUpdate}
					searchQuery={this.state.searchQuery}
				/>
				<CategorySelect
					onUpdate={this.handleCategorySelectUpdate}
					searchCategory={this.state.searchCategory}
				/>
				<SearchButton
					loading={this.state.loading}
					onClick={this.handleSearchButtonClick}
				/>
				<SearchResultList
					results={this.state.searchResults}
					onSave={this.handleResultSave}
				/>
				<SavedResultList
					results={this.state.savedResults}
					onUnsave={this.handleResultUnsave}
				/>
			</div>
		);
	}

}

export default App;


