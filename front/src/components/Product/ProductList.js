import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import productService from '../../services/ProductService';
import * as FaIcons from 'react-icons/fa';

const ProductList = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);

	const init = () => {
		productService.getAll().then(res => {
			setProducts(res.data);
			setFilteredProducts(res.data);
		}).catch(err => {
			console.log('Se produjo el siguiente error: ', err);
		});
	}

	const searchProduct = (event) => {
		const search = event.target.value;
		const filter = products.filter((product) =>
			product.name.toLowerCase().includes(search.toLowerCase()) ||
			product.category.toLowerCase().includes(search.toLowerCase()) ||
			product.id.toString().includes(search));
		setFilteredProducts(filter);
	}

	const handleDelete = (id) => {
		console.log('eliminando producto con id: ', id);
		productService.remove(id).then((response) => {
			console.log("Se elimino correctamente el producto", response.data);
			init();
		}).catch((error) => {
			console.log("Error al eliminar el producto: ", error);
		})
	}

	const currencyFormat = (num) => {
		return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}

	useEffect(() => {
		init();
	}, []);

	return (
		<Fragment>
			<div className="container">
				<div className="row text-center title">
					<div className="col-md-12">
						<h2>Lista de Productos</h2>
					</div>
				</div>

				<div className="input-group input-group-lg mb-3 mt-3">
					<div className="input-group-prepend">
						<span className="input-group-text"><FaIcons.FaSearch /></span>
					</div>
					<input
						type="text"
						className="form-control"
						placeholder="Buscar producto"
						aria-label="Large"
						aria-describedby="inputGroup-sizing-sm"
						onChange={searchProduct} />
					<div className="input-group-append">
						<Link to="add-product" className="btn btn-success">Agregar producto</Link>
					</div>
				</div>
				<table className="table table-bordered table-striped">
					<thead className="thead-dark text-center">
						<tr>
							<th>Código</th>
							<th>Nombre</th>
							<th>Precio</th>
							<th>Cantidad</th>
							<th>Categoría</th>
							<th colSpan="2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{filteredProducts.map(product => (
							<tr key={product.id}>
								<td className="text-center">{product.id}</td>
								<td>{product.name}</td>
								<td className="text-center">{currencyFormat(product.price)}</td>
								<td className="text-center">{product.stock}</td>
								<td>{product.category}</td>
								<td className="text-center">
									<Link to={`/product/edit/${product.id}`} className="text-info m-2">
										<FaIcons.FaEdit />
									</Link>
								</td>
								<td className="text-center">
									<Link to={`/products`} className="text-danger m-2" onClick={(event) => { handleDelete(product.id) }}>
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