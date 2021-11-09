import Link from "next/link";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getUser, logout } from "../../redux/userReducer";
import { Col, Nav, Row, Tab, Button } from "react-bootstrap";
import EditUser from "../../components/Profile/UserEdit";
import Addresses from "../../components/Profile/Addresses";
import Orders from "../../components/Profile/Orders";
import AddressModal from "../../components/Profile/AddressModal";
import {
  getAddresses,
  deleteAddress,
  addNewAddress,
  editAddress,
} from "../../data/address";
import { getOrdersByUserId } from "../../data/order";

export default function index() {
  const router = useRouter();
  const user = useSelector(getUser);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.id === "") {
      router.push("/");
    }
  }, [user]);

  const getOrders = async () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    try {
      const response = await getOrdersByUserId(user.id, config);

      setOrders(response);
    } catch (error) {
      if (error.response.status == 401) {
        dispatch(logout());
        router.push("/");
      }
    }
  };

  useEffect(() => {
    if (user.id !== "") {
      getAddresses(user, setAddresses, dispatch, logout, router);
      getOrders();
    }
  }, []);

  const deleteaddress = async (addressId) => {
    deleteAddress(addressId, user, setAddresses,addresses, dispatch, logout, router);
  };

  const addAddress = async (address) => {
    addNewAddress(
      address,
      user,
      setAddresses,
      addresses,
      dispatch,
      logout,
      router
    );
  };

  const editaddress = async (address) => {
    editAddress(address, user, changeAddress, dispatch, logout, router);
  };
  const changeAddress = (address) => {
    const temp = [...addresses];

    for (let index = 0; index < temp.length; index++) {
      if (temp[index].addressId === address.addressId) {
        temp[index] = address;
      }
    }

    setAddresses(temp);
  };
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="keyword" content="E commerce app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container profile">
        <div className="breadcrumb">
          <nav aria-label="breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>/</li>
              <li aria-current="page" className="active">
                Profile
              </li>
            </ol>
          </nav>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="profile">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="orders">Orders</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="addresses">Addresses</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="profile">
                  <EditUser />
                </Tab.Pane>
                <Tab.Pane eventKey="orders">
                  <Orders user={user} orders={orders} />
                </Tab.Pane>
                <Tab.Pane eventKey="addresses">
                  <Addresses
                    user={user}
                    setModal={setModal}
                    addresses={addresses}
                    deleteAddress={deleteaddress}
                    editAddress={editaddress}
                  />

                  <AddressModal
                    show={modal}
                    onHide={() => setModal(false)}
                    address={null}
                    func={addAddress}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
}
