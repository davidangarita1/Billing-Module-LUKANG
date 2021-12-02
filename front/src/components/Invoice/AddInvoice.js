import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import invoiceService from '../../services/InvoiceService';
import productService from '../../services/ProductService';
import clientService from '../../services/ClientService';
import * as FaIcons from 'react-icons/fa';
import PdfGenerate from './PDF';
import './AddInvoice.css';

const AddInvoice = () => {
	const [date, setDate] = useState('');
	const [idClient, setIdClient] = useState(0);
	const [subTotal, setSubTotal] = useState(0);
	const [total, setTotal] = useState(0);
	const [addedProduct, setAddedProduct] = useState([]);
	const [products, setProducts] = useState([]);
	const [filteredProduct, setFilteredProduct] = useState([]);
	const [clients, setClients] = useState([]);
	const [filteredClient, setFilteredClient] = useState([]);
	const history = useHistory();
	const { id } = useParams();

	const initProducts = () => {
		productService.getAll().then(res => {
			res.data.map(product => product.subTotal = product.price);
			res.data.map(product => {
				product.quantity = [];
				for (let i = 1; i <= product.stock; i++) product.quantity.push(i);
				return (product.quantity)
			});
			setProducts(res.data);
			setFilteredProduct(res.data);
		}).catch(err => {
			console.log('Se produjo el siguiente error: ', err);
		});
	}

	const initClients = () => {
		clientService.getAll().then(res => {
			setClients(res.data);
			setFilteredClient(res.data);
		}).catch(err => {
			console.log('Se produjo el siguiente error: ', err);
		});
	}

	const searchProduct = (event) => {
		const filter = products.filter((product) => product.id.toString() === event.target.value);
		setFilteredProduct(filter);
	}

	const searchClient = (event) => {
		const filter = clients.filter((client) => client.idClient.toString() === event.target.value);
		setFilteredClient(filter);
	}

	const addProduct = (product) => {
		setAddedProduct([...addedProduct, product]);
	}

	const deleteProduct = (index) => {
		setAddedProduct(addedProduct.filter((product, i) => i !== index));
	}

	const saveInvoice = (event) => {
		event.preventDefault();

		const invoice = { date, idClient, subTotal, total, id };
		if (id) {
			// update
			invoiceService.update(invoice)
				.then((response) => {
					console.log('La factura fue actualizada correctamente', response.data);
					history.push('/invoices');
				}).catch((error) => {
					console.log('Se produjo el siguiente error:', error);
				});
		} else {
			// create
			invoiceService.create(invoice)
				.then((response) => {
					console.log('Factura agregada correctamente', response.data);
					history.push('/invoices');
				}).catch((error) => {
					console.log('Se produjo el siguiente error:', error);
				});

		}
	}
	const totalProduct = (event, index) => {
		event.preventDefault();
		setAddedProduct(addedProduct.map((product, i) => {
			if (i === index) {
				product.subTotal = product.price * event.target.value;
			}
			return product;
		}));
	}

	const savePDF = (event, addedProduct) => {
		event.preventDefault();
		PdfGenerate(addedProduct);
	}

	useEffect(() => {
		if (id) {
			invoiceService.get(id)
				.then((invoice) => {
					const { date, idClient, subTotal, total } = invoice.data;
					setDate(date);
					setIdClient(idClient);
					setSubTotal(subTotal);
					setTotal(total);
				}).catch((error) => {
					console.log('Se produjo el siguiente error:', error);
				});
		}
	}, [id]);

	useEffect(() => {
		initProducts();
		initClients();
	}, []);

	return (
		<Fragment>
			<div className="container">
				<h3 className="text-center mt-3">Crear Factura</h3>
				<table className="table">
					<thead className="thead-dark">
						<tr>
							<th>Id Client</th>
							<th>Código de Producto</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<input
									type="text"
									className="form-control mb-3"
									placeholder="Escriba la ID del cliente"
									onChange={(event) => { searchClient(event) }}
								/>
								<input type="text" className="form-control"
									value={filteredClient.length === 1 ? `${filteredClient[0].name} ${filteredClient[0].lastName}` : ''} disabled />
							</td>
							<td>
								<div className="input-group mb-3">
									<input
										type="text"
										className="form-control"
										placeholder="Escriba el código del producto"
										onChange={(event) => { searchProduct(event) }}
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
							<th>Código</th>
							<th>Descripción</th>
							<th>Precio Unit.</th>
							<th>Cantidad</th>
							<th>Sub Total</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{addedProduct.map((product, index) => (
							<tr key={index} >
								<td className="text-center">{product.id}</td>
								<td>{product.name}</td>
								<td className="text-center">$ {product.price}</td>
								<td className="text-center">
									<select className="form-control" onChange={(event) => totalProduct(event, index)}>
										{product.quantity.map((quantity, index) => {
											return (<option key={index} value={quantity}>{quantity}</option>)
										})}
									</select>
								</td>
								<td className="text-center">$ {product.subTotal}</td>
								<td className="text-center">
									<Link to={`/add-invoice`} className="text-danger m-2" onClick={(event) => { deleteProduct(index) }}>
										<FaIcons.FaTrashAlt />
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div>
					<div className="row">
						<div className="col-md-12 text-right">
							<h2>
								Total: $ {addedProduct.reduce((total, product) => { return total + product.subTotal }, 0)}
							</h2>
						</div>
					</div>
				</div>
				<div>
					<button onClick={(event) => saveInvoice(event)} className="btn btn-primary">
						Guardar
					</button>
					<button onClick={(event) => savePDF(event, addedProduct)} className="btn btn-secondary ml-2">
						Descargar PDF
					</button>
				</div>
				<hr />
				<Link to="/invoices">Volver a la lista</Link>
			</div>
		</Fragment>
	);
}

export default AddInvoice;