import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { DropdownButton, Button } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import Filter from "../../components/Products/Filter";
import axios from "axios";
import SelectedFilter from "../../components/Products/SelectedFilter"
const APIBase = "http://localhost:5000";

let start = 0;
let end = 12;
let fetched = [];
let lastPosition = 0;

const initialItems = [
  { id: "newest", title: "Newest", selected: false },
  { id: "oldest", title: "Oldest", selected: false },
  { id: "lowest", title: "Price (Low to High)", selected: false },
  { id: "highest", title: "Price (High to Low)", selected: false },
];
const prices = [
  {
    title: "0 TL - 50 TL",
    min: 0,
    max: 50,
  },
  {
    title: "50 TL - 100 TL",
    min: 50,
    max: 100,
  },
  {
    title: "100 TL - 150 TL",
    min: 100,
    max: 150,
  },
  {
    title: "150 TL - 200 TL",
    min: 150,
    max: 200,
  },
  {
    title: "200 TL - 250 TL",
    min: 200,
    max: 250,
  },
  {
    title: "250 TL - 300 TL",
    min: 250,
    max: 300,
  },
  {
    title: "300 TL - 350 TL",
    min: 300,
    max: 350,
  },
  {
    title: "350 TL - 400 TL",
    min: 350,
    max: 400,
  },
  {
    title: "400 TL and above",
    min: 400,
    max: 10000,
  },
];

const initialFilterValues = {
  min: null,
  max: null,
  colors: [],
  sizes: [],
};
export default function index({ products, _filters }) {
  const [p, setProducts] = useState(products);
  const [orderBy, setOrderBy] = useState("newest");
  const [dropdownItems, setDropdownItems] = useState(initialItems);
  const [selected, setSelected] = useState("");
  const [filters, setFilters] = useState(_filters);
  const [filterValues, setFilterValues] = useState({
    min: null,
    max: null,
    colors: [],
    sizes: [],
  });
  const router = useRouter();
  useEffect(() => {
    if (fetched.length !== 0) {
      setProducts([...fetched]);
    }
  }, []);

  useEffect(() => {
    if (p.length > products.length) {
      window.scrollTo(0, lastPosition);
    }
  }, [p]);

  const clickHandler = (id) => {
    lastPosition = window.scrollY;
    router.push(`/products/${id}`);
  };

  const loadMore = async () => {
    lastPosition = window.scrollY;
    start += 12;
    end += 12;
    const req = await fetch(getUrl());
    const data = await req.json();
    if (data.length === 0) {
      return;
    }
    fetched = [...p, ...data];
    setProducts([...p, ...data]);
  };
  const fetchProducts = async () => {
    fetched = [];
    start = 0;
    end = 12;
    const response = await axios.get(getUrl());
    setProducts(response.data);
  };
  useEffect(() => {
    let temp = dropdownItems;
    temp.forEach((element) => {
      element.selected = false;
      if (element.id === orderBy) {
        element.selected = true;
        setSelected(element.title);
      }
    });
    setDropdownItems(temp);
    fetchProducts();
  }, [orderBy, filterValues]);

  const handleSelect = (type, value) => {
    let temp = { ...filterValues };
    if (type == "color") {
      if (temp.colors.includes(value)) {
        temp.colors = temp.colors.filter((id) => id !== value);
      } else {
        temp.colors.push(value);
      }
    } else if (type == "size") {
      if (temp.sizes.includes(value)) {
        temp.sizes = temp.sizes.filter((id) => id !== value);
      } else {
        temp.sizes.push(value);
      }
    } else {
      if (temp.min == type) {
        temp.min = null;
        temp.max = null;
      } else {
        temp.min = type;
        temp.max = value;
      }
    }
    setFilterValues(temp);
  };
  const getUrl = () => {
    let URL = `${APIBase}/products?`;
    let colorQuery = "";
    let sizeQuery = "";
    let min = "";
    let max = "";

    filterValues.colors.forEach((color) => {
      colorQuery += `color=${color}&`;
    });

    filterValues.sizes.forEach((size) => {
      sizeQuery += `size=${size}&`;
    });

    if (filterValues.min !== null) {
      min = `min=${filterValues.min}&`;
    }
    if (filterValues.max !== null) {
      max = `max=${filterValues.max}&`;
    }
    URL =
      `${APIBase}/products?start=${start}&end=${end}&orderBy=${orderBy}&` +
      colorQuery +
      sizeQuery +
      min +
      max;
    return URL;
  };
  const getFilterValues=(type,id)=>{
    let fV;
    if(type==="size")
    {
      filters.sizes.forEach(element => {
        if(element.sizeId===id)
        {
         fV= element;
        }
      });
    }
    if(type==="color")
    {
      filters.colors.forEach(element => {
        if(element.colorId===id)
        {
         fV= element;
        }
      });
    }
     return fV
  }
  return (
    <>
      <Head>
        <title>Products</title>
        <meta name="keyword" content="E commerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Products
            </li>
          </ol>
        </nav>
        <div className="d-flex">
          <div className="filter-container">
            <div className="filter">
              <h5>Colors</h5>
              <div className="colors">
                {filters.colors.map((color) => (
                  <Filter
                    key={color.colorId}
                    isChecked={filterValues.colors.includes(color.colorId)}
                    color={color}
                    handleSelect={handleSelect}
                  />
                ))}
              </div>
            </div>
            <div className="filter">
              <h5>Sizes</h5>
              <div className="colors">
                {filters.sizes.map((size) => (
                  <div
                    className={
                      filterValues.sizes.includes(size.sizeId)
                        ? "item selected"
                        : "item "
                    }
                    key={size.sizeId}
                    onClick={() => handleSelect("size", size.sizeId)}
                  >
                    {size.sizeName.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
            <div className="filter">
              <h5>Price</h5>
              <div className="prices">
                {prices.map((price) => (
                  <div
                    className={
                      filterValues.min === price.min ? "item selected" : "item "
                    }
                    key={price.min}
                    onClick={() => handleSelect(price.min, price.max)}
                  >
                    {price.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-100">
            <div className="products-header">
              <div className="selected-filters">
                {filterValues.sizes.map((id)=>(<SelectedFilter key={`size${id}`} type="size" id={id} getValues={getFilterValues} handleSelect={handleSelect}/>))}
                {filterValues.colors.map((id)=>(<SelectedFilter key={`color${id}`} type="color" id={id} getValues={getFilterValues} handleSelect={handleSelect}/>))}
              </div>
              <div>
                <DropdownButton id="dropdown-basic-button" title={selected}>
                  {dropdownItems.map((item) => (
                    <div
                      key={item.id}
                      className={
                        item.selected
                          ? "dropdown-button selected"
                          : "dropdown-button"
                      }
                      onClick={() => setOrderBy(item.id)}
                    >
                      {item.title}
                    </div>
                  ))}
                </DropdownButton>
              </div>
            </div>
            <div className="products-container">
              {p
                ? p.map((p) => (
                    <ProductCard
                      key={p.product.productId}
                      product={p.product}
                      colors={p.colors}
                      sizes={p.sizes}
                      clickHandler={clickHandler}
                    />
                  ))
                : null}
            </div>
            <div className="d-flex justify-content-center">
            <Button type="button"  onClick={() => loadMore()} >Load More</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const reqProducts = await fetch(
    `http://localhost:5000/products?start=0&end=12&orderBy=newest`
  );
  const products = await reqProducts.json();
  const reqFilters = await fetch(`http://localhost:5000/filter`);
  const filters = await reqFilters.json();
  return {
    props: { products: products, _filters: filters },
  };
}
