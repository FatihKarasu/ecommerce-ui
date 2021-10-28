import Link from "next/link";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { Carousel, Button } from "react-bootstrap";
import { addToCart } from "../../redux/cartReducer";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import { useState } from "react";
import Filter from "../../components//Products/Filter"
const APIBase = "http://localhost:5000";

export default function product({ data }) {
  const { product, colors, sizes } = { ...data };
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  console.log(product);
  const addCart = async () => {
    if (user.id === "") {
      console.log("Please Login.");
      return;
    }
    const formData = new FormData();
    formData.append("UserId", user.id);
    formData.append("ProductId", product.productId);
    formData.append("ColorId", selectedColor);
    formData.append("SizeId",selectedSize);
    formData.append("Amount", 1);
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    try {
      const response = await axios.post(
        `${APIBase}/cart/add`,
        formData,
        config
      );
      dispatch(addToCart(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect=(type,id)=>{
    if(type==="color")
    {
      if(selectedColor===id)
      {
        setSelectedColor("")
      }
      else
      {
        setSelectedColor(id)
      }
    }
    if(type==="size")
    {
      if(selectedSize===id)
      {
        setSelectedSize("")
      }
      else
      {
        setSelectedSize(id)
      }
    }
  }
  return (
    <>
      <Head>
        <title>{product.productTitle}</title>
        <meta name="keyword" content="E commerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container product-container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item ">
              <Link href="/products">Products</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.productTitle}
            </li>
          </ol>
        </nav>
        <div className="product-content">
          <div className="product-images">
            <img className="" src={product.productImage} alt="First slide" />
            <img className="" src={product.productImage} alt="First slide" />
            <img className="" src={product.productImage} alt="First slide" />
            <img className="" src={product.productImage} alt="First slide" />
          </div>

          <div className="product-data">
            <div className="title">{product.productTitle}</div>

            <div className="price">{product.productPrice} TL</div>
            <div>
              <h6>Colors</h6>

              <div className="items">
                {colors.map((color) => (
                  <i
                    className={selectedColor===color.colorId?"fas fa-check-circle":"fas fa-circle"}
                    key={color.colorId}
                    style={{ color: color.colorValue }}
                    title={color.colorName}
                    onClick={()=>handleSelect("color",color.colorId)}
                  ></i>
                ))}
              </div>
            </div>
            <div>
              <h6>Sizes</h6>
              <div className="items">
                {sizes.map((size) => (
                  <div key={size.sizeId} className={selectedSize===size.sizeId?"size selected":"size"} onClick={()=>handleSelect("size",size.sizeId)} >
                    {size.sizeName.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
            <Button variant="primary" type="button" onClick={() => addCart()} disabled={selectedSize==="" || selectedColor==="" || user.id===""}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
//
export async function getServerSideProps({ params }) {
  const req = await fetch(`http://localhost:5000/products/${params.id}`);

  const data = await req.json();
  if (data.productId === null) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return {
    props: { data: data },
  };
}
