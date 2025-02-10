import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Deactivate from "../../../components/common/Deactivate";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

function ServiceView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`service/${id}`);
      setData(response.data.data);
    } catch (error) {
      toast.error("Error Fetching Data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handelStatusChange = async () => {
    try {
      setLoadIndicator(true);
      const response = await api.post(`service/status/${id}`);
      toast.success(response?.data?.message);
      getData();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        if (errors) {
          Object.keys(errors).forEach((key) => {
            errors[key].forEach((errorMsg) => {
              toast(errorMsg, {
                icon: <FiAlertTriangle className="text-warning" />,
              });
            });
          });
        }
      } else {
        toast.error("An error occurred while deleting the record.");
      }
    } finally {
      setLoadIndicator(false);
    }
  };

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
          <Link to="/service" className="custom-breadcrumb">
            &nbsp;Service
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Service View
        </li>
      </ol>
      <div className="card vh-100" style={{ border: "1px solid #dbd9d0" }}>
        <div className="d-flex px-4 justify-content-between align-items-center card_header p-1 mb-4">
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <div className="dot active"></div>
            </div>
            <span className="me-2 text-muted">View Service</span>
          </div>
          <div className="my-2 pe-3 d-flex align-items-center">
            <Link to="/service">
              <button type="button " className="btn btn-sm btn-border">
                Back
              </button>
            </Link>
            &nbsp;&nbsp;
            {data.active === 0 ? (
              <button
                type="button"
                onClick={handelStatusChange}
                disabled={loadIndicator}
                className="btn btn-success btn-sm"
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Activate
              </button>
            ) : (
              <Deactivate
                path={`service/status/${id}`}
                handelSuccess={getData}
              />
            )}
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
                    <p className="fw-medium text-sm">Service Group Name</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data.serviceGroupName}
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
                    <p className="fw-medium text-sm">Order</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.order}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Price</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.price}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Image</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      :{" "}
                      <img
                        src={`${ImageURL}${data.image}`}
                        alt="Shop Logo"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
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
                    <p className="text-muted text-sm text-break ">
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

export default ServiceView;
