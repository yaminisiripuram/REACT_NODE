import React, { useEffect, useState } from "react";

import ProductList from "./ProductList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Spinner, Alert, Row } from "react-bootstrap";

const Products = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedProducts, setloadedProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/wallet/products"
        );
        setloadedProducts(responseData.products);
      } catch (err) {}
    };
    fetchProducts();
  }, [sendRequest]);

  const productDeletedHandler = (deletedPlaceId) => {
    setloadedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      {error && (
        <Row className='justify-content-md-center'>
          <Alert variant='danger' onClose={clearError} dismissible>
            <p>{error}</p>
          </Alert>
        </Row>
      )}

      {isLoading && (
        <Row className='justify-content-md-center'>
          <Spinner animation='border' />
        </Row>
      )}
      {!isLoading && loadedProducts && (
        <ProductList
          items={loadedProducts}
          onDeleteProduct={productDeletedHandler}
        />
      )}
    </React.Fragment>
  );
};

export default Products;
