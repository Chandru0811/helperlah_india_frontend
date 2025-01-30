import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";

function OrdersView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`vendor/order/${id}`);
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
  }, []);

  return (
    <div className="container-fluid">
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
          <Link to="/orders" className="custom-breadcrumb">
            &nbsp;Orders
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Order View
        </li>
      </ol>
      <div className="card" style={{ border: "1px solid #dbd9d0" }}>
        <div
          className="d-flex px-4 justify-content-between align-items-center p-1 mb-4"
          style={{ background: "#f5f7f9" }}
        >
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <div className="dot active"></div>
            </div>
            <span className="me-2 text-muted">View Order</span>
          </div>
          <div className="my-2 pe-3 d-flex align-items-center">
            <Link to="/orders">
              <button type="button " className="btn btn-sm btn-border">
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
                    <p className="fw-medium text-sm">Company Name</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data.company.company_name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Order Number</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data.order.order_number}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Helper Id</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.helper_id}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Helper Name</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.helper.name}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Date & Time</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break">
                      :{" "}
                      {(() => {
                        const [date, time] =
                          data.order.order_details[0].date_time.split(" ");
                        const formattedTime = time.replace(".", ":");
                        const formattedDateTime = new Date(
                          `${date}T${formattedTime}`
                        );
                        return formattedDateTime.toLocaleString("en-GB", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        });
                      })()}
                    </p>
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
                      : {data.assigned_at.substring(0, 10)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Start Date</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break ">
                      : {data.order.order_details[0].start_date}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">End Date</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break ">
                      : {data.order.order_details[0].end_date}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6  ">
                    <p className="fw-medium text-sm">Status</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.status}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-12 my-2">
                <div className="row">
                  <div className="col-3">
                    <p className="fw-medium text-sm">Availablity</p>
                  </div>
                  <div className="col-9">
                    <p className="text-muted text-sm">
                      :{" "}
                      {data.helper.availablity
                        ? JSON.parse(data.helper.availablity).join(", ")
                        : " --"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 my-5">
                <h4 className="fw-medium">Specialized In</h4>
              </div>
              {Object.entries(JSON.parse(data.helper.specialized_in)).map(
                ([service, experience], index) => (
                  <div key={index} className="row">
                    <div className="col-md-6 col-12 my-2">
                      <div className="row">
                        <div className="col-6">
                          <p className="fw-medium text-sm">Service</p>
                        </div>
                        <div className="col-6">
                          <p className="text-muted text-sm text-break">
                            : {service}
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
                          <p className="text-muted text-sm text-break">
                            : {experience}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
               <div className="col-12 my-5">
                <h4 className="fw-medium">Customer Details</h4>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Customer Name</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.order.customer.name}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Customer Email</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data.order.customer.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Customer Mobile</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data.order.customer.mobile}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Booking Type</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break ">
                      : {data.order.order_details[0].booking_type}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 my-2">
                <div className="row">
                  <div className="col-6">
                    <p className="fw-medium text-sm">Service Name</p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm text-break ">
                      : {data.order.order_details[0].services}
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

export default OrdersView;
