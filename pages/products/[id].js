import Link from "next/link";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { Carousel,Button } from "react-bootstrap";
import { addToCart } from "../../redux/cartReducer";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
const APIBase = "http://localhost:5000";

export default function product({ product }) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const addCart = async () => {
    if (user.id === "") {
      console.log("Please Login.");
      return;
    }
    const formData = new FormData();
    formData.append("UserId", user.id);
    formData.append("ProductId", product.productId);
    formData.append("Amount", 1);
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    try {
      const response = await axios.post(`${APIBase}/cart/add`, formData, config);
      dispatch(addToCart(response.data));
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      <Head>
        <title>{product.productTitle}</title>
        <meta name="keyword" content="E commerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <div className="products-header">
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
        </div>
        <div className="product-content">
          <div className="slider">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={product.productImage}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={product.productImage}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={product.productImage}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>

          <div className="product-data">
            <h4>{product.productTitle}</h4>
            <p>{product.productDetail}</p>
            <h1>{product.productPrice} ₺</h1>
            <Button
              variant="primary"
              type="button"
              onClick={() => addCart()}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

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
    props: { product: data },
  };
}
