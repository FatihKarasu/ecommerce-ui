import Link from "next/link";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { Carousel, Button } from "react-bootstrap";
import { addToCart } from "../../redux/cartReducer";
import { useSelector } from "react-redux";
import { getUser, logout } from "../../redux/userReducer";
import { useState, useEffect } from "react";
import { getProductById } from "../../data/products";
import { addtocart } from "../../data/cart";
export default function product({ data, category }) {
  const { product, colors, sizes } = { ...data };
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    setSelectedColor("");
    setSelectedSize("");
  }, [data]);
  const addCart = async () => {
    if (user.id === "") {
      console.log("Please Login.");
      return;
    }
    const formData = new FormData();
    formData.append("UserId", user.id);
    formData.append("ProductId", product.productId);
    formData.append("ColorId", selectedColor);
    formData.append("SizeId", selectedSize);
    formData.append("Amount", 1);
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    try {
      dispatch(addToCart(await addtocart(formData, config)));
    } catch (error) {
      if (error.response.status == 401) {
        dispatch(logout());
      }
    }
  };

  const handleSelect = (type, id) => {
    if (type === "color") {
      if (selectedColor === id) {
        setSelectedColor("");
      } else {
        setSelectedColor(id);
      }
    }
    if (type === "size") {
      if (selectedSize === id) {
        setSelectedSize("");
      } else {
        setSelectedSize(id);
      }
    }
  };
  const getTitle = (title) => {
    title = (title[0].toUpperCase() + title.substring(1)).replace(/-/g, " ");
    for (let index = 0; index < title.length; index++) {
      if (title[index] === " ") {
        title =
          title.substr(0, index + 1) +
          title[index + 1].toUpperCase() +
          title.substr(index + 2, title.length);
      }
    }
    return title;
  };
  return (
    <>
      <Head>
        <title>{product.productTitle}</title>
        <meta name="keyword" content="E commerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container product-container">
        <div className="breadcrumb">
          <nav aria-label="breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href={"/" + category}>{getTitle(category)}</Link>
              </li>
              <li>/</li>
              <li className="active" aria-current="page">
                {product.productTitle}
              </li>
            </ol>
          </nav>
        </div>
        <div className="product-content">
          <div className="product-images">
            <img className="" src={product.productImage} alt="First slide" />
            <img className="" src={product.productImage} alt="First slide" />
            <img className="" src={product.productImage} alt="First slide" />
            <img className="" src={product.productImage} alt="First slide" />
          </div>

          <div className="product-data">
            <div className="title">{product.productTitle}</div>

            {product.productSalePrice ? (
              <div>
                <div className="d-flex align-items-end ">
                  <div className="previous-price">
                    {product.productPrice} TL
                  </div>
                  <div className="price">{product.productSalePrice} TL</div>
                </div>
                <div className="d-flex align-items-end mt-1">
                  <div className="discount-rate">
                    %
                    {Math.ceil(
                      100 -
                        (product.productSalePrice * 100) / product.productPrice
                    )}
                  </div>
                  <small>Discount</small>
                </div>
              </div>
            ) : (
              <div className="price">{product.productPrice} TL</div>
            )}
            <div>
              <h6>Colors</h6>

              <div className="items">
                {colors.map((color) => (
                  <i
                    className={
                      selectedColor === color.colorId
                        ? "fas fa-check-circle"
                        : "fas fa-circle"
                    }
                    key={color.colorId}
                    style={{ color: color.colorValue }}
                    title={color.colorName}
                    onClick={() => handleSelect("color", color.colorId)}
                  ></i>
                ))}
              </div>
            </div>
            <div>
              <h6>Sizes</h6>
              <div className="items">
                {sizes.map((size) => (
                  <div
                    key={size.sizeId}
                    className={
                      selectedSize === size.sizeId ? "size selected" : "size"
                    }
                    onClick={() => handleSelect("size", size.sizeId)}
                  >
                    {size.sizeName.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
            <Button
              variant="primary"
              type="button"
              onClick={() => addCart()}
              disabled={
                selectedSize === "" || selectedColor === "" || user.id === ""
              }
            >
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
  const data = await getProductById(params.id);
  if (data.productId === null) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return {
    props: { data: data, category: params.category },
  };
}
