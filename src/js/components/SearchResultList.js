
import React, { Component } from 'react';

class SearchResultList extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let json = JSON.stringify(this.props.results, null, 2);
		return (<div><pre>{json}</pre></div>);
	}

}

export default SearchResultList;


