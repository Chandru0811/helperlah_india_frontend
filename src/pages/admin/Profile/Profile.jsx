import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ProfileView from "./ProfileView";
import BankDetail from "./BankDetail";
import { CgProfile } from "react-icons/cg";
import { PiBankLight } from "react-icons/pi";

function Profile() {
  const [selectedItem, setSelectedItem] = useState("Profile");
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <section className="px-4">
      <div className="border-0 mb-3">
        <div className="row p-3">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div>
              <h3 className="ls-tight">{selectedItem} View</h3>
            </div>
            <div>
              <Link to="/">
                <button type="button" className="btn btn-light btn-sm me-2">
                  <span>Back</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container card shadow border-0"
        style={{ minHeight: "80vh" }}
      >
        <div className="row mt-5">
          <div className="col-md-3 col-12">
            <div className="profile-menu p-3" style={{ zIndex: "1" }}>
              <div
                className={`profile-item ${
                  selectedItem === "Profile" ? "active" : ""
                }`}
                onClick={() => handleItemClick("Profile")}
              >
                <CgProfile /> Profile
              </div>
              <div className="dropdown-divider"></div>
              <div
                className={`profile-item ${
                  selectedItem === "Bank Details" ? "active" : ""
                }`}
                onClick={() => handleItemClick("Bank Details")}
              >
                <PiBankLight /> Bank Details
              </div>
            </div>
          </div>

          <div className="col-md-9 col-12">
            <div>
              {selectedItem === "Profile" && <ProfileView />}
              {selectedItem === "Bank Details" && <BankDetail />}
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deactivate Company</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to deactivate this Company?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-sm btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-sm btn-danger" type="button">
            Deactivate
          </button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default Profile;
