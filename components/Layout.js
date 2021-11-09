import React from 'react'
import Header from './Header'
export default function Layout({children,categories,subCategories}) {
    return (
        <>
        <Header />
          <div className="">
            <main className="">{children}</main>
          </div>
        </>
      );
}
