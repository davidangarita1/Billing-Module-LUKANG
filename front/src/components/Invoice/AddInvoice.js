import { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useParams } from 'react-router';
import invoiceService from '../../services/InvoiceService';
import productService from '../../services/ProductService';
import * as FaIcons from 'react-icons/fa';
import PdfGenerate from './PDF';

const AddInvoice = () => {
	const [date, setDate] = useState('');
	const [idClient, setIdClient] = useState(0);
	const [iva, setIva] = useState(0);
	const [subTotal, setSubTotal] = useState(0);
	const [total, setTotal] = useState(0);
	const [addedProduct, setAddedProduct] = useState([]);
	const history = useHistory();

	const { id } = useParams();

	const init = () => {
		productService.getAll().then(res => {
			res.data.map(product => {
				return (product.subTotal = product.price)
			});
			res.data.map(product => {
				product.quantity = [];
				for(let i = 1; i <= product.stock; i++) {
					product.quantity.push(i);
				}
				return (product.quantity)
			});
			setAddedProduct(res.data);
		}).catch(err => {
			console.log('Se produjo el siguiente error: ', err);
		});
	}

	const addProduct = (product) => {
		setAddedProduct([...addedProduct, product]);
	}

	const delProduct = (index) => {
		setAddedProduct(addedProduct.filter((product, i) => i !== index));
	}

	const saveInvoice = (event) => {
		event.preventDefault();

		const invoice = { date, idClient, iva, subTotal, total, id };
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
					const { date, idClient, iva, subTotal, total } = invoice.data;
					setDate(date);
					setIdClient(idClient);
					setIva(iva);
					setSubTotal(subTotal);
					setTotal(total);
				}).catch((error) => {
					console.log('Se produjo el siguiente error:', error);
				});
		}
	}, [id]);

	useEffect(() => {
		init();
	}, []);

	return (
		<Fragment>
			<div className="container w-80">
				<h3 className="text-center mt-3">Crear Factura</h3>
				<hr />
				<form className="col-sm-12 col-lg-12 offset-sm-4 offset-lg-4">
					<div className="form-group">
						<label>Id Cliente</label>
						<input
							type="text"
							className="form-control col-4"
							id="name"
							value={idClient}
							onChange={(event) => idClient(event.target.value)}
							placeholder="Indentificación del cliente"
							required
						/>
					</div>
				</form>
				<table className="table table-bordered table-striped">
					<thead className="thead-dark text-center">
						<tr>
							<th>Código</th>
							<th>Descripción</th>
							<th>Precio Unit.</th>
							<th>Cantidad</th>
							<th>Sub Total</th>
							<th colSpan="2">Acciones</th>
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
											return (<option key={index} value={quantity}>{quantity}</option>)})}
									</select>
								</td>
								<td className="text-center">$ {product.subTotal}</td>
								<td className="text-center">
									<Link to={`/add-invoice`} className="text-danger m-2" onClick={(event) => { delProduct(index) }}>
										<FaIcons.FaTrashAlt />
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
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