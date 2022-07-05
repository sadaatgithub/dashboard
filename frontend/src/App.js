import { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/account/Login";
import Signin from "./components/account/Signin";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import axios from "./api/Axios";
import axiosInstance from "./api/Axios";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header/Header";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MyPwh from "./components/pwhData/MyPwh";
import EditPwh from "./components/pwhData/EditPwh";
import AddNewPwh from "./components/pwhData/AddNewPwh";
import ChangePassword from "./components/account/ChangePassword";
// import MultiForm from "./components/pwhData/forms/MultiForm";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import SearchDiv from "./components/pwhData/search/SearchDiv";
import DownLoadData from "./components/pwhData/DownLoadData";

function App() {
 const {user} = useSelector((state) => state.auth)
  return (
    <>
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<ProtectedRoute user={user}>
              <Dashboard  />
          </ProtectedRoute>}/>
          <Route path="/login" element={<Signin />}/>
          <Route path="/pwh-data" element={<ProtectedRoute user={user}>
              <MyPwh  />
          </ProtectedRoute>}/>
          <Route path="/edit/" element={<ProtectedRoute user={user}>
              <AddNewPwh  />
          </ProtectedRoute>}/>
          <Route path="/add" element={<ProtectedRoute user={user}>
              <AddNewPwh  />
          </ProtectedRoute>}/>
          <Route path="/change_password" element={
          <ProtectedRoute user={user}>
              <ChangePassword  />
          </ProtectedRoute>}
          />
          <Route path="/search" element={<ProtectedRoute user={user}>
  
          <SearchDiv /></ProtectedRoute>}/>
          <Route path="/download-data" element={<ProtectedRoute user={user}>
  
          <DownLoadData /></ProtectedRoute>}/>
          <Route path="*" element={<NotFound />} />

          
        </Routes>
      </div>
    </Router>
    <ToastContainer/>
    
     
    </>
  );
}

export default App;
