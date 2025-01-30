import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Dialog, DialogActions, DialogTitle, Slide } from "@mui/material";
import api from "../../config/URL";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Delete({ path, handelSuccess }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);

  const handleOpenDialog = () => {
    setDeleteDialogOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
    document.body.style.overflow = "";
  };

  const handleStatus = async () => {
    try {
      setLoadIndicator(true);
      const response = await api.post(path);
      if (response.status === 200 || response.status === 201) {
        handelSuccess();
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
        toast.error("An error occurred while deleting the record.");
      }
    } finally {
      handleCloseDialog();
      setLoadIndicator(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={handleOpenDialog}
      >
        Deactivate
      </button>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
        keepMounted
        sx={{
          "& .MuiDialog-paper": {
            margin: "0 auto",
            top: "10%",
            position: "absolute",
          },
        }}
      >
        <DialogTitle>
          Are you sure you want to Deactivate this record?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            className="btn btn-secondary btn-sm"
          >
            Cancel
          </Button>
          <Button
            onClick={handleStatus}
            disabled={loadIndicator}
            className="btn btn-button"
          >
            {loadIndicator && (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            )}
            Deactivate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Delete.propTypes = {
  path: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  handelSuccess: PropTypes.func.isRequired,
};

export default Delete;
