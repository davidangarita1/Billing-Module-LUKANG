import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import productService from '../services/ProductService';

const AddProduct = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);
	const [description, setDescription] = useState('');
	const history = useHistory();
	// const vsExprReg = /[A-Za-z0-9_]/;
	// vsExprReg.test(request.name)

	const saveProduct = (event) => {
		event.preventDefault();

		const product = { name, price, stock, description };
		productService.saveProduct(product).then((response) => {
			console.log('Producto agregado correctamente', response.data);
			history.push('/');
		}).catch((error) => {
			console.log('Se produjo el siguiente error:', error);
		});
	}

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
				<hr/>
				<Link to="/">Volver a la lista</Link>
			</div>
		</Fragment>
	);
}

export default AddProduct;