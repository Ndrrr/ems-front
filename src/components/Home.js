import {useEffect} from "react";

export const Home = () => {
    useEffect(() => {
      if(localStorage.getItem('reload') === "true") {
          localStorage.removeItem('reload');
          window.location.reload();
      }
    })
  return (
      <div className="container App-header">
        <h1 className="h3 mb-3 font-weight-normal text-center">Welcome to the Exam Management System</h1>
      </div>
  )
}