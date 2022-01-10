import React, {useEffect, useState} from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


function Order() {
  //
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [orderInput, setOrderInput] = useState({
      contact_name: '',
      contact_phone: '',
      real_estate: '',
      description: '',
      deadline: '',
      company_id: '',
      category_id: '',
      error_list: [],
  });
  const [categoryList, setCategoryList] = useState([]);
  const [show, setShow] = useState(false);

  //
  useEffect(() => {
      let isMountered = true;

      axios.get('api/list-order').then(res => {
          if(isMountered)
          {
              if(res.data.status === 200)
              {
                  //
                  console.log(res.data.orders);
                  setOrder(res.data.orders);
                  setLoading(false);
              }
          }
      });

      return () => {
          isMountered = false;
      }
  });

  //
  useEffect(() => {

    axios.get('api/list-category').then(res => {
        //
        if(res.data.status === 200)
        {
            console.log(res.data.categories);
            setCategoryList(res.data.categories);
        }
    });
}, [])

  //
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //
  const history = useNavigate();
  
  //
  const handleInput = (e) => {
      e.persist();
      setOrderInput({...orderInput, [e.target.name]: e.target.value});
  }

    //
    const submitOrder = (e) => {
      e.preventDefault();
  
      const data = {
          contact_name: orderInput.contact_name,
          contact_phone: orderInput.contact_phone,
          real_estate: orderInput.real_estate,
          description: orderInput.description,
          deadline: orderInput.deadline,
          company_id: orderInput.company_id,
          category_id: orderInput.category_id,
      }
  
      axios.post('api/store-order', data).then(res => {
          if(res.data.status === 200)
          {
              //
              swal("Success", res.data.message, "success");
              document.getElementById('ORDER_FORM').reset();
              handleClose();
              history.push('/order');
          }
          else if(res.data.status === 400)
          {
              //
              setOrderInput({...orderInput, error_list: res.data.errors});
          }
          else{
              //
          }
      });
  }

  //
  if(loading)
  {
      return <h4>Loading Orders...</h4>
  }
  else
  {
      var showOrders = '';
      showOrders = order.map((item, idx) => {
          return (
            <tr key={idx}>
              <th scope="col">{++idx}</th>
              <td>{item.category.name}</td>
              <td>{item.contact_name} {item.contact_phone}</td>
              <td>{item.real_estate}</td>
              <td>{item.company.name}</td>
              <td>{item.deadline}</td>
            </tr>
          )
      });
  }

  return (
      <div>
        <section className="masthead bg-default">
              <div className="container">
                <div className="row mb-3">
                  <div className="col-lg-12">
                    <button onClick={handleShow} className="btn btn-secondary btn-sm float-end" data-toggle="modal">Open new order</button>
                  </div>
                </div>

                <div className="row">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Agency</th>
                        <th scope="col">Company</th>
                        <th scope="col">Deadline</th>
                      </tr>
                    </thead>
                    <tbody>
                      {showOrders}
                    </tbody>
                  </table>
                </div>
              </div>
          </section>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                New Order
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={submitOrder} id="ORDER_FORM">
              <Row className="mb-3">
                <Col xs={4}>
                  <Form.Label>Contact Name</Form.Label>
                  <Form.Control type="text" placeholder="Contact Name" name="contact_name" onChange={handleInput} value={orderInput.contact_name}  />
                </Col>
                <Col xs={4}>
                  <Form.Label>Contact Phone</Form.Label>
                  <Form.Control type="text" placeholder="Contact Phone" name="contact_phone" onChange={handleInput} value={orderInput.contact_phone}  />
                </Col>
                <Col xs={4}>
                  <Form.Label>Real Estate Agency</Form.Label>
                  <Form.Control type="text" placeholder="Real Estate Agency" name="real_estate" onChange={handleInput} value={orderInput.real_estate}  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={8}>
                  <Form.Group className="mb-3">
                      <Form.Label>Order Description</Form.Label>
                      <Form.Control as="textarea" placeholder="Description" name="description" onChange={handleInput} value={orderInput.description}  rows={3} />
                  </Form.Group>
                  </Col>
                  <Col xs={4}>
                  <Form.Group>
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" placeholder="Company" name="company_id" onChange={handleInput} value={orderInput.company_id}  />
                </Form.Group>
                  </Col>
                  </Row>
                  <Row className="mb-3">
                  <Col xs={8}>
                  <Form.Group>
                    <Form.Label>Select the order category</Form.Label>
                    <Form.Select name="category_id" onChange={handleInput} value={orderInput.category_id} >
                      <option>Select One Category</option>
                      {
                          categoryList.map((item) => {
                              return (
                                  <option value={item.id} key={item.id}>{item.name}</option>
                              )
                          })
                      }
                    </Form.Select>
                  </Form.Group>
                  </Col>
                  <Col xs={4}>
                  <Form.Group>
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control type="date" placeholder="Deadline" name="deadline" onChange={handleInput} value={orderInput.deadline}  />
                </Form.Group>
                  </Col>
                </Row>
                <Button variant="success" type="submit" block>Save</Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleClose} variant="secondary">Close</Button>
            </Modal.Footer>
          </Modal>
    </div>
  )
}

export default Order;