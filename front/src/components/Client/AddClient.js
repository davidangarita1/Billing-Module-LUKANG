import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import clientService from '../../services/ClientService';

const AddClient = () => {
	const [idClient, setIdClient] = useState(0);
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [isValid, setIsValid] = useState(false);
	const history = useHistory();
	const vsExprReg = /[A-Za-z0-9_]/;

	const { id } = useParams();

	const saveClient = (event) => {
		event.preventDefault();

		const client = { idClient, name, lastName, id };
		if (id) {
			// update
			clientService.update(client)
				.then((response) => {
					console.log('El Cliente fue actualizado correctamente', response.data);
					history.push('/clients');
				}).catch((error) => {
					console.log('Se produjo el siguiente error:', error);
				});
		} else {
			// create
			if (vsExprReg.test(client.name)) {
				clientService.create(client)
					.then((response) => {
						console.log('Cliente agregado correctamente', response.data);
						setIsValid(false);
						history.push('/clients');
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
					<div className="form-group">
						<label>Apellido</label>
						<input
							type="text"
							className="form-control col-4"
							id="lastName"
							value={lastName}
							onChange={(event) => setLastName(event.target.value)}
							placeholder="Apellido del cliente"
							required
						/>
					</div>
					<div className="form-group">
						<label>Identificación</label>
						<input
							type="number"
							className="form-control col-4"
							id="idClient"
							value={idClient}
							onChange={(event) => setIdClient(event.target.value)}
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