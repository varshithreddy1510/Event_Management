import './App.css'
import Nav from "./components/Navbar";
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/Profile'
import EventsList from './components/EventsList'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          
          <Route element={<PrivateComponent />}>
            <Route path="/Events" element={<EventsList />} />
          
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/signup" element={<SignUp />}/>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
