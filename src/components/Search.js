import React from 'react';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  // state = {
  //   searchText: ''
  // }

  onSearchChange(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearch(this.state.searchText);
    e.currentTarget.reset();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="search"
          //value={this.state.searchText}
          onChange={event => this.setState({ searchText: event.target.value })}
          //ref={(input) => this.query = input}
          //onChange={this.onSearchChange}
          placeholder="Search for alcohol here..."
          required
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default Search;