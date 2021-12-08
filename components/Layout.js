import React from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function Layout({ children, categories, subCategories }) {
  return (
    <>
      <Header />
      <div className="">
        <main className="">{children}</main>
      </div>
      <Footer />
    </>
  );
}
