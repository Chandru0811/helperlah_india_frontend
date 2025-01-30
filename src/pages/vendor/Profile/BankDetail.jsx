import { useFormik } from "formik";
import * as Yup from "yup";

function BankDetail() {
  const validationSchema = Yup.object().shape({
    company_id: Yup.string().required("*Company Name is required"),
    helper_id: Yup.string().required("*Helper Name is required"),
    ac_number: Yup.number()
      .typeError("*Account Number must be a number")
      .required("*Account Number is required")
      .positive("*Please enter a valid number")
      .integer("*Account Number must be a whole number"),
    ac_type: Yup.string().required("*Account Type is required"),
    online_pay_id: Yup.string().required("*Online Payment is required"),
  });

  const formik = useFormik({
    initialValues: {
      company_id: "",
      helper_id: "",
      ac_number: "",
      ac_type: "",
      online_pay_id: "",
    },
    validationSchema: validationSchema,
    onSubmit: async () => {},
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <div className="container-fluid px-0">
      <form
        onSubmit={formik.handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !formik.isSubmitting) {
            e.preventDefault();
          }
        }}
      >
        <div className="container-fluid px-4">
          <div className="row">
            <div className="col-md-4 col-12 mb-5 ">
              <label className="form-label">
                Company Name<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-md-8 col-12 mb-5">
              <select
                type="text"
                className={`form-select ${
                  formik.touched.company_id && formik.errors.company_id
                    ? "is-invalid"
                    : ""
                }`}
                name="company_id"
                onBlur={formik.handleBlur}
                value={formik.values.company_id}
              >
                <option></option>
                <option value="1">Cloud ECS</option>
                <option value="2">ECS Cloud</option>
              </select>
              {formik.touched.company_id && formik.errors.company_id && (
                <div className="error text-danger">
                  <small>{formik.errors.company_id}</small>
                </div>
              )}
            </div>
            <div className="col-md-4 col-12 mb-5">
              <label className="form-label">
                Helper Name<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-md-8 col-12 mb-5">
              <select
                type="text"
                className={`form-select ${
                  formik.touched.helper_id && formik.errors.helper_id
                    ? "is-invalid"
                    : ""
                }`}
                name="helper_id"
                onBlur={formik.handleBlur}
                value={formik.values.helper_id}
              >
                <option></option>
                <option value="1">Saran</option>
                <option value="2">Ramesh</option>
              </select>
              {formik.touched.helper_id && formik.errors.helper_id && (
                <div className="error text-danger">
                  <small>{formik.errors.helper_id}</small>
                </div>
              )}
            </div>
            <div className="col-md-4 col-12 mb-5">
              <label className="form-label">
                Account Number<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-md-8 col-12 mb-5">
              <input
                type="text"
                className={`form-control ${
                  formik.touched.ac_number && formik.errors.ac_number
                    ? "is-invalid"
                    : ""
                }`}
                name="ac_number"
                onBlur={formik.handleBlur}
                value={formik.values.ac_number}
              />
              {formik.touched.ac_number && formik.errors.ac_number && (
                <div className="error text-danger">
                  <small>{formik.errors.ac_number}</small>
                </div>
              )}
            </div>
            <div className="col-md-4 col-12 mb-5">
              <label className="form-label">
                Account Type<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-md-8 col-12 mb-5">
              <input
                type="text"
                className={`form-control ${
                  formik.touched.ac_type && formik.errors.ac_type
                    ? "is-invalid"
                    : ""
                }`}
                name="ac_type"
                onBlur={formik.handleBlur}
                value={formik.values.ac_type}
              />
              {formik.touched.ac_type && formik.errors.ac_type && (
                <div className="error text-danger">
                  <small>{formik.errors.ac_type}</small>
                </div>
              )}
            </div>
            <div className="col-md-4 col-12 mb-5">
              <label className="form-label">
                Online Payment<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-md-8 col-12 mb-5">
              <input
                type="text"
                className={`form-control ${
                  formik.touched.online_pay_id && formik.errors.online_pay_id
                    ? "is-invalid"
                    : ""
                }`}
                name="online_pay_id"
                onBlur={formik.handleBlur}
                value={formik.values.online_pay_id}
              />
              {formik.touched.online_pay_id && formik.errors.online_pay_id && (
                <div className="error text-danger">
                  <small>{formik.errors.online_pay_id}</small>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end p-1 mb-4 px-4">
          <div className="my-2 pe-3">
            {/* <Link to="/company">
              <button type="button " className="btn btn-sm btn-border">
                Back
              </button>
            </Link> */}
            &nbsp;&nbsp;
            <button type="submit" className="btn btn-button">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BankDetail;
