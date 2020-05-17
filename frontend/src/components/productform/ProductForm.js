import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

const ProductForm = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const initialproduct = {
    id: null,
    date: "",
    description: "",
    amountType: "",
    amount: "",
  };
  const [product, setProduct] = useState(initialproduct);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    if (props && props.match) {
      const fetchProductById = async () => {
        try {
          const productData = await sendRequest(
            `http://localhost:5000/api/wallet/getProduct/${props.match.params.productId}`
          );
          setProduct(productData.product);
          setEdit(true);
          setId(props.match.params.productId);
        } catch (err) {}
      };
      fetchProductById();
    }
  }, [props, sendRequest]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = !edit
      ? "http://localhost:5000/api/wallet/addProduct"
      : `http://localhost:5000/api/wallet/updateProduct/${id}`;
    const method = !edit ? "POST" : "PUT";
    try {
      await sendRequest(url, method, JSON.stringify(product), {
        "Content-Type": "application/json",
      });
      history.push("/products");
    } catch (err) {}
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

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
      <Row className='justify-content-md-center'>
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title>{!edit ? "Add" : "Edit"} Product</Card.Title>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId='date'>
                <Form.Label>Date</Form.Label>
                <br></br>
                <input
                  className='w-100'
                  type='date'
                  name='date'
                  value={product.date}
                  onChange={handleInputChange}
                ></input>
              </Form.Group>
              <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={product.description}
                  name='description'
                  as='textarea'
                  rows='3'
                  placeholder='Enter Description'
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId='amountType'>
                <Form.Label>Income/Expense</Form.Label>
                <Form.Control
                  as='select'
                  name='amountType'
                  value={product.amountType}
                  onChange={handleInputChange}
                >
                  <option value=''>Select</option>
                  <option value='Income'>Income</option>
                  <option value='Expense'>Expense</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='amount'>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type='text'
                  placeholder=' Enter Amount'
                  name='amount'
                  value={product.amount}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant='primary' type='submit'>
                {!edit ? "Add" : "Update"} Product
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default ProductForm;
