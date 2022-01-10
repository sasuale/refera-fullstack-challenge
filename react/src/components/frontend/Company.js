import React, {useEffect, useState} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Company() {
  //
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState([]);
  const [companyInput, setCompanyInput] = useState({
      name: '',
      tag: '',
      description: '',
      error_list: [],
  });
  const [show, setShow] = useState(false);

  //
  useEffect(() => {
      let isMountered = true;

      axios.get('api/list-company').then(res => {
          if(isMountered)
          {
              if(res.data.status === 200)
              {
                  //
                  console.log(res.data.companies);
                  setCompany(res.data.companies);
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
      setCompanyInput({...companyInput, [e.target.name]: e.target.value});
  }

  //
  const submitCompany = (e) => {
    e.preventDefault();

    const data = {
        name: companyInput.name,
        tag: companyInput.tag,
        description: companyInput.description,
    }

    axios.post('api/store-company', data).then(res => {
        if(res.data.status === 200)
        {
            //
            swal("Success", res.data.message, "success");
            document.getElementById('COMPANY_FORM').reset();
            handleClose();
            history.push('/company');
        }
        else if(res.data.status === 400)
        {
            //
            setCompanyInput({...companyInput, error_list: res.data.errors});
        }
        else{
            //
        }
    });
}

  //
  if(loading)
  {
      return <h4>Loading Companies...</h4>
  }
  else
  {
      var showCompanies = '';
      showCompanies = company.map((item, idx) => {
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
                    <button onClick={handleShow} className="btn btn-secondary btn-sm float-end" data-toggle="modal">Open new company</button>
                  </div>
                </div>

                <div className="row">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Company</th>
                        <th scope="col">Tag</th>
                        <th scope="col">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {showCompanies}
                    </tbody>
                  </table>
                </div>
              </div>
          </section>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                New Company
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={submitCompany} id="COMPANY_FORM">
                  <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Name" name="name" onChange={handleInput} value={companyInput.name} required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                      <Form.Label>Tag</Form.Label>
                      <Form.Control type="text" placeholder="Tag" name="tag" onChange={handleInput} value={companyInput.tag}  />
                  </Form.Group>
                  <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control as="textarea" placeholder="Description" name="description" onChange={handleInput} value={companyInput.description}  rows={3} />
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

export default Company;