import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import categoryService from '../../services/CategoryService';
import * as FaIcons from 'react-icons/fa';

const CategoryList = () => {
	const [categories, setCategories] = useState([]);
	const [filteredCategories, setFilteredCategories] = useState([]);

	// Get all categories
	const init = () => {
		categoryService.getAll().then(res => {
			setCategories(res.data);
			setFilteredCategories(res.data);
		}).catch(err => {
			console.log('Se produjo el siguiente error: ', err);
		});
	}

	// Filter categories
	const searchCategory = (event) => {
		const search = event.target.value;
		const filter = categories.filter((category) =>
			category.name.toLowerCase().includes(search.toLowerCase())||
			category.id.toString().includes(search));
		setFilteredCategories(filter);
	}

	// Delete category
	const handleDelete = (id) => {
		categoryService.remove(id).then((response) => {
			console.log("Se elimino correctamente la categoria", response.data);
			init();
		}).catch((error) => {
			console.log("Error al eliminar la categoria: ", error);
		})
	}

	// Load categories
	useEffect(() => {
		init();
	}, []);

	return (
		<Fragment>
			<div className="container">
				<div className="row text-center title">
					<div className="col-md-12">
						<h2>Lista de Categorias</h2>
					</div>
				</div>

				<div className="input-group input-group-lg mb-3 mt-3">
					<div className="input-group-prepend">
						<span className="input-group-text"><FaIcons.FaSearch /></span>
					</div>
					<input
						type="text"
						className="form-control"
						placeholder="Buscar categoria"
						aria-label="Large"
						aria-describedby="inputGroup-sizing-sm"
						onChange={searchCategory} />
					<div className="input-group-append">
						<Link to="add-category" className="btn btn-success">Agregar Categoria</Link>
					</div>
				</div>
				<table className="table table-bordered table-striped">
					<thead className="thead-dark text-center">
						<tr><th>Código</th><th>Categoria</th><th colSpan="2">Acciones</th></tr>
					</thead>
					<tbody>
						{filteredCategories.map(category => (
							<tr key={category.id} className="thead-dark text-center">
								<td>{category.id}</td>
								<td>{category.name}</td>
								<td className="text-center">
									<Link to={`/category/edit/${category.id}`} className="text-info m-2">
										<FaIcons.FaEdit />
									</Link>
								</td>
								<td>
									<Link to={`/categories`} className="text-danger m-2" onClick={(event) => { handleDelete(category.id) }}>
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

export default CategoryList;