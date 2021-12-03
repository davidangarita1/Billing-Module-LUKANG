import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import invoiceService from '../../services/InvoiceService';
import productService from '../../services/ProductService';
import clientService from '../../services/ClientService';
import * as FaIcons from 'react-icons/fa';
import './AddInvoice.css';
import PdfGenerate from './PDF';

const AddInvoice = () => {
	const [date, setDate] = useState('');
	const [idClient, setIdClient] = useState('');
	const [idProduct, setIdProduct] = useState('');
	const [clientName, setClientName] = useState('');
	const [addedProduct, setAddedProduct] = useState([]);
	const [products, setProducts] = useState([]);
	const [filteredProduct, setFilteredProduct] = useState([]);
	const [clients, setClients] = useState([]);
	const [filteredClient, setFilteredClient] = useState([]);
	const history = useHistory();
	const numRegex = new RegExp("^[0-9]+$");
	const { id } = useParams();

	// Get all products
	const initProducts = () => {
		productService.getAll().then(res => {
			res.data.map(product => product.subTotal = product.price);
			res.data.map(product => {
				product.available = [];
				for (let i = 1; i <= product.stock; i++) product.available.push(i); return (product.available)
			});
			setProducts(res.data);
			setFilteredProduct(res.data);
		}).catch(err => {
			console.log('Se produjo el siguiente error: ', err);
		});
	}
	// Get all clients
	const initClients = () => {
		clientService.getAll().then(res => {
			setClients(res.data);
			setFilteredClient(res.data);
		}).catch(err => { console.log('Se produjo el siguiente error: ', err); })
	}
	// Find product by id
	const searchProduct = (event) => {
		const filter = products.filter((product) => product.id.toString() === event.target.value);
		setFilteredProduct(filter);
	}
	// Find client by id
	const searchClient = (event) => {
		const filter = clients.filter((client) => client.idClient.toString() === event.target.value);
		setFilteredClient(filter);
	}

	const addProduct = (product) => { setAddedProduct([...addedProduct, product]) } // Add product to invoice

	const deleteProduct = (index) => { setAddedProduct(addedProduct.filter((product, i) => i !== index)) } // Delete product from invoice

	const saveInvoice = (event) => {
		event.preventDefault();
		const getTotal = addedProduct.reduce((total, product) => { return total + product.subTotal }, 0);
		addedProduct.map((product) => { delete product.stock; delete product.available; return product });
		addedProduct.map((product) => { if (product.quantity === undefined) product.quantity = 1; return product });

		const invoice = {
			date: date ? new Date(date) : new Date(), // Create date
			idClient: parseInt(idClient), // Get client id
			clientName: `${filteredClient[0].name} ${filteredClient[0].lastName}`, // Get client name
			total: getTotal, // Get total
			products: JSON.stringify(addedProduct), // Convert products to string
		};
		// create invoice
		invoiceService.create(invoice).then(() => { history.push('/invoices') }).catch((error) => { console.log('Se produjo el siguiente error:', error) })
	}

	const currencyFormat = (num) => { return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }

	const totalProduct = (event, index) => {
		event.preventDefault();
		setAddedProduct(addedProduct.map((product, i) => {
			if (i === index) {
				product.subTotal = product.price * event.target.value;
				product.quantity = event.target.value;
			};
			return product
		}));
	}

	const savePDF = (event) => {
		event.preventDefault();
		PdfGenerate(id, date.substring(0, 10), idClient, clientName, addedProduct);
	}

	const textValid = (event, key) => {
		const { value } = event.target;
		switch (key) {
			case 'idClient':
				if (numRegex.test(value) || value === '') setIdClient(value);
				break;
			case 'idProduct':
				if (numRegex.test(value) || value === '') setIdProduct(value);
				break;
			default:
				break;
		}
	}

	// Get invoice by id when show
	useEffect(() => {
		if (id) {
			invoiceService.get(id)
				.then((invoice) => {
					const { date, idClient, clientName, products } = invoice.data;
					setDate(date);
					setIdClient(idClient);
					setClientName(clientName);
					setAddedProduct(JSON.parse(products));
				}).catch((error) => {
					console.log('Se produjo el siguiente error:', error);
				});
		}
	}, [id]);

	// Get all products and clients when create
	useEffect(() => { if (!id) { initProducts(); initClients(); } }, [id]);

	return (
		<Fragment>
			<div className="container">
				<h3 className="text-center mt-3">Crear Factura</h3>
				<h4>Fecha: {date.substring(0, 10)} </h4>
				<table className="table">
					<thead className="thead-dark">
						<tr><th>Id Client</th><th>Código de Producto</th></tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<input
									type="text"
									className="form-control mb-3"
									placeholder="Escriba la ID del cliente"
									value={idClient}
									onChange={(event) => { searchClient(event); textValid(event, 'idClient') }}
									disabled={id}
								/>
								<input type="text" className="form-control"
									value={
										filteredClient.length === 1 ? `${filteredClient[0].name} ${filteredClient[0].lastName}` : clientName ? clientName : ''} disabled />
							</td>
							<td>
								<div className="input-group mb-3">
									<input
										type="text"
										className="form-control"
										placeholder="Escriba el código del producto"
										value={idProduct}
										onChange={(event) => { searchProduct(event); textValid(event, 'idProduct') }}
										disabled={id}
									/>
									<div className="input-group-append">
										<button
											className="btn btn-success"
											type="button"
											onClick={(event) => { addProduct(filteredProduct[0]) }}
											disabled={
												filteredProduct.length !== 1
												|| addedProduct.some((product) => product.id === filteredProduct[0].id)
											}>Agregar</button>
									</div>
								</div>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										value={filteredProduct.length === 1 ? filteredProduct[0].name : ''}
										disabled />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<table className="table table-bordered table-striped fixed_header">
					<thead className="thead-dark">
						<tr>
							<th>Código</th><th>Descripción</th><th>Precio Unit.</th><th>Cantidad</th><th>Sub Total</th><th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{addedProduct.map((product, index) => (
							<tr key={index} >
								<td className="text-center">{product.id}</td>
								<td>{product.name}</td>
								<td className="text-center">{currencyFormat(product.price)}</td>
								<td className="text-center">
									{id ? product.quantity
										: <select className="form-control" onChange={(event) => { totalProduct(event, index); }}>
											{product.available.map((available, index) => {
												return (<option key={index} value={available}>{available}</option>)
											})}
										</select>
									}
								</td>
								<td className="text-center">{currencyFormat(product.subTotal)}</td>
								<td className="text-center">
									{!id ? <Link to={`/add-invoice`} className="text-danger m-2" onClick={(event) => { deleteProduct(index) }}>
										<FaIcons.FaTrashAlt /></Link> : 'No disponible'}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div>
					<div className="row">
						<div className="col-md-12 text-right">
							<h2>Total: {currencyFormat(addedProduct.reduce((total, product) => { return total + product.subTotal }, 0))}</h2>
						</div>
					</div>
				</div>
				<div>
					{!id &&
						<button
							onClick={(event) => saveInvoice(event)}
							className="btn btn-primary"
							disabled={addedProduct.length === 0 || idClient.length === 0}
							>Guardar</button>}
					{id && <button onClick={(event) => savePDF(event)} className="btn btn-secondary ml-2">Descargar PDF</button>}
				</div>
				<hr />
				<Link to="/invoices">Volver a la lista</Link>
			</div>
		</Fragment>
	);
}

export default AddInvoice;