import React, {useEffect, useState} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Category() {
  //
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [categoryInput, setCategoryInput] = useState({
      name: '',
      tag: '',
      description: '',
      error_list: [],
  });
  const [show, setShow] = useState(false);

  //
  useEffect(() => {
      let isMountered = true;

      axios.get('api/list-category').then(res => {
          if(isMountered)
          {
              if(res.data.status === 200)
              {
                  //
                  console.log(res.data.categories);
                  setCategory(res.data.categories);
                  setLoading(false);
              }
          }
      });

      return () => {
          isMountered = false;
      }
  });

  //
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //
  const history = useNavigate();
  
  //
  const handleInput = (e) => {
      e.persist();
      setCategoryInput({...categoryInput, [e.target.name]: e.target.value});
  }

  //
  const submitCategory = (e) => {
      e.preventDefault();

      const data = {
          name: categoryInput.name,
          tag: categoryInput.tag,
          description: categoryInput.description,
      }

      axios.post('api/store-category', data).then(res => {
          if(res.data.status === 200)
          {
              //
              swal("Success", res.data.message, "success");
              document.getElementById('CATEGORY_FORM').reset();
              handleClose();
              history.push('/category');
          }
          else if(res.data.status === 400)
          {
              //
              setCategoryInput({...categoryInput, error_list: res.data.errors});
          }
          else{
              //
          }
      });
  }

  //
  if(loading)
  {
      return <h4>Loading Categories...</h4>
  }
  else
  {
      var showCategories = '';
      showCategories = category.map((item, idx) => {
          return (
            <tr key={idx}>
              <th scope="col">{++idx}</th>
              <td>{item.name}</td>
              <td>{item.tag}</td>
              <td>{item.description}</td>
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
                    <button onClick={handleShow} className="btn btn-secondary btn-sm float-end" data-toggle="modal">Open new category</button>
                  </div>
                </div>

                <div className="row">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Tag</th>
                        <th scope="col">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {showCategories}
                    </tbody>
                  </table>
                </div>
              </div>
          </section>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                New Category
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={submitCategory} id="CATEGORY_FORM">
                  <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Name" name="name" onChange={handleInput} value={categoryInput.name} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                      <Form.Label>Tag</Form.Label>
                      <Form.Control type="text" placeholder="Tag" name="tag" onChange={handleInput} value={categoryInput.tag}  />
                  </Form.Group>
                  <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control as="textarea" placeholder="Description" name="description" onChange={handleInput} value={categoryInput.description}  rows={3} />
                  </Form.Group>
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

export default Category;