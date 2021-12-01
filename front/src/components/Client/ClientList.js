import React, { useState, useEffect, Fragment } from 'react';
import clientService from '../../services/ClientService';
import * as FaIcons from 'react-icons/fa';

const ClientList = () => {
	const [clients, setClients] = useState([]);
	const [filteredClients, setFilteredClients] = useState([]);

	const searchClient = (event) => {
		const search = event.target.value;
		const filter = clients.filter((client) =>
			client.name.toLowerCase().includes(search.toLowerCase()) ||
			client.lastName.toLowerCase().includes(search.toLowerCase()) ||
			client.id.toString().includes(search));
		setFilteredClients(filter);
	}

	useEffect(() => {
		clientService.getAll().then(res => {
			setClients(res.data);
			setFilteredClients(res.data);
		}).catch(err => {
			console.log('Se produjo el siguiente error: ', err);
		});
	}, []);

	return (
		<Fragment>
			<div className="container">
				<div className="row text-center title">
					<div className="col-md-12">
						<h2>Lista de Clientes</h2>
					</div>
				</div>
				<div className="input-group input-group-lg mb-3 mt-3">
					<div className="input-group-prepend">
						<span className="input-group-text">
							<FaIcons.FaSearch />
						</span>
					</div>
					<input
						type="text"
						className="form-control"
						aria-label="Large"
						aria-describedby="inputGroup-sizing-sm"
						placeholder="Buscar cliente"
						onChange={searchClient} />
				</div>
				<table className="table table-bordered table-striped">
					<thead className="thead-dark text-center">
						<tr>
							<th>Cedula</th>
							<th>Nombre</th>
							<th>Apellido</th>
						</tr>
					</thead>
					<tbody>
						{filteredClients.map(client => (
							<tr key={client.id}>
								<td>{client.id}</td>
								<td>{client.name}</td>
								<td>{client.lastName}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</Fragment>
	);
}

export default ClientList;