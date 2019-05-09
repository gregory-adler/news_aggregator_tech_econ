import React, { Component } from 'react';
import './App.css';



	const helloWorld = 'Welcome toooo the Road to learn React';



function isSearched(searchTerm) {
  return function (item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

let result = []

let api = 'https://newsapi.org/v2/everything?q=bitcoin&from=2019-04-09&sortBy=publishedAt&apiKey=5bf49b2702f54576bab85424a9278e43'

class App extends Component {
	constructor(props){
    super(props);
    this.state = {
    	result: [],
    	searchTerm: '',
    };
     this.onDismiss = this.onDismiss.bind(this);
     this.onSearchChange = this.onSearchChange.bind(this);
    }

     componentDidMount() {
    // fetch data and update state
    // fetch(api).then(response => this.setState({ result: [1,1,1,1]})).catch();
    fetch(api).then(response => response = response.json()).then(response => this.setState({result: response.articles})).catch();

  }

	onDismiss(id) {
	  const updatedList = this.state.result.filter(item => item.objectID !== id);
	  this.setState({ result: updatedList });
	}

 	onSearchChange(event) {this.setState({ searchTerm: event.target.value });}


  render() {
  	 const { searchTerm, result } = this.state;

     console.log(result)
     if (!result) { return 1; }
    return (
    	<div className="page">
        <div className="interactions">
    <div className="App">
    	<h2> {helloWorld}</h2>
    	 <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        >
          Search
        </Search>
        </div>
        <Table
	        result={result}
	        pattern={searchTerm}
	        onDismiss={this.onDismiss}
         />
    </div>
    </div>
    );
}}

const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>

const Table = ({ result, pattern, onDismiss }) =>
  <div className="table">
    {result.map(item =>
      <div key={item.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          {item.title}
        </span>
        <span style={{ width: '30%' }}>
          {item.author}
        </span>
        <span style={{ width: '10%' }}>
          {item.url}
        </span>
        <span style={{ width: '10%' }}>
          {item.publishedAt}
        </span>
        <span style={{ width: '10%' }}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>



class Button extends Component {
  render() {
    const {
      onClick,
      className = '',
      children,
    } = this.props;

    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    );
  }
}


export default App;