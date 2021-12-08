import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { DropdownButton, Button, Spinner } from "react-bootstrap";
import ProductCard from "../../components/Products/ProductCard";
import ProductCardSkeleton from "../../components/Products/ProductCardSkeleton";
import Filter from "../../components/Products/Filter";
import SelectedFilter from "../../components/Products/SelectedFilter";
import { getProducts } from "../../data/products";
import { getFilters, getCategories } from "../../data/filter";
import { getCampaigns } from "../../data/campaign";
let start = 0;
let end = 12;
let fetched = [];
let lastPosition = 0;
let lastURL = "";
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
let skeletonContainer = [];

for (let i = 0; i < 12; i++) {
  skeletonContainer.push(<ProductCardSkeleton key={i} />);
}

export default function index({
  _products,
  _query,
  _filters,
  _filterValues,
  _orderBy,
  _categories,
  _campaign,
}) {
  const router = useRouter();
  const [products, setProducts] = useState(_products);
  const [orderBy, setOrderBy] = useState(_orderBy);
  const [dropdownItems, setDropdownItems] = useState(initialItems);
  const [selected, setSelected] = useState("");
  const [filters, setFilters] = useState(_filters);
  const [filterValues, setFilterValues] = useState({ ..._filterValues });
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (fetched.length !== 0) {
      setProducts([...fetched]);
    }
  }, []);
  useEffect(() => {
    setFilterValues(_filterValues);
    setOrderBy(_orderBy);
  }, [_filterValues]);

  useEffect(() => {
    if (products.length > _products.length) {
      window.scrollTo(0, lastPosition);
    }
  }, [products]);

  const loadMore = async () => {
    lastPosition = window.scrollY;
    start += 12;
    end += 12;
    const data = await getProducts(getQuery());
    if (data.length === 0) {
      return;
    }
    fetched = [...products, ...data];
    setProducts([...products, ...data]);
  };
  const fetchProducts = async () => {
    fetched = [];
    start = 0;
    end = 12;
    setProducts(await getProducts(getQuery()));
    setloading(false);
  };
  useEffect(() => {
    setloading(true);
    let temp = dropdownItems;
    temp.forEach((element) => {
      element.selected = false;
      if (element.id === orderBy) {
        element.selected = true;
        setSelected(element.title);
      }
    });
    setDropdownItems(temp);
    if (lastURL !== getUrl()) {
      lastURL = getUrl();
      router.push(getUrl());
    }
    if (orderBy === _orderBy && filterValues === _filterValues) fetchProducts();
  }, [orderBy, filterValues]);

  const handleSelect = (type, value) => {
    let temp = { ...filterValues };
    if (type == "category") {
      if (temp.categoryId !== value) {
        temp.categoryId = value;
      } else {
        temp.categoryId = null;
      }
    } else if (type == "color") {
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

  const getQuery = () => {
    let query = "";
    if (_query !== null) {
      query = `?query=${_query}&start=${start}&end=${end}&orderBy=${orderBy}&`;
      if (filterValues.categoryId !== null) {
        query = `?query=${_query}&categoryId=${filterValues.categoryId}&start=${start}&end=${end}&orderBy=${orderBy}&`;
      }
    } else if (_campaign !== null) {
      query = `?campaignId=${_campaign}&start=${start}&end=${end}&orderBy=${orderBy}&`;
      if (filterValues.categoryId !== null) {
        query = `?campaignId=${_campaign}&categoryId=${filterValues.categoryId}&start=${start}&end=${end}&orderBy=${orderBy}&`;
      }
    } else {
      query = `?categoryId=${filterValues.categoryId}&start=${start}&end=${end}&orderBy=${orderBy}&`;
    }

    filterValues.colors.forEach((color) => {
      query += `color=${color}&`;
    });

    filterValues.sizes.forEach((size) => {
      query += `size=${size}&`;
    });

    if (filterValues.min !== null) {
      query += `min=${filterValues.min}&`;
    }
    if (filterValues.max !== null) {
      query += `max=${filterValues.max}&`;
    }
    return query;
  };
  const getUrl = () => {
    let URL = "";
    let colorQuery = "";
    let sizeQuery = "";
    let minmax = "";
    let colors = [];
    let sizes = [];
    let filter = "";
    let orderby = "";
    filterValues.colors.forEach((color) => {
      filters.colors.forEach((c) => {
        if (c.colorId === color) {
          colors.push(c.colorName.toLowerCase());
        }
      });
    });
    filterValues.sizes.forEach((size) => {
      filters.sizes.forEach((s) => {
        if (s.sizeId === size) {
          sizes.push(s.sizeName.toLowerCase());
        }
      });
    });
    if (colors.length !== 0) {
      colorQuery = `color:${colors.toString()}`;
    }
    if (sizes.length !== 0) {
      sizeQuery = `size:${sizes.toString()}`;
      if (colors.length !== 0) {
        sizeQuery = `;size:${sizes.toString()}`;
      }
    }

    if (sizeQuery !== "" || colorQuery !== "") {
      filter = `?filter=${colorQuery + sizeQuery}`;
      if (_query !== null || _campaign !== null) {
        filter = `&filter=${colorQuery + sizeQuery}`;
      }
    }
    if (orderBy !== "newest") {
      orderby = `?orderBy=${orderBy}`;
      if (filter !== "" || _query !== null || _campaign !== null) {
        orderby = `&orderBy=${orderBy}`;
      }
    }
    if (filterValues.min !== null && filterValues.max !== null) {
      minmax = `?min=${filterValues.min}&max=${filterValues.max}`;
      if (
        filter !== "" ||
        orderby !== "" ||
        _query !== null ||
        _campaign !== null
      ) {
        minmax = `&min=${filterValues.min}&max=${filterValues.max}`;
      }
    }
    if (_query !== null) {
      URL = `/search?query=${_query + filter + orderby + minmax}`;
      if (filterValues.categoryId !== null) {
        URL = `/search?query=${_query}&categoryId=${
          filterValues.categoryId + filter + orderby + minmax
        }`;
      }
    } else if (_campaign !== null) {
      URL = `/${_campaign + filter + orderby + minmax}`;
      if (filterValues.categoryId !== null) {
        URL = `/${_campaign}?categoryId=${
          filterValues.categoryId + filter + orderby + minmax
        }`;
      }
    } else URL = `/${filterValues.categoryId + filter + orderby + minmax}`;
    return URL;
  };

  const getFilterValues = (type, id) => {
    let fV;
    if (type === "size") {
      filters.sizes.forEach((element) => {
        if (element.sizeId === id) {
          fV = element;
        }
      });
    }
    if (type === "color") {
      filters.colors.forEach((element) => {
        if (element.colorId === id) {
          fV = element;
        }
      });
    }
    return fV;
  };

  const getTitle = () => {
    let title = filterValues.categoryId;

    if (_query !== null) {
      title = _query;
    }
    if (_campaign !== null) {
      title = _campaign;
    }
    if (title === null) {
      title = "title";
    }
    title = (title[0].toUpperCase() + title.substring(1)).replace(/-/g, " ");

    for (let index = 0; index < title.length; index++) {
      if (title[index] === " ") {
        //title = title.replace(title[index + 1], title[index + 1].toUpperCase());
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
        <title>{getTitle()}</title>
        <meta name="keyword" content="E commerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <div className="breadcrumb">
          <nav aria-label="breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              {_query !== null ? (
                <>
                  <li>/</li>
                  <li>Search</li>
                </>
              ) : null}
              <li>/</li>
              <li aria-current="page" className="active">
                {getTitle()}
              </li>
            </ol>
          </nav>
        </div>
        <div className="d-flex">
          <div className="filter-container">
            {_categories !== null ? (
              <div className="filter">
                <h5>Categories</h5>
                <div className="prices">
                  {_categories.map((category) => (
                    <div
                      className={
                        filterValues.categoryId == category.categoryId
                          ? "item selected"
                          : "item "
                      }
                      key={category.categoryId}
                      onClick={() =>
                        handleSelect("category", category.categoryId)
                      }
                    >
                      {category.categoryName}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
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
                      filterValues.min == price.min ? "item selected" : "item "
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
                {filterValues.sizes.map((id) => (
                  <SelectedFilter
                    key={`size${id}`}
                    type="size"
                    id={id}
                    getValues={getFilterValues}
                    handleSelect={handleSelect}
                  />
                ))}
                {filterValues.colors.map((id) => (
                  <SelectedFilter
                    key={`color${id}`}
                    type="color"
                    id={id}
                    getValues={getFilterValues}
                    handleSelect={handleSelect}
                  />
                ))}
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
              {!loading
                ? products.map((p) => (
                    <Link
                      href={
                        "/" +
                        p.product.subCategoryId +
                        "/" +
                        p.product.productId
                      }
                      key={p.product.productId}
                    >
                      <a>
                        <ProductCard
                          product={p.product}
                          colors={p.colors}
                          sizes={p.sizes}
                        />
                      </a>
                    </Link>
                  ))
                : skeletonContainer}
            </div>
            <div className="d-flex justify-content-center">
              <Button type="button" onClick={() => loadMore()}>
                Load More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const filterValues = {
    categoryId: null,
    min: null,
    max: null,
    colors: [],
    sizes: [],
  };
  let orderBy = "newest";
  let query = "";
  let categories = null;
  let campaign = null;
  let URLquery = null;
  const filters = await getFilters();
  const campaigns = await getCampaigns();
  if (context.query.filter !== undefined) {
    context.query.filter.split(";").forEach((element) => {
      if (element.split(":")[0] === "size") {
        element
          .split(":")[1]
          .split(",")
          .forEach((size) => {
            filters.sizes.forEach((s) => {
              if (s.sizeName.toLowerCase() === size.toLowerCase()) {
                filterValues.sizes.push(s.sizeId);
              }
            });
          });
      }
      if (element.split(":")[0] === "color") {
        element
          .split(":")[1]
          .split(",")
          .forEach((color) => {
            filters.colors.forEach((c) => {
              if (c.colorName.toLowerCase() === color.toLowerCase()) {
                filterValues.colors.push(c.colorId);
              }
            });
          });
      }
    });
  }
  if (context.query.min !== undefined && context.query.max !== undefined) {
    filterValues.min = context.query.min;
    filterValues.max = context.query.max;
  }

  if (context.query.orderBy !== undefined) {
    orderBy = context.query.orderBy;
  }
  let check = false;
  campaigns.forEach((campaign) => {
    if (campaign.campaignId === context.params.category) {
      check = true;
    }
  });

  if (context.params.category === "search") {
    URLquery = context.query.query;
    categories = await getCategories();
    if (context.query.categoryId !== undefined) {
      for (let index = 0; index < categories.length; index++) {
        if (categories[index].categoryId === context.query.categoryId) {
          filterValues.categoryId = context.query.categoryId;
          break;
        }
      }
    }
    query = `?query=${context.query.query}&start=${start}&end=${end}&orderBy=${orderBy}&`;
    if (filterValues.categoryId !== null) {
      query = `?query=${context.query.query}&categoryId=${filterValues.categoryId}&start=${start}&end=${end}&orderBy=${orderBy}&`;
    }
  } else if (check) {
    campaign = context.params.category;
    query = `?campaign=${context.params.category}&start=${start}&end=${end}&orderBy=${orderBy}&`;
    if (filterValues.categoryId !== null) {
      query = `?campaign=${context.params.category}&categoryId=${filterValues.categoryId}&start=${start}&end=${end}&orderBy=${orderBy}&`;
    }
    categories = await getCategories();
    if (context.query.categoryId !== undefined) {
      for (let index = 0; index < categories.length; index++) {
        if (categories[index].categoryId === context.query.categoryId) {
          filterValues.categoryId = context.query.categoryId;
          break;
        }
      }
    }
  } else {
    filterValues.categoryId = context.params.category;
    query = `?categoryId=${context.params.category}&start=${start}&end=${end}&orderBy=${orderBy}&`;
  }

  filterValues.colors.forEach((color) => {
    query += `color=${color}&`;
  });

  filterValues.sizes.forEach((size) => {
    query += `size=${size}&`;
  });

  if (filterValues.min !== null) {
    query += `min=${filterValues.min}&`;
  }
  if (filterValues.max !== null) {
    query += `max=${filterValues.max}&`;
  }
  const products = await getProducts(query);

  return {
    props: {
      _products: products,
      _query: URLquery,
      _filters: filters,
      _filterValues: filterValues,
      _orderBy: orderBy,
      _categories: categories,
      _campaign: campaign,
    },
  };
}
