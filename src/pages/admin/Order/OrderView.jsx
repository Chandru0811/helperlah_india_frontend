import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import AssignModal from "./AssignModal";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import productImage from "../../../assets/helper_partner_hero.webp";

function OrderView() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  console.log("Data", data);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`admin/order/${id}`);
      console.log("Response", response);
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

  // function formatDateTime(dateTime) {
  //   if (!dateTime) return "--";

  //   const [date, time] = dateTime.split(" ");
  //   const [hours, minutes] = time.split(".");

  //   const isPM = parseInt(hours, 10) >= 12;
  //   const formattedHours = isPM
  //     ? parseInt(hours, 10) % 12 || 12
  //     : parseInt(hours, 10);
  //   const period = isPM ? "PM" : "AM";

  //   return `${date}, ${formattedHours}:${minutes} ${period}`;
  // }

  function formatDateTime(dateTime) {
    if (!dateTime) return "--";

    const date = new Date(dateTime);

    const formattedDate = date.toISOString().split("T")[0];

    let hours = date.getHours();
    let minutes = date.getMinutes();
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const formattedTime = `${hours % 12 || 12}:${formattedMinutes}`;

    return `${formattedDate}, ${formattedTime}`;
  }

  function formatSpecifications(specifications) {
    try {
      const specArray = JSON.parse(specifications);
      return specArray
        .map((spec) => {
          const key = Object.keys(spec)[0];
          const value = spec[key];
          return `${key} - ${value}`;
        })
        .join(", ");
    } catch (error) {
      // Remove quotes around 'error'
      return "--";
    }
  }

  const paymentStatusMap = {
    1: "Unpaid",
    2: "Partial Paid",
    3: "Paid",
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
          <Link to="/order" className="custom-breadcrumb">
            &nbsp;Order
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
            <Link to="/order">
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
          <>
            <div className="container-fluid px-4">
              <div className="row pb-3">
                <div className="col-md-8">
                  <div className="card mb-4">
                    <div className="card-header m-0 p-2 d-flex justify-content-between gap-2 align-items-center">
                      <div>
                        <p className="mb-0">
                          {data?.order?.order_number || " --"} &nbsp;
                          <span className="badge_danger">
                            <span>
                              {data?.order?.order_details?.[0]?.booking_type ||
                                " --"}
                            </span>
                          </span>
                          <span className="badge_payment">
                            <span>{data?.order?.coupon_code || " --"}</span>
                          </span>
                        </p>
                      </div>
                      <div>
                        <span>
                          Date :{" "}
                          {data?.order?.order_details?.[0]?.date_time
                            ? formatDateTime(
                                data.order.order_details[0].date_time
                              )
                            : " --"}
                        </span>
                        &nbsp;
                        {/* <span>
                      Time :{" "}
                      <span className="text-uppercase">
                        {" "}
                        {data?.created_at
                          ? new Date(data.created_at).toLocaleString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                          : ""}
                      </span>
                    </span> */}
                      </div>
                    </div>
                    <div className="card-body m-0 p-4">
                      <div className="row align-items-center ">
                        <div className="col-md-3">
                          <img
                            src={productImage}
                            alt="Image"
                            className="img-fluid"
                            style={{ width: "100%" }}
                          />
                          {/* <img
                          src={
                            data?.product?.product_media[0]?.type === "image"
                              ? `${ImageURL}${data.product.product_media[0].resize_path}`
                              : noImage
                          }
                          alt={data?.product?.name || "Product Image"}
                          style={{ width: "100%" }}
                        /> */}
                        </div>
                        <div className="col">
                          <h3 className="text-muted text-capitalize">
                            {data?.order.order_details?.[0]?.service_name ||
                              " --"}
                          </h3>
                          {data?.order?.order_details?.[0]?.specifications && (
                            <p>
                              {formatSpecifications(
                                data.order.order_details[0].specifications
                              )}
                            </p>
                          )}
                          <p>
                            Duration :{" "}
                            {data?.order?.order_details?.[0]?.duration || " --"}
                            hrs
                            {/* <span className="badge_danger">
                              {parseFloat(
                                data?.order?.discount_percentage
                              ).toFixed(0)}
                              % saved
                            </span> */}
                          </p>
                          <p>
                            {data?.order?.order_details?.[0]?.start_date ||
                              " --"}{" "}
                            -{" "}
                            {data?.order?.order_details?.[0]?.end_date || " --"}
                          </p>
                          {/* <p>{data?.order?.payment_type || " --"}</p> */}
                          <p>
                            {data?.order?.order_details?.[0]
                              ?.additional_information || " --"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Order Summary */}
                  <div className="card mb-4">
                    <div className="card-header m-0 p-2 d-flex justify-content-between align-items-center">
                      <p className="mb-0">Order Summary</p>
                      <p>
                        <span className="badge_payment">
                          {data?.order?.payment_type}
                        </span>
                        &nbsp;
                        <span className="badge_warning text-capitalize">
                          {paymentStatusMap[data?.order?.payment_status] ||
                            "--"}
                        </span>
                      </p>
                    </div>
                    <div className="card-body  m-0 p-4">
                      <div className="d-flex justify-content-between">
                        <span>Subtotal</span>
                        <span>
                          ₹
                          {new Intl.NumberFormat("en-IN", {
                            maximumFractionDigits: 0,
                          }).format(parseFloat(data?.order?.price || " --"))}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Discount</span>
                        <span>
                          ₹
                          {new Intl.NumberFormat("en-IN", {
                            maximumFractionDigits: 0,
                          }).format(parseFloat(data?.order?.discount || " 0"))}
                        </span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <span>Total</span>
                        <span>
                          ₹
                          {new Intl.NumberFormat("en-IN", {
                            maximumFractionDigits: 0,
                          }).format(parseFloat(data?.order?.price || " --"))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Column: Notes, Customer Info, Contact, and Address */}
                <div className="col-md-4">
                  {/* Contact Information */}
                  <div className="card mb-2">
                    <div className="card-header m-0 p-2">
                      <p className="mb-0">Customer Information</p>
                    </div>
                    <div className="card-body m-0 p-4">
                      {data?.user ? (
                        <>
                          <p>Name: {data.user.name || "N/A"}</p>
                          <p>
                            Mobile:{" "}
                            {data.user.mobile || "No mobile number provided"}
                          </p>
                        </>
                      ) : (
                        <p>User details not available</p>
                      )}
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="card mb-2">
                    <div className="card-header m-0 p-2">
                      <p className="mb-0">Contact Information</p>
                    </div>
                    <div className="card-body m-0 p-4">
                      {data?.order?.order_details?.[0]?.address &&
                        (() => {
                          try {
                            const deliveryAddress = JSON.parse(
                              data?.order?.order_details?.[0]?.address
                            );
                            return (
                              <p>
                                {deliveryAddress.name}
                                <br></br>
                                {deliveryAddress.email}
                                <br></br> {deliveryAddress.phone},
                                {deliveryAddress.address}-{" "}
                                {deliveryAddress.postalcode}{" "}
                              </p>
                            );
                          } catch (error) {
                            return <p>Invalid delivery address format</p>;
                          }
                        })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OrderView;
