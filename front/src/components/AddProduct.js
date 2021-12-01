import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import productService from '../services/ProductService';

const AddProduct = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);
	const [description, setDescription] = useState('');
	const history = useHistory();
	// const vsExprReg = /[A-Za-z0-9_]/;
	// vsExprReg.test(request.name)

	const { id } = useParams();

	const saveProduct = (event) => {
		event.preventDefault();

		const product = { name, price, stock, description, id };
		if (id) {
			// update
			productService.update(product)
				.then((response) => {
					console.log('El Producto fue actualizado correctamente', response.data);
					history.push('/');
				}).catch((error) => {
					console.log('Se produjo el siguiente error:', error);
				});
		} else {
			// create
			productService.create(product)
				.then((response) => {
					console.log('Producto agregado correctamente', response.data);
					history.push('/');
				}).catch((error) => {
					console.log('Se produjo el siguiente error:', error);
				});
		}
	}

	useEffect(() => {
		if (id) {
			productService.get(id)
				.then((product) => {
					const { name, price, stock, description } = product.data;
					setName(name);
					setPrice(price);
					setStock(stock);
					setDescription(description);
				}).catch((error) => {
					console.log('Se produjo el siguiente error:', error);
				});
		}
	}, [id]);

	return (
		<Fragment>
			<div className="container">
				<h3>Agregar Producto</h3>
				<hr />
				<form>
					<div className="form-group">
						<label>Nombre</label>
						<input
							type="text"
							className="form-control col-4"
							id="name"
							value={name}
							onChange={(event) => setName(event.target.value)}
							placeholder="Nombre del producto"
						/>
					</div>
					<div className="form-group">
						<label>Precio</label>
						<input
							type="number"
							className="form-control col-4"
							id="price"
							value={price}
							onChange={(event) => setPrice(event.target.value)}
							placeholder="Precio del producto"
						/>
					</div>
					<div className="form-group">
						<label>Cantidad</label>
						<input
							type="number"
							className="form-control col-4"
							id="stock"
							value={stock}
							onChange={(event) => setStock(event.target.value)}
							placeholder="Cantidad del producto"
						/>
					</div>
					<div className="form-group">
						<label>Descripción</label>
						<textarea
							className="form-control col-4"
							id="description"
							value={description}
							onChange={(event) => setDescription(event.target.value)}
							placeholder="Descripción del producto"
						/>
					</div>
					<div>
						<button onClick={(event) => saveProduct(event)} className="btn btn-primary">
							Agregar
						</button>
					</div>
				</form>
				<hr />
				<Link to="/">Volver a la lista</Link>
			</div>
		</Fragment>
	);
}

export default AddProduct;