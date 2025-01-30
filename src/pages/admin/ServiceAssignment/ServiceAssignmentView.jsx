import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PaymentModal from "./PaymentModal";
import api from "../../../config/URL";

function ServiceAssignmentView() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`admin/serviceAssignment/${id}`);
      setData(response.data.data);
    } catch (error) {
      console.log("Error:", error.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
          <Link to="/assignment" className="custom-breadcrumb">
            &nbsp;Service Assignment
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Service Assignment View
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
            <span className="me-2 text-muted">View Service Assignment</span>
          </div>
          <div className="my-2 pe-3 d-flex align-items-center">
            <Link to="/assignment">
              <button type="button " className="btn btn-sm btn-border">
                Back
              </button>
            </Link>
            &nbsp;&nbsp;
            <PaymentModal
              order_id={data.order_id}
              company_id={data.company_id}
              helper_id={data.helper_id}
            />
          </div>
        </div>
        {loading ? (
          <div className="loader-container">
            <div className="loader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        ) : (
          <div className="container-fluid px-4">
            <div className="row pb-3">
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Order Number</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.orderNumber}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Company Name</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.companyName}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Booking Type</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.booking_type}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Helper Name</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.helperName}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Assigned At</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data.assigned_at.split(" ")[0]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceAssignmentView;
