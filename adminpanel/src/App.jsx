import AddFood from "./pages/AddFood/AddFood";
import ListFood from "./pages/ListFood/ListFood";
import Orders from "./pages/Orders/Orders";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Menubar from "./components/Menubar/Menubar";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <Sidebar sidebarVisible={sidebarVisible} />
      {/* Page content wrapper */}
      <div id="page-content-wrapper">
        {/* Top navigation */}
        <Menubar toggleSidebar={toggleSidebar} />
        <ToastContainer/>
        {/* Page content */}
        <div className="container-fluid">
          <Routes>
            <Route path="/add" element={<AddFood />} />
            <Route path="/List" element={<ListFood />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/" element={<ListFood />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
