import axios from "axios";
import Layout from "../components/Layout/Layout"
import { useSearch } from "../context/Search"
import { useParams } from "react-router-dom";
import { useEffect } from "react";


function CategoryProduct() {
  const [products,setProducts] = useSearch([]);
  const [category,setCategory] = useSearch([]);
  const params = useParams();
  const getProductsByCat = async()=>{
   try {
    const {data} = await axios.get(`http://localhost:8080/api/v1/product/product-category/${params.slug}`);
    setProducts(data?.products)
    setCategory(data?.category)
    
   } catch (error) {
    console.log(error);
    
   } 
  }

  useEffect(()=>{
    if(params?.slug) getProductsByCat();


  },[params?.slug])
  
  return (
    <Layout>
      <div className="container">
       
        <h1>{category?.name}</h1>
        <p>{products?.length} product is found</p>
      </div>
    </Layout>
  )
}

export default CategoryProduct