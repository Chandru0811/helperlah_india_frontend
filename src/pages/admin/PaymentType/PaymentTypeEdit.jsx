import { useFormik } from "formik";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import * as yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

function PaymentTypeEdit({ id, onSuccess, handleMenuClose }) {
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [open, setOpen] = useState(false); // Local state to control dialog visibility

  // Validation schema for the form
  const validationSchema = yup.object().shape({
    name: yup.string().required("*Name is required"),
    description: yup.string().required("*Description is required"),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      try {
        const response = await api.put(`/admin/paymentType/update/${id}`, values, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          onSuccess(); 
          handleMenuClose(); 
          toast.success(
            response.data.message || "Payment type updated successfully!"
          );

        } else {
          toast.error(response.data.message || "Failed to update payment type.");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "An error occurred while updating."
        );
      } finally {
        setLoadIndicator(false);
      }
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  // Fetch existing data
  const getData = async () => {
    try {
      const response = await api.get(`/admin/paymentType/${id}`);
      if (response?.data?.data) {
        formik.setValues(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch payment type details.");
    }
  };

  // Open dialog and fetch data
  const handleOpen = () => {
    getData();
    setOpen(true); // Open the dialog
  };

  // Close dialog and reset form
  const handleClose = () => {
    setOpen(false); // Close the dialog
    formik.resetForm(); // Reset the form
    if (handleMenuClose) {
      handleMenuClose(); // Optional: Trigger parent menu close if applicable
    }
  };

  return (
    <>
      <span
        onClick={handleOpen}
        style={{
          whiteSpace: "nowrap",
          cursor: "pointer",
        }}
      >
        Edit
      </span>

      <Dialog
        open={open} // Controlled by local state
        onClose={handleClose} // Trigger handleClose on dialog close
        fullWidth
        maxWidth="md"
      >
        <form
          onSubmit={formik.handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !formik.isSubmitting) {
              e.preventDefault();
            }
          }}
        >
          <DialogTitle>Edit Payment Type</DialogTitle>
          <DialogContent>
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-12 mb-3">
                  <label className="form-label">
                    Name<span className="text-danger">*</span>
                  </label>
                  <input
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
          </DialogContent>
          <DialogActions>
            <Button
              className="btn btn-sm btn-border bg-light text-dark"
              onClick={handleClose}
              disabled={loadIndicator} // Disable close button during submission
            >
              Cancel
            </Button>
            <button
              type="submit"
              className="btn btn-button"
              disabled={loadIndicator} // Disable submit button during submission
            >
              {loadIndicator && (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
                ></span>
              )}
              Update
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

PaymentTypeEdit.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  handleMenuClose: PropTypes.func.isRequired,
  id: PropTypes.func.isRequired,
};


export default PaymentTypeEdit;
