import React, { Component } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import ProductList from "./components/ProductList";
//import Product from "./components/Product";

import { fetchLcboEndpoint } from "./api/lcbo.js";


//user types in search query from form input
//value gets passed as query in call to LCBO products endpoint
//product ID is then passed into another call from LCBO store endpoint
//latitude and longitude are taken from product
class App extends Component {

  constructor() {
    super();
    this.state={
      products: []
    };
    this.performSearch = this.performSearch.bind(this);
        this.getLocations = this.getLocations.bind(this);
  }
  componentDidMount() {
    this.performSearch();
    this.getLocations();
  }

  performSearch(q) {
      fetchLcboEndpoint("products", {
        q: q
    }).then(data => {
      console.log(data);
      this.setState({ products: data.result})
    })
    .catch(error => {console.log('Error fetching and parsing data', error)})
  }

getLocations(prodID) {
      fetchLcboEndpoint("stores", {
        product_id: prodID
    }).then(data => {
      console.log( data);
      this.setState({ productLocation: data.result})
    })
    .catch(error => {console.log('Error fetching and parsing data', error)})
  }


  render() {
    console.log(this.state.products);
    return (
      <div>
       <Header />
       <Search onSearch={this.performSearch}  />
       <ProductList data={this.state.products} buttonclick={this.getLocations}/>
      </div>
    );
  }
}

export default App;
