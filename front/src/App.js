import ProductList from './components/ProductList';
import ClientList from './components/ClientList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import AddProduct from './components/AddProduct';

const App = () => {
  return (
    <div className="container">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route path="/add-product" component={AddProduct} />
            <Route exact path="/clients" component={ClientList} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
