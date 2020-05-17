import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Products from "./Products/components/Products";
import ProductForm from "./components/productform/ProductForm";

const App = () => {
  const routes = (
    <Switch>
      <Route path='/products' exact>
        <Products />
      </Route>
      <Route path='/products/new' exact>
        <ProductForm />
      </Route>

      <Route
        exact
        path='/products/:productId'
        render={(props) => <ProductForm {...props} />}
      />
      <Redirect to='/products' />
    </Switch>
  );

  return (
    <React.Fragment>
      <Router>
        <Navigation />
        <main>{routes}</main>
      </Router>
    </React.Fragment>
  );
};

export default App;
