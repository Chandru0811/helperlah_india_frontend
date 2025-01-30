import { useFormik } from "formik";
import { useState } from "react";
import { FiAlertTriangle, FiPlus } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";

function HelperAdd() {
  const navigate = useNavigate();
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [fields, setFields] = useState([{ experience: "", service: "" }]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("*Name is required"),
    mobile: Yup.number()
      .typeError("*Phone Number must be a number")
      .required("*Phone Number is required")
      .positive("*Please enter a valid number")
      .integer("*Phone Number must be a whole number"),
    email: Yup.string()
      .email("*Entry a valid Email")
      .required("*Email is required"),
    citizenship: Yup.string().required("*Nation is required"),
    nationality: Yup.string().required("*Nationality is required"),
    address: Yup.string().required("*Address is required"),
    services_offering: Yup.string().required("*Address is required"),
    availability: Yup.string().required("*Availability is required"),
    working_hrs: Yup.string().required("*Working Hrs is required"),
    payment_mode: Yup.string().required("*Payment Mode is required"),
    other_details: Yup.string()
      .required("*Other Details is a required")
      .max(200, "*The maximum length is 200 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      citizenship: "",
      nationality: "",
      address: "",
      services_offering: "",
      availability: "",
      working_hrs: "",
      specialized_in: {},
      payment_mode: "",
      other_details: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      const availability = ["Monday", "Wednesday"];

      const specialized_in = fields.reduce((acc, field) => {
        if (field.service && field.experience) {
          acc[field.service] = field.experience;
        }
        return acc;
      }, {});

      const payload = {
        ...values,
        availablity: availability,
        specialized_in,
      };
      try {
        const response = await api.post(
          "vendor/register/helper/92/17",
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/helper");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 422) {
            const errors = error.response.data.error;
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
            toast.error(
              error.response.data.message || "An unexpected error occurred."
            );
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setLoadIndicator(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  const handleAddField = () => {
    setFields([...fields, { experience: "", service: "" }]);
  };

  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleChange = (index, event) => {
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };

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
          <Link to="/helper" className="custom-breadcrumb">
            &nbsp;Helper
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Helper Add
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
        <div className="card">
          <div className="d-flex justify-content-between align-items-center card_header p-1 mb-4 px-4">
            <div className="d-flex align-items-center">
              <div className="d-flex">
                <div className="dot active"></div>
              </div>
              <span className="me-2 text-muted">Add Helper</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to="/helper">
                <button type="button " className="btn btn-sm btn-border">
                  Back
                </button>
              </Link>
              &nbsp;&nbsp;
              <button
                type="submit"
                className="btn btn-button"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Save
              </button>
            </div>
          </div>
          <div className="container-fluid px-4">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Name<span className="text-danger">*</span>
                </label>
                <input
                  aria-label="Default input example"
                  className={`form-control ${
                    formik.touched.name && formik.errors.name
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="invalid-feedback">{formik.errors.name}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Address<span className="text-danger">*</span>
                </label>
                <textarea
                  rows={5}
                  className={`form-control ${
                    formik.touched.address && formik.errors.address
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address && (
                  <div className="invalid-feedback">
                    {formik.errors.address}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Phone Number<span className="text-danger">*</span>
                </label>
                <input
                  aria-label="Default input example"
                  className={`form-control ${
                    formik.touched.mobile && formik.errors.mobile
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("mobile")}
                />
                {formik.touched.mobile && formik.errors.mobile && (
                  <div className="invalid-feedback">
                    {formik.errors.mobile}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Email<span className="text-danger">*</span>
                </label>
                <input
                  aria-label="Default input example"
                  className={`form-control ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Nation<span className="text-danger">*</span>
                </label>
                <select
                  type="text"
                  className={`form-select ${
                    formik.touched.citizenship && formik.errors.citizenship
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("citizenship")}
                >
                  <option></option>
                  <option value="India">India</option>
                  <option value="Singapore">Singapore</option>
                </select>
                {formik.touched.citizenship && formik.errors.citizenship && (
                  <div className="invalid-feedback">{formik.errors.citizenship}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Nationality<span className="text-danger">*</span>
                </label>
                <select
                  type="text"
                  className={`form-select ${
                    formik.touched.nationality && formik.errors.nationality
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("nationality")}
                >
                  <option></option>
                  <option value="Indian">Indian</option>
                  <option value="Singaporian">Singaporian</option>
                </select>
                {formik.touched.nationality && formik.errors.nationality && (
                  <div className="invalid-feedback">
                    {formik.errors.nationality}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Service Offering<span className="text-danger">*</span>
                </label>
                <textarea
                  rows={5}
                  className={`form-control ${
                    formik.touched.services_offering &&
                    formik.errors.services_offering
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("services_offering")}
                />
                {formik.touched.services_offering &&
                  formik.errors.services_offering && (
                    <div className="invalid-feedback">
                      {formik.errors.services_offering}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Availability<span className="text-danger">*</span>
                </label>
                <textarea
                  rows={5}
                  className={`form-control ${
                    formik.touched.availability && formik.errors.availability
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("availability")}
                />
                {formik.touched.availability && formik.errors.availability && (
                  <div className="invalid-feedback">
                    {formik.errors.availability}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Working Hours<span className="text-danger">*</span>
                </label>
                <textarea
                  rows={5}
                  className={`form-control ${
                    formik.touched.working_hrs && formik.errors.working_hrs
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("working_hrs")}
                />
                {formik.touched.working_hrs && formik.errors.working_hrs && (
                  <div className="invalid-feedback">
                    {formik.errors.working_hrs}
                  </div>
                )}
              </div>
              <div className="col-12 mb-2 mt-5">
                <label className="form-label">Services Offered</label>
                <span className="text-danger">*</span>
              </div>
              {fields.map((field, index) => (
                <div className="row" key={index}>
                  <div className="col-md-5 col-11 mb-3">
                    <input
                      type="text"
                      className="form-control my-3 form-control-lg w-100"
                      placeholder="Service"
                      aria-label="Service"
                      name="service"
                      value={field.service}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div className="col-lg-1 col-11"></div>
                  <div className="col-md-5 col-11 mb-3">
                    <input
                      type="text"
                      className="form-control my-3 form-control-lg w-100"
                      placeholder="Experience"
                      aria-label="Experience"
                      name="experience"
                      value={field.experience}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  {index === fields.length - 1 && (
                    <div className="col-1 d-flex flex-column">
                      <p
                        className="my-2"
                        style={{
                          cursor: fields.length > 1 ? "pointer" : "",
                          opacity: fields.length > 1 ? 1 : 0.5,
                        }}
                        onClick={() => {
                          if (fields.length > 1) handleRemoveField(index);
                        }}
                      >
                        <IoCloseSharp style={{ fontSize: "20px" }} />
                      </p>
                      <p style={{ cursor: "pointer" }} onClick={handleAddField}>
                        <FiPlus style={{ fontSize: "20px" }} />
                      </p>
                    </div>
                  )}
                </div>
              ))}
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Payment Mode<span className="text-danger">*</span>
                </label>
                <select
                  type="text"
                  className={`form-select ${
                    formik.touched.payment_mode && formik.errors.payment_mode
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("payment_mode")}
                >
                  <option></option>
                  <option value="2">Cash</option>
                  <option value="3">Bank Transfer</option>
                  <option value="4">UPI</option>
                </select>
                {formik.touched.payment_mode && formik.errors.payment_mode && (
                  <div className="invalid-feedback">
                    {formik.errors.payment_mode}
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Other Details<span className="text-danger">*</span>
                </label>
                <textarea
                  rows={5}
                  className={`form-control ${
                    formik.touched.other_details && formik.errors.other_details
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("other_details")}
                  maxLength={825}
                />
                {formik.touched.other_details &&
                  formik.errors.other_details && (
                    <div className="invalid-feedback">
                      {formik.errors.other_details}
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

export default HelperAdd;
