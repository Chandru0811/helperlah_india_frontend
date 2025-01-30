import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";

function CustomPackageView() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [additionalSpecs, setAdditionalSpecs] = useState({});
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`admin/custom_package/${id}`);
      const packageData = response.data.data;
      setData(packageData);

      if (packageData.additional_specs) {
        setAdditionalSpecs(JSON.parse(packageData.additional_specs));
      }
    } catch (error) {
      error("Error Fetching Data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
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
          <Link to="/custompackage" className="custom-breadcrumb">
            &nbsp;Custom Subscription
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Custom Subscription View
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
            <span className="me-2 text-muted">View Custom Subscription</span>
          </div>
          <div className="my-2 pe-3 d-flex align-items-center">
            <Link to="/custompackage">
              <button type="button" className="btn btn-sm btn-border">
                Back
              </button>
            </Link>
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
                    <p className="fw-medium text-sm">Service Name</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      :{" "}
                      {data.serviceNames
                        ? JSON.parse(data.serviceNames).join(", ")
                        : " --"}
                    </p>
                  </div>
                </div>
              </div>
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
                    <p className="fw-medium text-sm">Start Date</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.start_date}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">End Date</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.end_date}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Recurrence</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.recurrence}</p>
                  </div>
                </div>
              </div>
              {/* Additional Specs */}
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Property Type</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break">
                      : {additionalSpecs.property_type}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Property Size</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break">
                      : {additionalSpecs.property_size}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Cleaning Hours</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break">
                      : {additionalSpecs.cleaning_hours}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Range</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break">
                      : {data.range}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                  <div className="row">
                    <div className="col-6">
                      <p className="fw-medium text-sm">Offer Coupon Code</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm text-break ">
                        : {data.offerCouponCode}
                      </p>
                    </div>
                  </div>
                </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Price</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break">
                      : {data.price}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Description</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break">
                      : {data.description}
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

export default CustomPackageView;
