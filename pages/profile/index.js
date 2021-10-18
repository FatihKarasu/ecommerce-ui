import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getUser, logout } from "../../redux/userReducer";
import { Col, Nav, Row, Tab,Button } from "react-bootstrap";
import EditUser from "../../components/UserEdit";
import Address from "../../components/Address";
import Order from "../../components/Order";
import AddressModal from "../../components/Profile/AddressModal"
import axios from "axios";

const APIBase = "http://localhost:5000";

export default function index() {
  const router = useRouter();
  const user = useSelector(getUser);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.id === "") {
      router.push("/");
    }
  }, [user]);

  const getAddresses = async () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    try {
      const response = await axios.get(
        `${APIBase}/address/user/${user.id}`,
        config
      );

      setAddresses(response.data);
    } catch (error) {
      if (error.response.status == 401) {
        dispatch(logout());
        router.push("/");
      }
    }
  };
  const getOrders = async () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    try {
      const response = await axios.get(
        `${APIBase}/order/user/${user.id}`,
        config
      );

      setOrders(response.data);
    } catch (error) {
      if (error.response.status == 401) {
        dispatch(logout());
        router.push("/");
      }
    }
  };
  useEffect(() => {
    if (user.id !== "") {
      getAddresses();
      getOrders();
    }
  }, []);

  const deleteAddress = async (addressId) => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    try {
      const response = await axios.delete(
        `${APIBase}/address/delete/${addressId}`,
        config
      );

      var filtered = addresses.filter(
        (address) => address.addressId !== addressId
      );
      setAddresses(filtered);
    } catch (error) {
      if (error.response.status == 401) {
        dispatch(logout());
        router.push("/");
      }
      if (error.response.status == 500) {
        console.log(error);
      }
    }
  };
  

  const addAddress = async (address) => {
    
    const formData = new FormData();
    formData.append("UserId", user.id);
    formData.append("Name", address.name);
    formData.append("Detail", address.detail);
    formData.append("District", address.district);
    formData.append("City", address.city);
    formData.append("Neighbourhood", address.neighbourhood);
    formData.append("PhoneNumber", address.phoneNumber);
    formData.append("Title", address.title);

    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

   try {
    const response = await axios.post(
        `${APIBase}/address`,
        formData,
        config
      );

      setAddresses([...addresses, response.data]);
   } catch (error) {
    if (error.response.status == 401) {
        dispatch(logout());
        router.push("/");
      }
   }
  };

  const editAddress = async (address) => {
    const formData = new FormData();
    formData.append("AddressId", address.addressId)
    formData.append("UserId", user.id);
    formData.append("Name", address.name);
    formData.append("Detail", address.detail);
    formData.append("District", address.district);
    formData.append("City", address.city);
    formData.append("Neighbourhood", address.neighbourhood);
    formData.append("PhoneNumber", address.phoneNumber);
    formData.append("Title", address.title);

    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };

    try {
      const response = await axios.post(
        `${APIBase}/address/edit`,
        formData,
        config
      );
      changeAddress(address);
      
    } catch (error) {
      if (error.response.status == 401) {
        dispatch(logout());
        router.push("/");
      }
    }
  };
  const changeAddress = (address) => {
    const temp = [...addresses];
    
    for (let index = 0; index < temp.length; index++) {
      if(temp[index].addressId===address.addressId)
      {
        temp[index]=address
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
                  {user.id !== ""
                    ? orders.map((order) => (
                        <Order key={order.orderId} order={order} />
                      ))
                    : null}
                </Tab.Pane>
                <Tab.Pane eventKey="addresses">
                  <div className="profile-header">
                    <h4>Addresses</h4>
                    <Button onClick={()=>setModal(true)}>Add New Address</Button>
                  </div>
                  <div className="address-container">
                    {user.id !== ""
                      ? addresses.map((address) => (
                          <Address
                            key={address.addressId}
                            address={address}
                            deleteAddress={() =>
                              deleteAddress(address.addressId)
                            }
                            editAddress={editAddress}
                          />
                        ))
                      : null}
                  </div>

                  <AddressModal show={modal} onHide={()=>setModal(false)} address={null} func={addAddress}/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
}
