import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  //getALL Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      // console.log(data.products);
      if (data.success) {
        toast.success("Get all Producs");
        setProducts(data.products);
      } else {
        toast.error("Something went Wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //lifecycel method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">App Products List</h1>
            <div className="d-flex ">
              {products?.map((elem) => (
                
                  <Link to={`/dashboard/admin/product/${elem.slug}`} key={elem._id} className="product-link">
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        src={`http://localhost:8080/api/v1/product/product-photo/${elem._id}`}
                        className="card-img-top"
                        alt={elem.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{elem.name}</h5>
                        <p className="card-text">
                          {elem.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
