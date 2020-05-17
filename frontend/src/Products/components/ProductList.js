import React from "react";
import { Table, Button, Container, Row, Alert, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

const ProductList = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

  const handleDeleteClick = async (id) => {
    try {
      await sendRequest(
        `http://localhost:5000/api/wallet/deleteProduct/${id}`,
        "DELETE"
      );
      props.onDeleteProduct(id);
    } catch (err) {}
  };

  const productEditHandler = async (productId) => {
    history.push("/products/" + productId);
  };

  if (props && props.items && props.items.length === 0) {
    return (
      <div className='center'>
        <h2>No products found.</h2>
      </div>
    );
  }

  return (
    <Container>
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
      <Table striped bordered hover variant='dark' responsive>
        <thead>
          <tr>
            <th>SNO</th>
            <th>Date</th>
            <th>Description</th>
            <th>Income/Expense</th>
            <th>Amount</th>
            <th>Summary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.date}</td>
              <td>{product.description}</td>
              <td>{product.amountType}</td>
              <td>{product.amount}</td>
              <td>
                Summary is {product.amountType === "Expense" ? "-" : "+"}
                {product.amount}
              </td>
              <td>
                {" "}
                <Button
                  variant='primary'
                  onClick={() => productEditHandler(product.id)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant='danger'
                  onClick={() => handleDeleteClick(product.id)}
                >
                  Delete
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductList;
