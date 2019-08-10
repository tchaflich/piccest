
import React, { Component } from 'react';

import 'normalize.css';

import CategorySelect from './CategorySelect';
import SearchResultList from './SearchResultList';
import SavedResultList from './SavedResultList';
import SearchInput from './SearchInput';

import Pixabay from '../Pixabay';
import Cache from '../Cache';

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

			// if we are currently sending a request
			// used for UI QoL / "spinny" elements
			'loading': false,

			// for react to keep track of if this has to rerender
			'savedResultCount': App.getSavedResults().length,
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

	handleResultSave(whichResult) {
		var alreadySaved = App.getSavedResults();
		let i;
		const ilen = alreadySaved.length;

		for (i = 0; i < ilen; i++) {
			if (alreadySaved[i].id === whichResult.id) {
				return; // don't save again
			}
		}

		alreadySaved.unshift(whichResult);
		Cache.setItem('savedResults', alreadySaved);

		this.setState({
			'savedResultCount': alreadySaved.length,
		});
	}

	handleResultUnsave(whichResult) {
		let savedResults = App.getSavedResults();

		let i;
		const ilen = savedResults.length;

		for (i = ilen - 1; i >= 0; i--) {
			if (savedResults[i].id === whichResult.id) {
				savedResults.splice(i, 1);
			}
		}

		Cache.setItem('savedResults', savedResults);

		this.setState({
			'savedResultCount': savedResults.length,
		});
	}

	static getSavedResults() {
		let savedResults = Cache.getItem('savedResults');

		if (!savedResults) {
			return [];
		}

		return savedResults.slice();
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
					saved={App.getSavedResults()}
					results={this.state.searchResults}
					onSave={this.handleResultSave}
					onUnsave={this.handleResultUnsave}
					// ui qol - for blank
					query={this.state.searchQuery}
					loading={this.state.loading}
				/>
				<SavedResultList
					results={App.getSavedResults()}
					onUnsave={this.handleResultUnsave}
				/>
			</div>
		);
	}

}

export default App;


