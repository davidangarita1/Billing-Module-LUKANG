import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import productService from '../../services/ProductService';
import categoryService from '../../services/CategoryService';

const AddProduct = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);
	const [category, setCategory] = useState('');
	const [categories, setCategories] = useState([]);
	const charRegex = new RegExp("^[a-zA-Z ]+$");
	const [isValid, setIsValid] = useState(false);
	const history = useHistory();

	const { id } = useParams();

	const saveProduct = (event) => {
		event.preventDefault();

		const product = { name, price, stock, category, id };
		if (id) {
			// update product
			productService.update(product)
				.then((response) => {
					console.log('El Producto fue actualizado correctamente', response.data);
					history.push('/products');
				}).catch((error) => {
					console.log('Se produjo el siguiente error:', error);
				});
		} else {
			// create product
			// Contional to save product
			if (name.length > 0 && category.length > 0) {
				productService.create(product)
					.then((response) => {
						console.log('Producto agregado correctamente', response.data);
						setIsValid(false);
						history.push('/products');
					}).catch((error) => {
						console.log('Se produjo el siguiente error:', error);
					});
			} else {
				setIsValid(true);
			}
		}
	}

	const textValid = (event, key) => {
		const { value } = event.target;
		switch (key) {
			case 'name':
				if (charRegex.test(value) || value === '') setName(value);
				break;
			case 'price':
				if (value >= 0) setPrice(value);
				break;
			case 'stock':
				if (value >= 0) setStock(value);
				break;
			case 'category':
				if (value !== '') setCategory(value);
				break;
			default:
				break;
		}
	}

	// Get all categories to fill the select
	useEffect(() => {
		categoryService.getAll().then(res => {
			setCategories(res.data);
		}).catch(err => {
			console.log('Se produjo el siguiente error: ', err);
		});
	}, [id]);

	// Get product by id when editing
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
					{isValid
						? <div className="alert alert-danger col-4" role="alert">Debes llenar todos los campos</div>
						: null
					}
					<div className="form-group">
						<label>Nombre</label>
						<input
							type="text"
							className="form-control col-4"
							id="name"
							value={name}
							onChange={(event) => { textValid(event, 'name') }}
							placeholder="Nombre del producto"
							required
						/>
					</div>
					<div className="form-group">
						<label>Precio</label>
						<input
							type="number"
							className="form-control col-4"
							id="price"
							value={price}
							onChange={(event) => textValid(event, 'price')}
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
							onChange={(event) => textValid(event, 'stock')}
							placeholder="Cantidad del producto"
						/>
					</div>
					<div className="form-group">
						<label>Categoría</label>
						<select
							className="form-control col-4"
							id="category"
							defaultValue={category}
							onChange={(event) => { textValid(event, 'category') }}>
							{category
								? <option value={category}>{category}</option>
								: <option value="">Seleccione una categoría</option>}
							{categories.map((item) => {
								return (
									category !== item.name
										? <option key={item.id} value={item.name}>{item.name}</option>
										: null
								)
							})}
						</select>
					</div>
					<div>
						<button type="submit" onClick={(event) => saveProduct(event)} className="btn btn-primary">
							Agregar
						</button>
					</div>
				</form>
				<hr />
				<Link to="/products">Volver a la lista</Link>
			</div>
		</Fragment>
	);
}

export default AddProduct;