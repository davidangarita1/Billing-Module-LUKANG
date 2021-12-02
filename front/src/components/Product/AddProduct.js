import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import productService from '../../services/ProductService';

const AddProduct = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);
	const [category, setCategory] = useState('');
	const [isValid, setIsValid] = useState(false);
	const history = useHistory();
	const vsExprReg = /[A-Za-z0-9_]/;

	const { id } = useParams();

	const saveProduct = (event) => {
		event.preventDefault();
		console.log(event.target.value);

		const product = { name, price, stock, category, id };
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
			if (vsExprReg.test(product.name)) {
				productService.create(product)
					.then((response) => {
						console.log('Producto agregado correctamente', response.data);
						setIsValid(false);
						history.push('/');
					}).catch((error) => {
						console.log('Se produjo el siguiente error:', error);
					});
			} else {
				setIsValid(true);
			}
		}
	}

	useEffect(() => {
		if (id) {
			productService.get(id)
				.then((product) => {
					const { name, price, stock, category } = product.data;
					setName(name);
					setPrice(price);
					setStock(stock);
					setCategory(category);
				}).catch((error) => {
					console.log('Se produjo el siguiente error:', error);
				});
		}
	}, [id]);

	return (
		<Fragment>
			<div className="container">
				<h3 className="text-center mt-3">Agregar Producto</h3>
				<hr />
				<form className="col-sm-12 col-lg-12 offset-sm-4 offset-lg-4">
					<div className="form-group">
						<label>Nombre</label>
						<input
							type="text"
							className="form-control col-4"
							id="name"
							value={name}
							onChange={(event) => setName(event.target.value)}
							placeholder="Nombre del producto"
							required
						/>
					</div>
					{isValid
						? <div className="alert alert-danger" role="alert">Debes llenar este campo con caracteres alfanuméricos</div>
						: null
					}
					<div className="form-group">
						<label>Precio</label>
						<input
							type="number"
							className="form-control col-4"
							id="price"
							value={price}
							onChange={(event) => setPrice(event.target.value)}
							placeholder="Precio del producto"
							required
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
							required
						/>
					</div>
					<div className="form-group">
						<label>Categoría</label>
						<input
							className="form-control col-4"
							id="category"
							value={category}
							onChange={(event) => setCategory(event.target.value)}
							placeholder="Elija una categoría"
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