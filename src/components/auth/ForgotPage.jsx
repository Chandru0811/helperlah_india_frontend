import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import headerlogo from "../../assets/Helperlah Logo.png";

const ForgotPage = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("*Invalid email address")
      .required("*Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      navigate("/resetpassword");
    },
  });

  return (
    <section>
      <div
        className="container-fluid m-0"
        style={{ backgroundColor: "#fcfcfc" }}
      >
        <div
          className="d-flex justify-content-center align-items-center m-0 pt-5"
        >
          <img src={headerlogo} className="img-fluid" alt="img" />
        </div>
        <div className=" d-flex  justify-content-center align-items-center mt-3">
          <div className="row mt-5">
            <div
              className="card shadow-lg p-3 mb-5 rounded"
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
                Forgot Password
              </h3>
              <p
                className="text-center text-muted mb-4"
                style={{ fontSize: "0.9rem" }}
              >
                Enter the email address or mobile phone number associated with
                your account.
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
                    className={`form-control rounded-0 ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : formik.touched.email && !formik.errors.email
                        ? "is-valid"
                        : ""
                    }`}
                    placeholder="Email Address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="invalid-feedback mt-0">
                      {formik.errors.email}
                    </div>
                  ) : null}
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
      </div>
    </section>
  );
};

export default ForgotPage;
