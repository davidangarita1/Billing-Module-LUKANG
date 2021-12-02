import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import productService from '../../services/ProductService';
import categoryService from '../../services/CategoryService';

const AddProduct = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);
	const [categories, setCategories] = useState({});
	const [idCategory, setIdCategory] = useState(0);
	const [isValid, setIsValid] = useState(false);
	const history = useHistory();
	const vsExprReg = /[A-Za-z0-9_]/;

	const { id } = useParams();

	const saveProduct = (event) => {
		event.preventDefault();

		const product = { name, price, stock, idCategory, id };
		if (id) {
			// update
			productService.update(product)
				.then((response) => {
					console.log('El Producto fue actualizado correctamente', response.data);
					history.push('/products');
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
						history.push('/products');
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
					const { name, price, stock, categories } = product.data;
					setName(name);
					setPrice(price);
					setStock(stock);
					setCategories(categories);
				}).catch((error) => {
					console.log('Se produjo el siguiente error:', error);
				});
		}
	}, [id]);

	useEffect(() => {
		categoryService.getAll().then(res => {
			console.log(res.data);
			setCategories(res.data);
		}).catch(err => {
			console.log('Se produjo el siguiente error: ', err);
		});
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
							type="number"
							className="form-control col-4"
							id="category"
							value={idCategory}
							onChange={(event) => setIdCategory(event.target.value)}
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
				<Link to="/products">Volver a la lista</Link>
			</div>
		</Fragment>
	);
}

export default AddProduct;