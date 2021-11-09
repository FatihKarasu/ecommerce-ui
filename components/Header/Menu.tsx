import React, { useEffect, useState } from "react";
import Link from "next/link";
export default function Menu({ isOpen, subCategories,catImage1,catImage2 }) {
  const [images, setImages] = useState({image1:"",image2:""})
 
  useEffect(() => {
    setImages({image1:catImage1,image2:catImage2})
  }, [catImage1])
  return (
    <div className={isOpen ? "menu active" : "menu"}>
      <div className="layout">
        <ul>
          {subCategories !== undefined
            ? subCategories.map((sub) => (
                <li key={sub.subCategoryId}>
                  <Link href={"/" + sub.subCategoryId} >
                    <a className="sub-link" onMouseOver={()=>setImages({image1:sub.subCategoryImage1,image2:sub.subCategoryImage2})}>
                      {sub.subCategoryName[0].toUpperCase() +
                        sub.subCategoryName.substring(1)}
                    </a>
                  </Link>
                </li>
              ))
            : null}
        </ul>
        
        <img src={images.image1} className="menu-image"></img>
        <img src={images.image2} className="menu-image"></img>
      </div>
    </div>
  );
}
