import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import clientService from '../../services/ClientService';

const AddClient = () => {
	const [idClient, setIdClient] = useState('');
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [isExist, setIsExist] = useState(false);
	const history = useHistory();
	const charRegex = new RegExp("^[a-zA-Z ]+$");
	const numRegex = new RegExp("^[0-9]+$");
	const { id } = useParams();

	const saveClient = (event) => {
		event.preventDefault();

		const client = { idClient, name, lastName, id };
		if (id) {
			// update client
			clientService.update(client)
				.then((response) => {
					console.log('El Cliente fue actualizado correctamente', response.data);
					history.push('/clients');
				}).catch((error) => {
					console.log('Se produjo el siguiente error:', error);
				});
		} else {
			// create client
			if (client.name.length > 0 && client.lastName.length > 0 && client.idClient > 0) {
				clientService.create(client)
					.then((response) => {
						console.log('Cliente agregado correctamente', response.data);
						setIsValid(false);
						setIsExist(false);
						history.push('/clients');
					}).catch((error) => {
						setIsExist(true);
						console.log('Se produjo el siguiente error:', error);
					});
			} else {
				setIsValid(true);
			}
		}
	}

	// Validate if the name, lastname is only letters and idClient is only numbers
	const textValid = (event, key) => {
		const { value } = event.target;
		switch (key) {
			case 'name':
				if (charRegex.test(value) || value === '') setName(value);
				break;
			case 'lastName':
				if (charRegex.test(value) || value === '') setLastName(value);
				break;
			case 'idClient':
				if (numRegex.test(value) || value === '') setIdClient(value);
				break;
			default:
				break;
		}
	}

	// Get all clients when id is defined
	useEffect(() => {
		if (id) {
			clientService.get(id)
				.then((client) => {
					const { idClient, name, lastName } = client.data;
					setIdClient(idClient);
					setName(name);
					setLastName(lastName);
				}).catch((error) => {
					console.log('Se produjo el siguiente error:', error);
				});
		}
	}, [id]);

	return (
		<Fragment>
			<div className="container">
				<h3 className="text-center mt-3">Agregar Cliente</h3>
				<hr />

				<form className="col-sm-12 col-lg-12 offset-sm-4 offset-lg-4">
					{isValid
						? <div className="alert alert-danger col-4" role="alert">Debes llenar todos los campos</div>
						: null
					}
					{isExist
						? <div className="alert alert-danger col-4" role="alert">Este numero identificatión ya existe</div>
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
							placeholder="Nombre del cliente"
							required
						/>
					</div>
					<div className="form-group">
						<label>Apellido</label>
						<input
							type="text"
							className="form-control col-4"
							id="lastName"
							value={lastName}
							onChange={(event) => textValid(event, 'lastName')}
							placeholder="Apellido del cliente"
							required
						/>
					</div>
					<div className="form-group">
						<label>Identificación</label>
						<input
							type="text"
							className="form-control col-4"
							id="idClient"
							value={idClient}
							onChange={(event) => textValid(event, 'idClient')}
							placeholder="Identificación del cliente"
							required
						/>
					</div>
					<div>
						<button onClick={(event) => saveClient(event)} className="btn btn-primary">
							Agregar
						</button>
					</div>
				</form>
				<hr />
				<Link to="/clients">Volver a la lista</Link>
			</div>
		</Fragment>
	);
}

export default AddClient;