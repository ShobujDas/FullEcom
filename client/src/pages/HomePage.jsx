import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/Auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      // console.log(data.category);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal()
  }, []);

  //get porducts
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false)
      // console.log(data);
      setProducts(data.products);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

    //getTotal Conunt 
    const getTotal = async()=>{
      try {
        const {data} = await axios.get('http://localhost:8080/api/v1/product/product-count');
        setTotal(data?.total);
  
      } catch (error) {
        console.log(error);
        
      }
    }

    useEffect(()=>{
      if(page === 1) return
      loadMore()
    },[page])
    //load more
    const loadMore = async()=>{
      try {
        setLoading(true)
        const {data} = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
        setLoading(false)
        setProducts([...products,...data?.products]);
      } catch (error) {
        setLoading(false)
        console.log(error);
        
      }
    }

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Layout title={"All Products - Best offer"}>
        <div className="row">
          <div className="col-md-2">
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group
                onChange={(e) => {
                  setRadio(e.target.value);
                }}
              >
                {Prices.map((e) => (
                  <div className="" key={e._id}>
                    <Radio value={e.array}>{e.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column mt-3">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTER
              </button>
            </div>
          </div>
          <div className="col-md-10">
            {/* <pre>{JSON.stringify(checked, null, 4)}</pre> */}
            <h1 className="text-center"> All Products</h1>
            <div className="d-flex flex-wrap">
              {products?.map((elem) => (
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
                    <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${elem.slug}`)}>
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      ADD To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button className="btn btn-warning" onClick={(e) =>{
                  e.preventDefault();
                  setPage(page +1 )
                }}>{loading ? "Loading ..." : "Loadmore"}</button>
              )}
              
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default HomePage;
