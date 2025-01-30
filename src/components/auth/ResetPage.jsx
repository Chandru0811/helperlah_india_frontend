import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import headerlogo from "../../assets/Helperlah Logo.png";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("*Invalid email address")
    .required("*Email is required"),
  password: Yup.string().required("*Password is required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "*Passwords must match")
    .required("*Confirm Password is required"),
});

const ResetPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.token = token;

      try {
        const response = await api.post(`reset-password`, values);

        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/");
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          const errors = error.response.data.errors;
          for (const key in errors) {
            if (errors[key]) {
              errors[key].forEach((message) => toast.error(message));
            }
          }
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    },
  });

  useEffect(() => {
    formik.setFieldTouched("email", true, false);
    formik.setFieldValue("email", email);
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <section>
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#fcfcfc"}}
      >
        <div style={{ maxWidth: "400px", width: "100%" }}>
          <div className="text-center my-5">
            <img src={headerlogo} className="img-fluid" alt="Logo" style={{ maxWidth: "200px" }} />
          </div>
          <div
            className="card shadow-lg p-3 my-5 rounded"
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <h3
              className="cursor-pointer py-2 mb-3"
              style={{
                borderBottom: "2px solid #e10064",
                paddingBottom: "5px",
                width: "100%",
                textAlign: "center",
                color: "#e10064",
              }}
            >
              Reset Password
            </h3>
            <p
              className="text-center text-muted mb-4"
              style={{ fontSize: "0.9rem" }}
            >
              Please enter your new password below to complete the reset.
            </p>

            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-4 mt-2">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control rounded-0 ${formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                    }`}
                  placeholder="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  readOnly
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback mt-0">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="form-group mb-4 mt-2">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <div className="input-group mb-3">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    className={`form-control ${formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                      }`}
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                  />
                  <span
                    className="input-group-text"
                    id="basic-addon2"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback mt-0">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group mb-4 mt-2">
                <label className="form-label" htmlFor="Cpassword">
                  Confirm Password
                </label>
                <div className="input-group mb-3">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    id="password_confirmation"
                    name="password_confirmation"
                    className={`form-control rounded-0 ${formik.touched.password_confirmation &&
                        formik.errors.password_confirmation
                        ? "is-invalid"
                        : ""
                      }`}
                    placeholder="Confirm Password"
                    value={formik.values.password_confirmation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    className="input-group-text"
                    id="basic-addon2"
                    onClick={toggleConfirmPasswordVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {formik.touched.password_confirmation &&
                    formik.errors.password_confirmation && (
                      <div className="invalid-feedback mt-0">
                        {formik.errors.password_confirmation}
                      </div>
                    )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary common-button btn-block mt-3 rounded-0 w-100"
                style={{ backgroundColor: "#ef4444", borderColor: "#ef4444" }}
              >
                RESET PASSWORD
              </button>
            </form>

            <div className="text-center mt-3 mb-4">
              <Link to="/">
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Go Back to &nbsp;
                  <span style={{ color: "#e10064" }}>Login</span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPage;