
import React, { Component } from 'react';

import 'normalize.css';

import CategorySelect from './CategorySelect';
import SearchResultList from './SearchResultList';
import SavedResultList from './SavedResultList';
import SearchInput from './SearchInput';
import Pixabay from '../Pixabay';

class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			// query string to send to Pixabay
			'searchQuery': '',

			// category string to send to Pixabay
			'searchCategory': '',

			// list of search results, null for haven't started yet
			'searchResults': null,

			// list of results user has saved
			'savedResults': [],

			// if we are currently sending a request
			// used for UI QoL / "spinny" elements
			'loading': false,
		};

		this.handleCategorySelectUpdate = this.handleCategorySelectUpdate.bind(this);
		this.handleSearchInputUpdate = this.handleSearchInputUpdate.bind(this);
		this.handleResultSave = this.handleResultSave.bind(this);
		this.handleResultUnsave = this.handleResultUnsave.bind(this);
	}

	liveSearch(query, category) {
		let randint = function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		this.setState({
			'loading': true,
		});

		Pixabay.search(
			query,
			category
		).then((data) => {
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
		}).catch(() => {
			// you just typed too fast, nbd
		});
	}

	handleSearchInputUpdate(e) {
		this.liveSearch(e.target.value, this.state.searchCategory);
		this.setState({
			'searchQuery': e.target.value,
		});
	}

	handleCategorySelectUpdate(e) {
		this.liveSearch(this.state.searchQuery, e.target.value);
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
				<h1>Search Pixabay images</h1>
				<SearchInput
					onUpdate={this.handleSearchInputUpdate}
					searchQuery={this.state.searchQuery}
				/>
				<CategorySelect
					onUpdate={this.handleCategorySelectUpdate}
					searchCategory={this.state.searchCategory}
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


