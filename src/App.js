/* eslint-disable func-names */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import './App.css';
import HttpsRedirect from 'react-https-redirect';

const helloWorld = 'Daily News Reading';
const date = new Date();
// eslint-disable-next-line no-unused-vars
const day = date.getDate();
const api =
	'https://newsapi.org/v2/top-headlines?country=us&from=2019-04-14${day}&sortBy=publishedAt&apiKey=5bf49b2702f54576bab85424a9278e43';

function isSearched(searchTerm) {
	return function(item) {
		return item.title.toLowerCase().includes(searchTerm.toLowerCase());
	};
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			result: [],
			searchTerm: ''
		};
		this.onDismiss = this.onDismiss.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
	}

	componentDidMount() {
		// fetch data and update state
		fetch(api)
			.then(response => (response = response.json()))
			.then(response => {
				console.log(response.articles.length);
				// eslint-disable-next-line no-plusplus
				for (let i = 0; i < response.articles.length; i++) {
					response.articles[i].objectID = i;
				}
				this.setState({ result: response.articles });
			})
			.catch();
	}

	onDismiss(id) {
		const updatedList = this.state.result.filter(item => item.objectID !== id);
		this.setState({ result: updatedList });
	}

	onSearchChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	render() {
		const { searchTerm, result } = this.state;

		console.log(result);
		if (!result) {
			return 1;
		}
		return (
			// eslint-disable-next-line react/jsx-filename-extension
			<HttpsRedirect>
				<div className="page">
					<div className="interactions">
						<div className="App">
							<h2> {helloWorld} </h2>
							<Search value={searchTerm} onChange={this.onSearchChange}>
								Search
							</Search>
						</div>
						<Table result={result} pattern={searchTerm} onDismiss={this.onDismiss} />
					</div>
					<p>
						{' '}
						<i> *Built on: React JavaScript / News API </i>
					</p>
				</div>
			</HttpsRedirect>
		);
	}
}

// eslint-disable-next-line react/prop-types
const Search = ({ value, onChange, children }) => {
	return (
		<form>
			{children} <input type="text" value={value} onChange={onChange} />
		</form>
	);
};

// eslint-disable-next-line react/prop-types
const Table = ({ result, pattern, onDismiss }) => (
	<div className="table">
		{result.filter(isSearched(pattern)).map(item => (
			<div key={item.objectID} className="table-row">
				<span style={{ width: '28%' }}>{item.title}</span>
				<span style={{ width: '20%' }}>{item.author}</span>
				<span style={{ width: '5%' }} />
				<span style={{ width: '15%' }}>
					<a href={item.url}> {item.url} </a>
				</span>
				<span style={{ width: '15%' }}>{item.publishedAt.slice(5, 10)}</span>
				<span style={{ width: '10%' }}>
					<Button onClick={() => onDismiss(item.objectID)} className="button-inline">
						Dismiss
					</Button>
				</span>
			</div>
		))}
	</div>
);

// eslint-disable-next-line react/prefer-stateless-function
// eslint-disable-next-line react/no-multi-comp
class Button extends Component {
	render() {
		// eslint-disable-next-line react/prop-types
		const { onClick, className = '', children } = this.props;

		return (
			<button onClick={onClick} className={className} type="button">
				{children}
			</button>
		);
	}
}

export default App;
