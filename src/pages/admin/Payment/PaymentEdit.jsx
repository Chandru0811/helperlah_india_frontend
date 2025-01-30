import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import fetchAllPaymentTypeWithIds from "../../List/PaymentTypeList";
import toast from "react-hot-toast";

function PaymentEdit() {
  const [payment, setPaymnet] = useState(null);

  const validationSchema = Yup.object().shape({
    order_id: Yup.string().required("*Order Id required"),
    helper_id: Yup.string().required("*Helper Id required"),
    company_id: Yup.string().required("*Company Id required"),
    booking_type: Yup.string().required("*Booking Type required"),
    amount_paid: Yup.string().required("*Amount Paid required"),
    balance_amount: Yup.string().required("*Balance Amount required"),
    total_amount: Yup.string().required("*Total Amount required"),
    payment_mode: Yup.string().required("*Payment Mode required"),
    payment_status: Yup.string().required("*Payment Status required"),
  });

  const formik = useFormik({
    initialValues: {
      order_id: "",
      helper_id: "",
      company_id: "",
      booking_type: "",
      amount_paid: "",
      balance_amount: "",
      total_amount: "5000",
      payment_mode: "",
      payment_status: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  useEffect(() => {
    if (formik.values.amount_paid && formik.values.total_amount) {
      const balanceAmount =
        parseFloat(formik.values.total_amount) -
        parseFloat(formik.values.amount_paid);
      formik.setFieldValue("balance_amount", balanceAmount.toFixed(2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.amount_paid, formik.values.total_amount]);

  const fetchPaymentType = async () => {
    try {
      const data = await fetchAllPaymentTypeWithIds();
      setPaymnet(data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchPaymentType();
  }, []);

  return (
    <div className="container-fluid px-0">
      <ol
        className="breadcrumb my-3 px-2"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        <li>
          <Link to="/" className="custom-breadcrumb">
            Home
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li>
          <Link to="/payment" className="custom-breadcrumb">
            &nbsp;Payment
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Payment Edit
        </li>
      </ol>
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault();
          }
        }}
      >
        <div className="card vh-100">
          <div className="d-flex justify-content-between align-items-center card_header p-1 mb-4 px-4">
            <div className="d-flex align-items-center">
              <div className="d-flex">
                <div className="dot active"></div>
              </div>
              <span className="me-2 text-muted">Edit Payment</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to="/payment">
                <button type="button " className="btn btn-sm btn-border">
                  Back
                </button>
              </Link>
              &nbsp;&nbsp;
              <button type="submit" className="btn btn-button btn-sm">
                <span className="fw-medium">Update</span>
              </button>
            </div>
          </div>
          <div className="container-fluid px-4">
            <div className="row">
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Order Id<span className="text-danger">*</span>
                </label>
                <select
                  aria-label="Default select example"
                  className={`form-select ${
                    formik.touched.order_id && formik.errors.order_id
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("order_id")}
                >
                  <option value=""></option>
                  <option value="1">Home Cleaning</option>
                  <option value="2">Plumbing</option>
                </select>
                {formik.touched.order_id && formik.errors.order_id && (
                  <div className="invalid-feedback">
                    {formik.errors.order_id}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Helper Id<span className="text-danger">*</span>
                </label>
                <select
                  aria-label="Default select example"
                  className={`form-select ${
                    formik.touched.helper_id && formik.errors.helper_id
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("helper_id")}
                >
                  <option value=""></option>
                  <option value="1">Ramesh</option>
                  <option value="2">Saran</option>
                </select>
                {formik.touched.helper_id && formik.errors.helper_id && (
                  <div className="invalid-feedback">
                    {formik.errors.helper_id}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Comapny Id<span className="text-danger">*</span>
                </label>
                <select
                  aria-label="Default select example"
                  className={`form-select ${
                    formik.touched.helper_id && formik.errors.helper_id
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("helper_id")}
                >
                  <option value=""></option>
                  <option value="1">ECS</option>
                  <option value="2">CloudECS</option>
                </select>
                {formik.touched.helper_id && formik.errors.helper_id && (
                  <div className="invalid-feedback">
                    {formik.errors.helper_id}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Booking Type<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.booking_type && formik.errors.booking_type
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("booking_type")}
                />
                {formik.touched.booking_type && formik.errors.booking_type && (
                  <div className="invalid-feedback">
                    {formik.errors.booking_type}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Amount Paid<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.amount_paid && formik.errors.amount_paid
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("amount_paid")}
                />
                {formik.touched.amount_paid && formik.errors.amount_paid && (
                  <div className="invalid-feedback">
                    {formik.errors.amount_paid}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Balance Amount<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.balance_amount &&
                    formik.errors.balance_amount
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("balance_amount")}
                  readOnly
                />
                {formik.touched.balance_amount &&
                  formik.errors.balance_amount && (
                    <div className="invalid-feedback">
                      {formik.errors.balance_amount}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Total Amount<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.total_amount && formik.errors.total_amount
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("total_amount")}
                  readOnly
                />
                {formik.touched.total_amount && formik.errors.total_amount && (
                  <div className="invalid-feedback">
                    {formik.errors.total_amount}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Payment Mode<span className="text-danger">*</span>
                </label>
                <select
                  aria-label="Default select example"
                  className={`form-select ${
                    formik.touched.payment_mode && formik.errors.payment_mode
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("payment_mode")}
                >
                  <option selected></option>
                  {payment &&
                    payment.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                </select>
                {formik.touched.payment_mode && formik.errors.payment_mode && (
                  <div className="invalid-feedback">
                    {formik.errors.payment_mode}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PaymentEdit;
