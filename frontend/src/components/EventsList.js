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

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="event-list">
      <h1>Product List</h1>
      <input type="text" placeholder="Search Product" onChange={searchHandle} />
      <div className="event-grid">
        {products.length > 0 ? (
          products.map((item, index) => (
            <div className="event-card" key={index}>
              <h3>{item.name}</h3>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Guest:</strong> {item.guest}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Price:</strong> <span>₹{item.price} /person</span></p>
              
              <Link to={`/booking/${item._id}`} className="get-ticket-button">
                Get Ticket
              </Link>
            </div>
          ))
        ) : (
          <h1>No product found</h1>
        )}
      </div>
    </div>
  );
};

export default ProductList;
