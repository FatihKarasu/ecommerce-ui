import React, { useState, useEffect } from "react";

import ConfirmationModal from "./ConfirmationModal";
import AddressModal from "./Profile/AddressModal";

export default function Address({ address, deleteAddress, editAddress }) {
  const [editModal, setEditModal] = useState(false);
  
  const [modal, setModal] = useState(false);

  return (
    <>
        <div className="address">
          <div className="address-header">
            <h4>{address.title}</h4>
            <div className="button-container">
              <i
                className="fas fa-edit "
                title="Edit Address"
                onClick={() => setEditModal(true)}
              ></i>
              <i
                className="fas fa-trash "
                title="Delete Address"
                onClick={() => setModal(true)}
              ></i>
            </div>
          </div>
          <div className="address-body">
            <h6>{address.name}</h6>
            <div>
              <small>{address.neighbourhood}</small>
            </div>
            <small>{address.detail}</small>
            <div>
              {address.district} / {address.city}
            </div>
            <small>{address.phoneNumber}</small>
          </div>
          <ConfirmationModal
            show={modal}
            onHide={() => setModal(false)}
            title="Delete this address?"
            f={deleteAddress}
          />
          <AddressModal show={editModal} onHide={()=>setEditModal(false)} address={address} func={editAddress}/>
        </div>
      
    </>
  );
}
