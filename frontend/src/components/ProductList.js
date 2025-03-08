import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products",{
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProducts(result);
  };
//   console.log("products   ", products);

  const deleteProduct = async (id)=>{
    // console.log(id)
    let result = await fetch(`http://localhost:5000/product/${id}`,{
      method:"Delete",
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json()
    if(result)
    {
      alert("Record is Deleted")
      getProducts();
    }
  }

  const searchHandle = async (event)=>{
    let key = event.target.value;
    if(key){
      let result = await fetch(`http://localhost:5000/search/${key}`,{
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      if(result){
        setProducts(result)
      }
    }else{
      getProducts();
    }
  }


  return (
    <div className="product-list">
        <h1>Product List</h1>
        <input type="text" placeholder="Search Product" onChange={searchHandle} />
        <table>
            <thead>
                <tr>
                    <th>S no.</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Guest</th>
                    <th>Location</th>
                    <th>Operation</th>
                </tr>
            </thead>
            <tbody>
                {
                  products.length>0 ? products.map((item, index) => {
                      return (
                          <tr key={index}>
                              <td>{index+1}</td>
                              <td>{item.name}</td>
                              <td>₹{item.price} /person</td>
                              <td>{item.category}</td>
                              <td>{item.guest}</td>
                              <td>{item.location}</td>
                              <td>
                                <button onClick={()=>{deleteProduct(item._id)}}>Delete</button>
                                <Link to={"/update/"+item._id} className="update-button">Update</Link>
                              </td>
                          </tr>
                      );
                  }) : <h1 key={`${1}+1`}>No product found</h1>
                }
            </tbody>
        </table>
    </div>
  );
};

export default ProductList;
