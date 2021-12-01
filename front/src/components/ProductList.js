import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import productService from '../services/ProductService';
import * as FaIcons from 'react-icons/fa';


const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	const searchProduct = (event) => {
		const search = event.target.value;
		const filter = products.filter((product) =>
			product.name.toLowerCase().includes(search.toLowerCase()) ||
			product.id.toString().includes(search));
		setFilteredProducts(filter);
	}

	useEffect(() => {
		productService.getAll().then(res => {
			setProducts(res.data);
			setFilteredProducts(res.data);
		}).catch(err => {
			console.log('Se produjo el siguiente error: ', err);
		});
	}, []);

	return (
		<Fragment>
			<div className="container">
				<div className="input-group input-group-lg mt-3">
					<div className="input-group-prepend">
						<span className="input-group-text"><FaIcons.FaSearch /></span>
					</div>
					<input
						type="text"
						className="form-control"
						aria-label="Large"
						aria-describedby="inputGroup-sizing-sm"
						placeholder="Buscar producto"
						onChange={searchProduct} />
					<Link to="add-product" className="btn btn-primary mb-2">Agregar producto</Link>
				</div>

				<h3>Lista de Productos</h3>
				<table className="table table-bordered table-striped">
					<thead className="thead-dark text-center">
						<tr>
							<th>Código</th>
							<th>Nombre</th>
							<th>Precio</th>
							<th>Cantidad</th>
							<th>Descripción</th>
							<th colSpan="2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{filteredProducts.map(product => (
							<tr key={product.id}>
								<td>{product.id}</td>
								<td>{product.name}</td>
								<td>{product.price}</td>
								<td>{product.stock}</td>
								<td>{product.description}</td>
								<td className="text-center">
									<Link to={`/edit-product/${product.id}`} className="text-success m-2">
										<FaIcons.FaEdit />
									</Link>
								</td>
								<td className="text-center">
									<Link to={`/delete-product/${product.id}`} className="text-danger m-2">
										<FaIcons.FaTrashAlt />
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Fragment>
	);
}

export default ProductList;