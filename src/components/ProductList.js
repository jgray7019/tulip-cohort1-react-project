import React from 'react';
import Product from './Product';

//import { fetchLcboEndpoint } from "../api/lcbo.js";


class ProductList extends React.Component {

	constructor(props) {
		super(props);
		this.state ={
			productID: ''
		}

		this.handleClick = this.handleClick.bind(this);
	}


	handleClick(e) {
		this.setState({
			productID: e.target.id
		})

		this.props.buttonclick(this.state.productID);
	}


	render() {
		const results = this.props.data;
		let products = results.map(product =>
			<button onClick={this.handleClick} className="productLink" href="#" key={product.id}><Product url={product.image_thumb_url} id={product.id}/>
			</button>

		);

		return(
			<ul className="productList">
				{products}
			</ul>
		);
	}
}

export default ProductList;


