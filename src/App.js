import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Component } from "react";
import { Home, Login, Navbar, Register } from "./components";
import { Quiz } from "./components/Quiz";
import { Course } from "./components/Course";


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Navbar/>
          <div >
          <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/quiz" element={<Quiz/>} />
            <Route path="/course" element={<Course/>} />
          </Routes>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
