import { useState } from "react";
import { Link } from "react-router-dom";

function HelperView() {
  const [data] = useState({
    name: "",
    phone_no: "",
    email: "",
    nation: "",
    nationality: "",
    address: "",
    service_offering: "",
    availability: "",
    working_hrs: "",
    service: "",
    experience: "",
    payment_mode: "",
    providing_services: {},
    other_details: "",
  });

  return (
    <div className="container-fluid px-0">
      <ol
        className="breadcrumb my-2 px-2"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/helper" className="custom-breadcrumb">
            &nbsp;Helper
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Helper View
        </li>
      </ol>
      <div className="card vh-100" style={{ border: "1px solid #dbd9d0" }}>
        <div
          className="d-flex px-4 justify-content-between align-items-center p-1 mb-4"
          style={{ background: "#f5f7f9" }}
        >
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <div className="dot active"></div>
            </div>
            <span className="me-2 text-muted">View Helper</span>
          </div>
          <div className="my-2 pe-3 d-flex align-items-center">
            <Link to="/helper">
              <button type="button " className="btn btn-sm btn-border">
                Back
              </button>
            </Link>
          </div>
        </div>
        <>
          <div className="container-fluid px-4">
            <div className="row pb-3">
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Name</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.name}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Address</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.address}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Phone Number</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.phone_no}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Email</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break ">
                      : {data.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Nation</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break ">
                      : {data.nation}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Nationality</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break ">
                      : {data.nationality}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Service Offering</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break ">
                      : {data.service_offering}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Availability</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break ">
                      : {data.availability}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Working Hours</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break ">
                      : {data.working_hrs}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Payment Mode</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break ">
                      : {data.payment_mode}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Other Details</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break ">
                      : {data.other_details}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 my-5">
                <h4 className="fw-medium">Service</h4>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Service</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break ">
                      : {data.service}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Experience</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break ">
                      : {data.experience}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default HelperView;
