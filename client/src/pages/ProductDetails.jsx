import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts,setRelatedProducts] = useState([]);

  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.products);
      getSimilarProduct(data?.products._id,data?.products.category._id)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //get Similar product
  const getSimilarProduct = async(pid,cid)=>{
      try {
         const {data} = await axios.get(`http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`);
         setRelatedProducts(data?.products)
      } catch (error) {
         console.log(error);
         
      }
  }




  return (
    <Layout>
      <div className="row mt-2">
        <div className="col-md-6">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={"300"}

          />
        </div>
        <div className="col-md-6 ">
         <h1 className="text-center">Product Details</h1>
         <h6>Name : {product.name} </h6>
         <h6>Description : {product.description} </h6>
         <h6>Price : {product.price} </h6>
         {/* <h6>Categroy : {product.category.name} </h6> */}
          <button className="btn btn-primary">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <hr />
      <div className="row container">
        <h1>Simillar Products </h1>
        {relatedProducts.length <1 && (<p>No Similar Products found</p>)}
        <div className="d-flex flex-wrap">
              {relatedProducts?.map((elem) => (
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
                    
                    <button className="btn btn-secondary ms-1">
                      ADD To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
        
      </div>
    </Layout>
  );
}

export default ProductDetails;
