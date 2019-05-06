import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



	const helloWorld = 'Welcome toooo the Road to learn React';


  let result = []



function isSearched(searchTerm) {
  return function (item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}


class App extends Component {
	constructor(props){
    super(props);
    this.state = {
    	result: this.getStories(),
    	searchTerm: '',
    };
     this.onDismiss = this.onDismiss.bind(this);
     this.onSearchChange = this.onSearchChange.bind(this);
     this.getStories = this.getStories.bind(this)
    }

    getStories(){

    result.push({
      'author': 'the',
      'title': 'aaaa'
    })
    return result
  }

	onDismiss(id) {
	  const updatedList = this.state.result.filter(item => item.objectID !== id);
	  this.setState({ result: updatedList });
	}

 	onSearchChange(event) {this.setState({ searchTerm: event.target.value });}


  render() {
  	 const { searchTerm, result } = this.state;
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
          {item.num_comments}
        </span>
        <span style={{ width: '10%' }}>
          {item.points}
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