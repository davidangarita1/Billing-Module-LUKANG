import React, { useState, useEffect, Fragment } from 'react';
import productService from '../api/ProductService';

const Product = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		productService.getAll().then(res => {
			setProducts(res.data);
		}).catch(err => {
			console.log(err);
		});
	}, []);

	return (
		<Fragment>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{products.map(product => (
						<tr key={product.id}>
							<td>{product.name}</td>
							<td>{product.price}</td>
							<td>{product.description}</td>
						</tr>
					))}
				</tbody>
			</table>
		</Fragment>
	);
}
 
export default Product;