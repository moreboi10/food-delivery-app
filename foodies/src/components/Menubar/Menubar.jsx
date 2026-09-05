// import React from 'react'
import "../../assets/assets";
import "./Menubar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";

const Menubar = () => {
  //my impl
  //  const cartItems = foodList.filter(food => quantities[food.id] > 0);
  const navigate = useNavigate();
  const { quantities, token, setToken, setQuantities } = useContext(StoreContext);
  const uniqueItems = Object.values(quantities).filter((qty) => qty > 0).length;
  const [active, setActive] = useState("home");

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setQuantities({});
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link to={`/`}>
          <img
            src={assets.logo}
            className="mx-4"
            alt=""
            height={48}
            width={48}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 cursor-pointer">
            <li className="nav-item">
              <Link
                className={
                  active == "home" ? "nav-link fw-bold active" : "nav-link"
                }
                to="/"
                onClick={() => setActive("home")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  active == "explore" ? "nav-link fw-bold active" : "nav-link "
                }
                to="/explore"
                onClick={() => setActive("explore")}
              >
                Explore
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={
                  active == "contact-us"
                    ? "nav-link fw-bold active"
                    : "nav-link "
                }
                to="/contact"
                onClick={() => setActive("contact-us")}
              >
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-3">
            <Link to={"/cart"}>
              <div className="position-relative">
                <img
                  src={assets.cart}
                  alt=""
                  height={28}
                  width={28}
                  className="position-relative"
                />
                <span className="position-absoulte top-0 start-100 translate-middle badge rounded-pill bg-warning">
                  {uniqueItems}
                </span>
              </div>
            </Link>
            {!token ? (
              <>
                <button
                  className="btn btn-sm btn-outline-primary cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-sm btn-outline-success cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            ) : (
              <div className="dropdown text-end">
                <a
                  href="#"
                  className="d-block  link-body-emphasis text-decoration-none cursor-pointer dropdown-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                <img src={assets.userIcon} width={32} height={32} alt="usericon" />
                </a>
                <ul className="dropdown-menu text-small ">
                  <li
                    className="dropdown-item "
                    onClick={() => {
                      navigate("/myorders");
                    }}
                  >
                    Orders
                  </li>
                  <li className="dropdown-item" onClick={logout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
