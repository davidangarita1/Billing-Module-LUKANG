import { Fragment } from "react";

const NotFound = () => {
	return (
		<Fragment>

			<div className="container">
				<div className="row text-center mt-3">
					<div className="col-md-12">
						<h3>La página no fue encontrada, porfavor escriba una URL valida.</h3>
						<img src="https://miracomosehace.com/wp-content/uploads/2020/07/http-404-not-found.jpg" className="img-fluid" alt="Not found" />
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default NotFound;