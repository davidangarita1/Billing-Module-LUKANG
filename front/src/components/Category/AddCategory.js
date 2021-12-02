import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import categoryService from '../../services/CategoryService';

const AddCategory = () => {
	const [name, setName] = useState('');
	const [isValid, setIsValid] = useState(false);
	const history = useHistory();
	const vsExprReg = /[A-Za-z0-9_]/;

	const { id } = useParams();

	const saveCategory = (event) => {
		event.preventDefault();

		const category = { name, id };
		if (id) {
			// update
			categoryService.update(category)
				.then((response) => {
					console.log('La categoria fue actualizada correctamente', response.data);
					history.push('/categories');
				}).catch((error) => {
					console.log('Se produjo el siguiente error:', error);
				});
		} else {
			// create
			if (vsExprReg.test(category.name)) {
				categoryService.create(category)
					.then((response) => {
						console.log('Categoria agregada correctamente', response.data);
						setIsValid(false);
						history.push('/categories');
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
			categoryService.get(id)
				.then((category) => {
					const { name } = category.data;
					setName(name);
				}).catch((error) => {
					console.log('Se produjo el siguiente error:', error);
				});
		}
	}, [id]);

	return (
		<Fragment>
			<div className="container">
				<h3 className="text-center mt-3">Agregar Categoría</h3>
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
							placeholder="Nombre del cliente"
							required
						/>
					</div>
					{isValid
						? <div className="alert alert-danger" role="alert">Debes llenar este campo con caracteres alfanuméricos</div>
						: null
					}
					<div>
						<button onClick={(event) => saveCategory(event)} className="btn btn-primary">
							Agregar
						</button>
					</div>
				</form>
				<hr />
				<Link to="/categories">Volver a la lista</Link>
			</div>
		</Fragment>
	);
}

export default AddCategory;