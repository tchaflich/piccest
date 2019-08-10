
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

		// reduces API hits for fast typers
		// makes it appear slower the higher the timeout is set,
		// but makes rendering lag less apparent
		this.throttledLiveSearch = Pixabay.throttle((query, category) => {
			this.liveSearch(query, category);
		}, 200);
	}

	liveSearch(query, category) {
		this.setState({
			'loading': true,
		});

		Pixabay.search(
			query,
			category
		).then((data) => {
			this.setState({
				'searchResults': (data.hits.slice()),
				'loading': false,
			});
		}).catch(() => {
			// you just typed too fast, nbd
		});
	}

	handleSearchInputUpdate(e) {
		this.throttledLiveSearch(e.target.value, this.state.searchCategory);
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
					query={this.state.searchQuery} // ui qol
					loading={this.state.loading} // ui qol
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


