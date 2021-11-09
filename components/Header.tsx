import React, { useState, useEffect } from "react";
import Link from "next/link";
import LoginModal from "./LoginModal";
import Cart from "./Cart";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getUser, logout } from "../redux/userReducer";
import ConfirmationModal from "./ConfirmationModal";
import Menu from "./Header/Menu";
import { getCategories } from "../data/header";
import { useRouter } from "next/router";

export default function Header() {
  const [categories, setCategories] = useState(undefined);
  const [modal, setModal] = useState(false);
  const [cart, setCart] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [menu, setMenu] = useState(false);
  const [subCategories, setSubCategories] = useState(undefined);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [query, setQuery] = useState("");
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(0);
  const router = useRouter();
  const logOut = () => {
    dispatch(logout());
    setLogoutModal(false);
  };

  const openMenu = (subs, img1, img2) => {
    setMenu(true);
    setSubCategories(subs);
    setImage1(img1);
    setImage2(img2);
  };
  const getcategories = async () => {
    setCategories(await getCategories());
  };
  useEffect(() => {
    getcategories();
  }, []);

  const search = (event) => {
    event.preventDefault();
    if (query.length < 3) {
      return;
    }
    setQuery("");
    router.push("/search?query=" + query);
  };
  return (
    <header>
      <div className="header">
        <div className="left">
          <div className="logo">
            <Link href={"/"}>
              <a className="link">Logo</a>
            </Link>
          </div>
          <nav>
            <ul>
              {categories !== undefined
                ? categories.map((c) => (
                    <li
                      key={c.category.categoryId}
                      onMouseOver={() =>
                        openMenu(
                          c.subCategories,
                          c.category.categoryImage1,
                          c.category.categoryImage2
                        )
                      }
                      onMouseOut={() => setMenu(false)}
                    >
                      <Link href={"/" + c.category.categoryId}>
                        <a className="link">{c.category.categoryName}</a>
                      </Link>
                    </li>
                  ))
                : null}
            </ul>
          </nav>
        </div>
        <div className="right">
          <div className="search-bar">
            <form onSubmit={(e) => search(e)}>
              <i className="fas fa-search" onClick={(e) => search(e)}></i>
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </div>
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
                className="fas fa-shopping-bag"
                title="My Cart"
                onClick={() => setCart(true)}
              >
                {amount !== 0 ? <span className="badge">{amount}</span> : null}
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
              <ConfirmationModal
                show={logoutModal}
                onHide={() => setLogoutModal(false)}
                title="Logout ?"
                f={logOut}
              />
            </div>
          )}
        </div>
        <LoginModal show={modal} onHide={() => setModal(false)} />
        <Cart
          show={cart}
          onHide={() => setCart(false)}
          user={user}
          setAmount={setAmount}
        ></Cart>
        <Menu
          isOpen={menu}
          subCategories={subCategories}
          catImage1={image1}
          catImage2={image2}
        />
      </div>
    </header>
  );
}
