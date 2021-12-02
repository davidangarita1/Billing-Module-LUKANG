import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import invoiceService from '../../services/InvoiceService';
import * as FaIcons from 'react-icons/fa';

const InvoiceList = () => {
	const [invoices, setInvoices] = useState([]);
	const [filteredInvoices, setFilteredInvoices] = useState([]);

	const init = () => {
		invoiceService.getAll().then(res => {
			res.data.forEach(invoice => invoice.date = invoice.date.substring(0, 10));
			setInvoices(res.data);
			setFilteredInvoices(res.data);
		}).catch(err => {
			console.log('Se produjo el siguiente error: ', err);
		});
	}

	const searchInvoice = (event) => {
		const search = event.target.value;
		const filter = invoices.filter((invoice) =>
			invoice.idClient.toString().includes(search) ||
			invoice.id.toString().includes(search) ||
			invoice.date.toString().includes(search));
		setFilteredInvoices(filter);
	}

	useEffect(() => {
		init();
	}, []);

	return (
		<Fragment>
			<div className="container">
				<div className="row text-center title">
					<div className="col-md-12">
						<h2>Lista de Facturas</h2>
					</div>
				</div>

				<div className="input-group input-group-lg mb-3 mt-3">
					<div className="input-group-prepend">
						<span className="input-group-text"><FaIcons.FaSearch /></span>
					</div>
					<input
						type="text"
						className="form-control"
						placeholder="Buscar factura"
						aria-label="Large"
						aria-describedby="inputGroup-sizing-sm"
						onChange={searchInvoice} />
					<div className="input-group-append">
						<Link to="add-invoice" className="btn btn-success">Crear Factura</Link>
					</div>
				</div>
				<table className="table table-bordered table-striped text-center">
					<thead className="thead-dark">
						<tr>
							<th>Código</th>
							<th>Fecha</th>
							<th>ID Cliente</th>
							<th>Total</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{filteredInvoices.map(invoice => (
							<tr key={invoice.id}>
								<td>{invoice.id}</td>
								<td>{invoice.date}</td>
								<td>{invoice.idClient}</td>
								<td>{invoice.total}</td>
								<td className="text-center">
									<Link to={`/invoice/show/${invoice.id}`} className="text-info m-2">
										<FaIcons.FaEye />
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

export default InvoiceList;