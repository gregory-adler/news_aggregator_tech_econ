import React, { Component } from 'react';
import './App.css';


const helloWorld = 'News Aggregation';
const categories = 'Technology / Econ';
const test = new Date()
var day = test.getDate()
let result = []
let api = 'https://newsapi.org/v2/everything?q=technology or Econ&from=2019-04-14${day}&sortBy=publishedAt&apiKey=5bf49b2702f54576bab85424a9278e43'



function isSearched(searchTerm) {
  return function (item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}


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
    fetch(api).then(response => response = response.json()).then(response => {

          console.log(response.articles.length)
          for (let i = 0; i< response.articles.length; i++){
               response.articles[i]["objectID"]= i; 
           }
           this.setState({result: response.articles})
          }).catch()
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
      <h3> {categories}</h3>
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
    <p> <i> *Built on: React JavaScript / News API </i></p>
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
    {result.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID} className="table-row">
        <span style={{ width: '25%' }}>
          {item.title}
        </span>
        <span style={{ width: '20%' }}>
          {item.author}
        </span>
        <span style={{ width: '5%' }}>
        </span>
        <span style={{ width: '20%' }}>
          <a href = '{item.url}'> {item.url} </a>
        </span>
        <span style={{ width: '15%' }}>
          {item.publishedAt.slice(5,10)}
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