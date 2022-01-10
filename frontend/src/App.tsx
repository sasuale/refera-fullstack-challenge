import React from 'react';
import { Header } from './components/Header';
import { Page, usePage } from './contexts/Page';
import { CategoryIndex } from './pages/Category';

const App = () => {
  const { page } = usePage();

  const renderSwitch = () => {
    switch(page){
      case Page.Category:
        return <CategoryIndex />;
      case Page.Company:
        return <div>Company</div>;
      case Page.Order:
        return <div>Order</div>;
      default:
        return '';
    }
  }

  return (
    <div className='App'>
      <Header />

        <section className="masthead bg-default">
            <div className="container">
              <div className="row mb-3">
                <div className="col-lg-12">
                  <button className="btn btn-secondary btn-sm float-end">Open new order</button>
                </div>
              </div>

              <div className="row">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Category</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Agency</th>
                      <th scope="col">Company</th>
                      <th scope="col">Deadline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="col">1</th>
                      <td>Hidraulica</td>
                      <td>Alcides (11)99999-9999</td>
                      <td>Imobiliaria Sampa</td>
                      <td>Reparos S.A</td>
                      <td>10/11/2021</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </section>
      {renderSwitch()}
    </div>
  );
}

export default App;
