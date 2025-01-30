import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import * as yup from "yup";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import api from "../../../config/URL";
import { FiAlertTriangle } from "react-icons/fi";
import PropTypes from "prop-types";
import fetchAllPaymentTypeWithIds from "../../List/PaymentTypeList";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function PaymentModal({ order_id, company_id, helper_id }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [payment, setPaymnet] = useState(null);

  const handleOpenDialog = () => {
    setDeleteDialogOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
    document.body.style.overflow = "";
    formik.resetForm();
  };

  const validationSchema = yup.object().shape({
    amount_paid: yup.string().required("*Amount Paid required"),
    payment_mode: yup.string().required("*Payment Mode required"),
    payment_status: yup.string().required("*Payment Status required"),
  });

  const formik = useFormik({
    initialValues: {
      amount_paid: "",
      balance_amount: "",
      total_amount: "",
      payment_mode: "",
      payment_status: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoadIndicator(true);

        const payload = {
          ...values,
          order_id: order_id,
          helper_id: helper_id,
          company_id: company_id,
          booking_type: "Online",
        };

        const response = await api.post("admin/payment", payload);
        if (response.status === 200) {
          toast.success(response?.data?.message);
        }
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
          toast.error("Error while assigning");
        }
      } finally {
        handleCloseDialog();
        setLoadIndicator(false);
      }
    },
    validateOnChange: true,
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

  const getData = async () => {
    try {
      const response = await api.get(`admin/order/10`);
      formik.setValues({
        ...formik.values,
        total_amount: response.data.data.total_amount,
      });
    } catch (error) {
      toast.error("Error Fetching Data: " + error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-border"
        onClick={handleOpenDialog}
      >
        Payment
      </button>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="md"
        sx={{
          "& .MuiDialog-paper": {
            margin: "0 auto",
            top: "10%",
            position: "absolute",
            width: "80%",
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle>Payment</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="container">
              <div className="row">
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
                  {formik.touched.total_amount &&
                    formik.errors.total_amount && (
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
                  {formik.touched.payment_mode &&
                    formik.errors.payment_mode && (
                      <div className="invalid-feedback">
                        {formik.errors.payment_mode}
                      </div>
                    )}
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <label className="form-label">
                    Payment Status<span className="text-danger">*</span>
                  </label>
                  <select
                    aria-label="Default select example"
                    className={`form-select ${
                      formik.touched.payment_status &&
                      formik.errors.payment_status
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("payment_status")}
                  >
                    <option value=""></option>
                    <option value="1">Paid</option>
                    <option value="2">Not Paid</option>
                    <option value="3">Partially Paid</option>
                  </select>
                  {formik.touched.payment_status &&
                    formik.errors.payment_status && (
                      <div className="invalid-feedback">
                        {formik.errors.payment_status}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            className="btn btn-secondary btn-sm"
          >
            Cancel
          </Button>
          <Button
            disabled={loadIndicator}
            className="btn btn-button"
            type="submit"
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
        </DialogActions>
      </Dialog>
    </>
  );
}

PaymentModal.propTypes = {
  order_id: PropTypes.func.isRequired,
  company_id: PropTypes.func.isRequired,
  helper_id: PropTypes.func.isRequired,
};

export default PaymentModal;
