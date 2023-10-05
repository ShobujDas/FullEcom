import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visiable, setVisiable] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");


  // create category 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
      setName("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in imput form");
    }
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      console.log(data.category);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("SomeThind went wrongt in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);



  //Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${data.name} is Updated`);
      } else {
        toast.error(data.error);
      }
      setUpdatedName("");
      setSelected(null);
      setVisiable(false);
      getAllCategory();
    } catch (error) {
      console.log(error);
      toast.error("something went error");
    }
  };


  //Delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
      } else {
        toast.error(data.error);
      }
      getAllCategory();
    } catch (error) {
      console.log(error);
      toast.error("something went error");
    }
  };



  //ei babe o hoy 
  // useEffect(() => {
  //   getAllCategory();
  // }, [handleUpdate()]);


  return (
    <Layout title={"Dsahboard Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Category </h1>
            <div className="p-3 w-50 mb-5">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((elem) => (
                  
                      <tr  key={elem._id}>
                        <td>{elem.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisiable(true);
                              setUpdatedName(elem.name);
                              setSelected(elem)
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(elem._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    
                  ))}
                </tbody>
              </table>
            </div>

            <Modal
              open={visiable}
              footer={null}
              onCancel={() => setVisiable(false)}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
