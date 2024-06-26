import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/adminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { Navigate, useNavigate } from "react-router-dom";

const CreateProdusts = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState();
  const navigate = useNavigate();

  // Get all Category
  const GetAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-all-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in getting categorys");
    }
  };
  useEffect(() => {
    GetAllCategory();
  }, []);

  // ProductCreater
  const ProductCreater = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("discription", discription);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("some thing Went Wrong");
    }
  };
  return (
    <Layout title={"Create-Products Ecommerce-app"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              <Select
                className="form-select mb-3"
                bordered={false}
                placeholder={"Please select the category"}
                size="large"
                showSearch
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Please Select Picture"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      className="img img-responsive"
                      src={URL.createObjectURL(photo)}
                      alt={`Preview image `}
                      height={"200px"}
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Please Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Please Enter Discription"
                  value={discription}
                  onChange={(e) => setDiscription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Please Enter Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Please Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  className="form-select mb-3"
                  bordered={false}
                  placeholder={"Please select the Shipping"}
                  size="large"
                  showSearch
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">NO</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary col-md-12"
                  onClick={ProductCreater}
                >
                  Create Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProdusts;
