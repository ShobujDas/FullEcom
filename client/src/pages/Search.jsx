import Layout from '../components/Layout/Layout';
// import React from 'react'
import { useSearch } from '../context/Search'

function Search() {
   const [values,setValues] = useSearch();
  return (
    <Layout title='Search results'>
      <div className="container">
         <div className="text-center">
            <h2>Search Results</h2>
            <h6>{values?.results.length < 1 ? "No Products Found" : `Round ${values?.results.length}`}</h6>
            <div className="d-flex flex-wrap mt-4">
              {values?.results.map((elem) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={elem._id}
                >
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${elem._id}`}
                    className="card-img-top"
                    alt={elem.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{elem.name}</h5>
                    <p className="card-text">$ {elem.price}</p>
                    <p className="card-text">
                      {elem.description.substring(0, 30)}
                    </p>
                    <button className="btn btn-primary ms-1">
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      ADD To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </div>

    </Layout>
  )
}

export default Search