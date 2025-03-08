import React, { useState } from 'react'

const AddProduct = () => {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [location,setLocation] = useState('');
    const [guest,setGuest] = useState('');
    const [error,setError] = useState(false);

    const addProduct = async () => {


        if(!name || !price || !category || !location || !guest){
            setError(true);
            return false;
        }


        // console.log(name,price,category,location,guest)
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        // console.log(userId)
        let result =await fetch("http://localhost:5000/add-event",{
            method:"POST",
            body:JSON.stringify({name, price, category, location, guest, userId}),
            headers:{
                "Content-Type":"application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        // console.log(result);
        if(result){
            alert("Product Added Successfully");
            setName('');
            setPrice('');
            setCategory('');
            setLocation('');
            setGuest('');
            setError(false);
        }
    }
    
    return (
        <div className='addproduct-container'>
            <h1>Add Product</h1>
            <input type='text' onChange={(e)=>{setName(e.target.value)}} value={name} placeholder='Enter product name' /> 
            {error && !name && <span className='invalid-input'>Enter valid name</span>}
            <input type='text' onChange={(e)=>{setPrice(e.target.value)}} value={price} placeholder='Enter product price' />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}
            <input type='text' onChange={(e)=>{setCategory(e.target.value)}} value={category} placeholder='Enter product category' />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}
            <input type='text' onChange={(e)=>{setGuest(e.target.value)}} value={guest} placeholder='Enter guest name(> 1 seperate with comma(,))' />
            {error && !guest && <span className='invalid-input'>Enter valid guest</span>}
            <input type='text' onChange={(e)=>{setLocation(e.target.value)}} value={location} placeholder='Enter event location' />
            {error && !location && <span className='invalid-input'>Enter valid location</span>}
            <button onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;