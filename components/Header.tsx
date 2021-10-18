import React, { useState, useEffect } from "react";
import Link from "next/link";
import LoginModal from "./LoginModal";
import Cart from "./Cart";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getUser, logout } from "../redux/userReducer";
import ConfirmationModal from "./ConfirmationModal";

export default function Header({}) {
  const [modal, setModal] = useState(false);
  const [cart, setCart] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false)
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(0)
  const logOut=()=>{
    dispatch(logout())
    setLogoutModal(false)
  }
  return (
    <header className="p-3 text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>

            <li>
              <Link href="#">About</Link>
            </li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control form-control-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="text-end">
            {user.id === "" ? (
              <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={() => setModal(true)}
              >
                Login
              </button>
            ) : (
              <div className="header-icons">
                <i
                  className="fas fa-shopping-cart"
                  title="My Cart"
                  onClick={() => setCart(true)}
                >{amount!==0?<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {amount}
              </span>:null}
            </i>
                <div className="user-icon">
                  <div className="user-dropdown">
                    <Link href="/profile">
                      <div>My Profile</div>
                    </Link>
                    <div onClick={() => setLogoutModal(true)}>Log Out</div>
                  </div>
                  <i className="fas fa-user " title="My Profile"></i>
                </div>
                <ConfirmationModal show={logoutModal} onHide={()=>setLogoutModal(false)} title="Logout ?" f={logOut}/>

              </div>
            )}
            <LoginModal show={modal} onHide={() => setModal(false)}  />
            <Cart show={cart} onHide={() => setCart(false)} user={user} setAmount={setAmount}></Cart>
          </div>
        </div>
      </div>
    </header>
  );
}
