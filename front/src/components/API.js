import React, { Fragment, useState, useEffect } from 'react';

const API = () => {
	const [articulos, setArticulos] = useState([])
	const [recuperado, setRecuperado] = useState(false)


	function mostrarTabla() {
		return (
			<div>
				<table border="1">
					<thead>
						<tr>
							<th>Id</th>
							<th>Title</th>
						</tr>
					</thead>
					<tbody>
						{articulos.map(art => {
							return (
								<tr key={art.id}>
									<td>{art.id}</td>
									<td>{art.title}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}

	useEffect(() => {
		fetch('https://gutendex.com/books/')
			.then((response) => {
				return response.json()
			})
			.then((articulos) => {
				setArticulos(articulos.results)
				setRecuperado(true)
			})
	}, [])

	if (recuperado)
		return mostrarTabla()
	else
		return (<div>recuperando datos...</div>)
}

export default API;