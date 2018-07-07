import React from 'react';

const Product = props => {
	return(
		<li>
			<img src={props.url} alt="LCBO product" id={props.id}/>
		</li>
	)
};

export default Product;