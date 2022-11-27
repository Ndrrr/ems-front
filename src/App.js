import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Component } from "react";
import { Home, Login, Navbar, Register } from "./components";


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Navbar/>
          <div className={"App-header"}>
          <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
