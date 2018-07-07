import React, { Component } from "react";

import Header from "./components/Header";
import Search from "./components/Search";
import ProductList from "./components/ProductList";
import MapContainer from "./components/MapContainer";

import { fetchLcboEndpoint } from "./api/lcbo.js";


class App extends Component {

  constructor() {
    super();
    this.state={
      products: [],
      inventory: []
    };
    this.performSearch = this.performSearch.bind(this);
    this.getLocations = this.getLocations.bind(this);
  }
  componentDidMount() {
    this.performSearch();
    //this.getLocations();
  }

  performSearch(q) {
      fetchLcboEndpoint("products", {
        q: q
    }).then(data => {
      //console.log(data);
      this.setState({ products: data.result})
    })
    .catch(error => {console.log('Error fetching and parsing data', error)})
  }

  getLocations(prodID) {
        fetchLcboEndpoint("stores", {
          product_id: prodID
      }).then(data => {
          console.log(data);
          let inventory = data.result.map(store => {
           
            return ({
              id: store.id,
              name: store.name,
              address: store.address_line_1,
              city: store.city,
              quantity: store.quantity,
              lat: store.latitude,
              lng: store.longitude
            })
          
          })
          this.setState({
            inventory: inventory
          })
          
        })
      .catch(error => {console.log('Error fetching and parsing data', error)})
    }


  render() {
    //console.log(this.state.products);
    console.log(this.state.inventory);
    return (
      <div>
       <Header />
       <Search onSearch={this.performSearch}  />
       <ProductList data={this.state.products} onProductClick={this.getLocations}/>
       
       <MapContainer google={this.state.google} inventory={this.state.inventory}/>
      </div>
    );
  }
}


export default App;
