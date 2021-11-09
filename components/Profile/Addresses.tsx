import React from "react";
import { Button } from "react-bootstrap";
import Address from "../Address";

export default function Addresses({user,setModal,addresses,deleteAddress,editAddress}) {
  return (
    <>
      <div className="profile-header">
        <h4>Addresses</h4>
        <div className="button" onClick={() => setModal(true)}>Add New Address</div>
      </div>
      <div className="address-container">
        {user.id !== ""
          ? addresses.map((address) => (
              <Address
                key={address.addressId}
                address={address}
                deleteAddress={() => deleteAddress(address.addressId)}
                editAddress={editAddress}
              />
            ))
          : null}
      </div>
    </>
  );
}
