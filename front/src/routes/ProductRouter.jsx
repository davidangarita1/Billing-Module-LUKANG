import React from 'react'
import Product from '../components/Product';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const ProductRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/product" component={Product} />
			</Switch>
		</Router>
	);
}
 
export default ProductRouter;