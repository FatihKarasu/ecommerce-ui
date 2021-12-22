import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import NotificationContainer from "../components/NotificationContainer";

export default function Layout({ children, categories, subCategories }) {
  return (
    <>
      <NotificationContainer />
      <Header />
      <div className="">
        <main className="">{children}</main>
      </div>
      <Footer />
    </>
  );
}
