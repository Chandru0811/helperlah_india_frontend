import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import headerlogo from "../../../assets/Helperlah Logo.png";
import { IoMdArrowBack } from "react-icons/io";
import "../../../styles/custom.css";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showcPassword, setShowCPassword] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    mobile: Yup.string()
      .required("Mobile Number is required")
      .min(8, "Mobile number must be 8 characters")
      .max(10, "Mobile number must not exceed 10 characters"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    type: Yup.string().required("Type is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      password_confirmation: "",
      type: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoadIndicator(true);
        const payload = {
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          password: values.password,
          password_confirmation: values.password_confirmation,
          type: values.type,
        };
        const response = await api.post("vendor/register", payload);
        toast.success(response.data.message);

        if (response.data.success) {
          if (values.type === "Company") {
            navigate("/company");
          } else if (values.type === "Individual") {
            navigate("/individual");
          }
        } else {
          console.error("Registration failed:", response.data.message);
        }

        localStorage.setItem("vendor_id", response.data.data.userDetails.id);
        localStorage.setItem("helperlah_token", response.data.data.token);
      } catch (error) {
        if (error.response && error.response.status === 422) {
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
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setLoadIndicator(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleconfirmPasswordVisibility = () => {
    setShowCPassword(!showcPassword);
  };

  return (
    <div className="container-fluid m-0" style={{ backgroundColor: "#fcfcfc" }}>
      <div className="d-flex justify-content-center align-items-center m-0 pt-5">
        <img src={headerlogo} className="img-fluid" alt="img" />
      </div>
      <div className=" d-flex  justify-content-center align-items-center mt-3">
        <div
          className="card shadow-lg p-3 my-5 rounded"
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <Link to="/">
            <button className="btn btn-link text-start shadow-none h-0">
              <IoMdArrowBack style={{ color: "#e10064" }} />
            </button>
          </Link>
          <div className="d-flex justify-content-around ">
            <h3
              className={`py-2`}
              style={{
                borderBottom: "2px solid #e10064",
                paddingBottom: "5px",
                width: "100%",
                textAlign: "center",
                color: "#e10064",
              }}
            >
              Register
            </h3>
          </div>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="name" className="mb-3 pt-4">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                {...formik.getFieldProps("name")}
                isInvalid={formik.touched.name && formik.errors.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.name}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3 pt-4">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...formik.getFieldProps("email")}
                isInvalid={formik.touched.email && formik.errors.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>
            <Form.Group controlId="mobile" className="mb-3 pt-4">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="mobile"
                placeholder="Enter Mobile"
                {...formik.getFieldProps("mobile")}
                isInvalid={formik.touched.mobile && formik.errors.mobile}
              />
              {formik.touched.mobile && formik.errors.mobile ? (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.mobile}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>

            <div className="mb-3">
              <label className="form-label fw-medium">Password</label>
              <div
                className={`input-group mb-3`}
                style={{ outline: "none", boxShadow: "none" }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={`form-control ${
                    formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{
                    borderRadius: "3px",
                    borderRight: "none",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                  name="password"
                  {...formik.getFieldProps("password")}
                />
                <span
                  className={`input-group-text iconInputBackground`}
                  id="basic-addon1"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer", borderRadius: "3px" }}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback">
                    {formik.errors.password}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label fw-medium">Confirm Password</label>
              <div
                className={`input-group mb-3`}
                style={{ outline: "none", boxShadow: "none" }}
              >
                <input
                  type={showcPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className={`form-control ${
                    formik.touched.password_confirmation &&
                    formik.errors.password_confirmation
                      ? "is-invalid"
                      : ""
                  }`}
                  style={{
                    borderRadius: "3px",
                    borderRight: "none",
                    borderTopRightRadius: "0px",
                    borderBottomRightRadius: "0px",
                  }}
                  name="password_confirmation"
                  {...formik.getFieldProps("password_confirmation")}
                />
                <span
                  className={`input-group-text iconInputBackground`}
                  id="basic-addon1"
                  onClick={toggleconfirmPasswordVisibility}
                  style={{ cursor: "pointer", borderRadius: "3px" }}
                >
                  {showcPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </span>
                {formik.touched.password_confirmation &&
                  formik.errors.password_confirmation && (
                    <div className="invalid-feedback">
                      {formik.errors.password_confirmation}
                    </div>
                  )}
              </div>
            </div>
            <Form.Group controlId="formType" className="mb-3 pt-4">
              <Form.Label>Type</Form.Label>
              <div className="d-flex">
                <Form.Check
                  type="radio"
                  id="type1"
                  label="Company"
                  value="Company"
                  onChange={() => {
                    formik.setFieldValue("type", "Company");
                    formik.setFieldTouched("type", false); // Clear validation error
                  }}
                  checked={formik.values.type === "Company"}
                  className="me-3"
                />
                <Form.Check
                  type="radio"
                  id="type2"
                  label="Individual"
                  value="Individual"
                  onChange={() => {
                    formik.setFieldValue("type", "Individual");
                    formik.setFieldTouched("type", false); // Clear validation error
                  }}
                  checked={formik.values.type === "Individual"}
                />
              </div>
              {formik.touched.type && formik.errors.type ? (
                <Form.Control.Feedback
                  type="invalid"
                  style={{ display: "block" }}
                >
                  {formik.errors.type}
                </Form.Control.Feedback>
              ) : null}
            </Form.Group>

            <Button
              type="submit"
              className="w-100 mt-4 common-button"
              disabled={loadIndicator}
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Register
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
