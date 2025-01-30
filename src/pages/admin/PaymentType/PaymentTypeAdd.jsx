import { useFormik } from "formik";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function PaymentTypeAdd({ onSuccess }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const validationSchema = yup.object().shape({
    name: yup.string().required("*Name is required"),
    description: yup.string().required("*Description is required"),
  });

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.post("admin/paymentType", values);
        if (response.status === 200) {
          toast.success(response.data.message);
          onSuccess(); 
          handleClose();
          formik.resetForm();
          navigate("/paymentType");
        } else {
          toast.error(response.data.message || "An unexpected error occurred.");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Something went wrong!";
        toast.error(errorMessage);
      } finally {
        setLoadIndicator(false); // Stop loading
      }
    },
  });

  return (
    <>
      <div className="d-flex justify-content-end mb-3 me-2">
        <button
          type="button"
          className="btn btn-button btn-sm"
          onClick={handleShow}
        >
          &nbsp; Add &nbsp;&nbsp; <i className="bx bx-plus"></i>
        </button>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Payment Type Add</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-12 mb-3">
                  <label className="form-label">
                    Name<span className="text-danger">*</span>
                  </label>
                  <input
                    aria-label="Default select example"
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
                    Description<span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows={5}
                    className={`form-control ${
                      formik.touched.description && formik.errors.description
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("description")}
                    maxLength={825}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="invalid-feedback">
                      {formik.errors.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-secondary btn-sm" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="btn btn-button"
            type="submit"
            disabled={loadIndicator}
            onClick={formik.handleSubmit}
          >
            {loadIndicator && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

PaymentTypeAdd.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default PaymentTypeAdd;
