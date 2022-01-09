import Link from "next/link";
import Head from "next/head";
import ReviewModal from "../../components/Profile/ReviewModal"
import { useDispatch } from "react-redux";
import { Button, Tabs, Tab } from "react-bootstrap";
import SlickCarousel from "../../components/SlickCarousel/SlickCarousel";
import Carousel from "../../components/Product/Carousel/Carousel";
import Rating from "../../components/Rating";
import { addToCart } from "../../redux/cartReducer";
import { useSelector } from "react-redux";
import { getUser, logout } from "../../redux/userReducer";
import { useState, useEffect } from "react";
import { getProductById, getProducts } from "../../data/products";
import { addtocart } from "../../data/cart";
import { addNotification } from "../../redux/notificationReducer";
import Reviews from "../../components/Product/Reviews";
let func;
let check = false;
const images = ["../Images/1.jpg", "../Images/2.jpg", "../Images/3.jpg"];

export default function product({ data, category }) {
  const { product, colors, sizes, rating, reviewCount } = { ...data };
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [similarProducts, setSimilarProducts] = useState(null);
  const [key, setKey] = useState("detail");
  const [reviews, setReviews] = useState();
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [fetch, setFetch] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    setSelectedColor("");
    setSelectedSize("");
    setReviews();
    setKey("detail");
    check = false;
  }, [data]);

  const addCart = async () => {
   
      await addtocart(
        user,
        product.productId,
        selectedColor,
        selectedSize,
        1,
        dispatch,
        logout,
        addNotification,
        addToCart
      )
    
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

  const handleTabs = async (k) => {
    if (k === "reviews") {
      if (reviews === undefined) {
        setFetch(true);
      }
      if (k !== key) {
        window.scrollTo({
          top:
            document.getElementById("tabs").offsetTop -
            document.getElementById("header").offsetHeight,
          left: 0,
          behavior: "smooth",
        });
      }
    }
    setKey(k);
  };

  const lazyLoadProducts = async () => {
    if (
      window.scrollY + window.outerHeight >=
        document.getElementById("carousel").offsetTop &&
      !check
    ) {
      check = true;
      setSimilarProducts(
        await getProducts(
          `?categoryId=${product.subCategoryId}&start=0&end=16&orderBy=newest&`
        )
      );
    }
  };

  useEffect(() => {
    if (process.browser) {
      func = lazyLoadProducts;
      window.addEventListener("scroll", lazyLoadProducts);
      check = false;
    }
    return () => {
      window.removeEventListener("scroll", func);
    };
  }, [process.browser]);
  useEffect(() => {
    if (process.browser) {
      if (similarProducts !== null) {
        window.removeEventListener("scroll", func);
      }
    }
  }, [similarProducts]);
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
          <div className="left">
            <Carousel items={images} />

            <div id="tabs" className="tabs mt-5">
              <Tabs
                id="tab"
                activeKey={key}
                onSelect={(k) => handleTabs(k)}
                className="mb-3"
              >
                <Tab eventKey="detail" title="Product Details">
                  {product.productDetail}
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                  {fetch === true && reviewCount !== 0 ? (
                    <Reviews
                      productId={product.productId}
                      setShow={setShowReviewModal}
                      show={showReviewModal}
                    />
                  ) : null}
                </Tab>
                <Tab eventKey="contact" title="Placeholder" disabled></Tab>
              </Tabs>
            </div>
          </div>

          <div className="product-data right">
            <div>
              <div className="title">{product.productTitle}</div>
              <Rating
                value={
                  rating === null ? 0 : parseFloat(rating.replace(",", "."))
                }
              />
              <small
                onClick={() => {
                  handleTabs("reviews");
                }}
              >{`${reviewCount} reviews`}</small>
            </div>

            {product.productOldPrice ? (
              <div>
                <div className="d-flex align-items-end ">
                  <div className="previous-price">
                    {product.productOldPrice} TL
                  </div>
                  <div className="price">{product.productPrice} TL</div>
                </div>
                <div className="d-flex align-items-end mt-1">
                  <div className="discount-rate">
                    %
                    {Math.ceil(
                      100 -
                        (product.productPrice * 100) / product.productOldPrice
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
        <div>
          <SlickCarousel items={similarProducts} />
        </div>
      </div>
      <ReviewModal show={showReviewModal} onHide={()=>setShowReviewModal(false)} product={product} user={user}/>
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
