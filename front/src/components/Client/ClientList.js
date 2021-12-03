import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import clientService from '../../services/ClientService';
import * as FaIcons from 'react-icons/fa';

const ClientList = () => {
	const [clients, setClients] = useState([]);
	const [filteredClients, setFilteredClients] = useState([]);

	// Get all clients from the database
	const init = () => {
		clientService.getAll().then(res => {
			setClients(res.data);
			setFilteredClients(res.data);
		}).catch(err => {
			console.log('Se produjo el siguiente error: ', err);
		});
	}
	// Filter clients by name or last name or identification
	const searchClient = (event) => {
		const search = event.target.value;
		const filter = clients.filter((client) =>
			client.name.toLowerCase().includes(search.toLowerCase()) ||
			client.lastName.toLowerCase().includes(search.toLowerCase()) ||
			client.idClient.toString().includes(search));
		setFilteredClients(filter);
	}
	// Delete client
	const handleDelete = (id) => {
		clientService.remove(id).then((response) => {
			init();
		}).catch((error) => {
			console.log("Error al eliminar el cliente: ", error);
		})
	}

	// Load clients from the database
	useEffect(() => {
		init();
	}, []);

	return (
		<Fragment>
			<div className="container">
				<div className="row text-center title">
					<div className="col-md-12">
						<h2>Lista de Clientes</h2>
					</div>
				</div>
				
				<div className="col-12 input-group input-group-lg mb-3 mt-3">
					<div className="input-group-prepend">
						<span className="input-group-text"><FaIcons.FaSearch /></span>
					</div>
					<input
						type="text"
						className="form-control"
						placeholder="Buscar cliente por identificación, nombre o apellido"
						aria-label="Large"
						aria-describedby="inputGroup-sizing-sm"
						onChange={searchClient} />
					<div className="input-group-append">
						<Link to="add-client" className="btn btn-success">Agregar Cliente</Link>
					</div>
				</div>
				<table className="table table-bordered table-striped">
					<thead className="thead-dark text-center">
						<tr>
							<th>Identificación</th>
							<th>Nombre</th>
							<th>Apellido</th>
							<th colSpan="2">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{filteredClients.map(client => (
							<tr key={client.id}>
								<td>{client.idClient}</td>
								<td>{client.name}</td>
								<td>{client.lastName}</td>
								<td className="text-center">
									<Link to={`/client/edit/${client.id}`} className="text-info m-2">
										<FaIcons.FaEdit />
									</Link>
								</td>
								<td className="text-center">
									<Link to={`/clients`} className="text-danger m-2" onClick={(event) => { handleDelete(client.id) }}>
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

export default ClientList;