import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
import fetchAllOfferWithIds from "../../List/OfferList";
import fetchAllServiceGroupAndServiceWithIds from "../../List/ServiceGroupAndServiceList";

function SubscriptionEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [offers, setOffers] = useState(null);
  const [serviceData, setServiceData] = useState([]);

  const [initialValues, setInitialValues] = useState({
    selected_id: "",
    type: "",
    name: "",
    slug: "",
    description: "",
    start_date: "",
    end_date: "",
    recurrence: "",
    additional_specs: {
      property_type: "",
      property_size: "",
      cleaning_hours: "",
    },
    range: "",
    price: "",
    offer_id: "",
  });

  const validationSchema = Yup.object().shape({
    selected_id: Yup.string().required("*Service Id is required"),
    name: Yup.string().required("*Name is required"),
    start_date: Yup.string().required("*Start Date is required"),
    end_date: Yup.string().required("*End Date is required"),
    recurrence: Yup.string().required("*Recurrence is required"),
    additional_specs: Yup.object().shape({
      property_type: Yup.string().required("*Property Type is required"),
      property_size: Yup.string().required("*Property Size is required"),
      cleaning_hours: Yup.string().required("*Cleaning Hours is required"),
    }),
    range: Yup.string().required("*Range is required"),
    price: Yup.number()
      .typeError("*Price must be a number")
      .required("*Price is required")
      .positive("*Please enter a valid number"),
    description: Yup.string().max(200, "*The maximum length is 200 characters"),
    offer_id: Yup.string().notRequired(),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      const selectedService = serviceData.find(
        (service) => service.uniqueId === values.selected_id
      );
      const type = selectedService ? selectedService.type : "";
      const actualId = Number(values.selected_id.split("-")[0]);
      const formattedSelectedId = type === "service" ? [actualId] : actualId;

      const payload = {
        ...values,
        selected_id: formattedSelectedId,
        type,
      };

      try {
        const response = await api.put(`subscription/update/${id}`, payload);
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/subscription");
        } else {
          toast.error(response.data.message);
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
          toast.error("An error occurred while updating the record.");
        }
      } finally {
        setLoadIndicator(false);
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get(`subscription/${id}`);
        const data = response.data.data;

        let specs = {
          property_type: "",
          property_size: "",
          cleaning_hours: "",
        };
        if (data.additional_specs) {
          specs = JSON.parse(data.additional_specs);
        }

        let selectedId = "";
        if (data.service_group_id) {
          selectedId = `${data.service_group_id}-servicesGroup`;
        } else if (data.service_id) {
          let serviceId = data.service_id;

          if (
            typeof serviceId === "string" &&
            serviceId.startsWith("[") &&
            serviceId.endsWith("]")
          ) {
            serviceId = serviceId.slice(1, -1);
            serviceId = parseInt(serviceId, 10);
          }

          selectedId = `${serviceId}-service`;
        }

        setInitialValues({
          selected_id: selectedId,
          name: data.name || "",
          slug: data.slug || "",
          description: data.description || "",
          start_date: data.start_date || "",
          end_date: data.end_date || "",
          recurrence: data.recurrence || "",
          additional_specs: specs,
          range: data.range || "",
          price: data.price || "",
          offer_id: data.offer_id ? data.offer_id.toString() : "",
        });
      } catch (error) {
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [serviceDataRes, offerData] = await Promise.all([
        fetchAllServiceGroupAndServiceWithIds(),
        fetchAllOfferWithIds(),
      ]);
      const uniqueServiceData = serviceDataRes.map((item) => ({
        ...item,
        uniqueId: `${item.id}-${item.type}`,
      }));
      setServiceData(uniqueServiceData);
      setOffers(offerData);
    } catch (error) {
      toast.error(error.message || "Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
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
          <Link to="/subscription" className="custom-breadcrumb">
            &nbsp;Subscription
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Subscription Edit
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
              <span className="me-2 text-muted">Edit Subscription</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to="/subscription">
                <button type="button" className="btn btn-sm btn-border">
                  Back
                </button>
              </Link>
              &nbsp;&nbsp;
              <button
                type="submit"
                className="btn btn-button btn-sm"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Update
              </button>
            </div>
          </div>
          {loading ? (
            <div className="loader-container">
              <div className="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : (
            <>
              <div className="container-fluid px-4">
                <div className="row py-4">
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">Service Id</label>
                    <select
                      name="selected_id"
                      value={formik.values.selected_id}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        formik.setFieldValue("selected_id", selectedId);
                        const selectedService = serviceData.find(
                          (service) => service.uniqueId === selectedId
                        );
                        formik.setFieldValue(
                          "type",
                          selectedService ? selectedService.type : ""
                        );
                      }}
                      className={`form-select ${
                        formik.touched.selected_id && formik.errors.selected_id
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <option value="">Select Service</option>
                      {serviceData &&
                        serviceData.map((data) => (
                          <option key={data.uniqueId} value={data.uniqueId}>
                            {data.name} - {data.type}
                          </option>
                        ))}
                    </select>
                    {formik.touched.selected_id &&
                      formik.errors.selected_id && (
                        <div className="invalid-feedback">
                          {formik.errors.selected_id}
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={`form-control ${
                        formik.touched.name && formik.errors.name
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("name")}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="invalid-feedback">
                        {formik.errors.name}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Start Date<span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className={`form-control ${
                        formik.touched.start_date && formik.errors.start_date
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("start_date")}
                    />
                    {formik.touched.start_date && formik.errors.start_date && (
                      <div className="invalid-feedback">
                        {formik.errors.start_date}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      End Date<span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className={`form-control ${
                        formik.touched.end_date && formik.errors.end_date
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("end_date")}
                    />
                    {formik.touched.end_date && formik.errors.end_date && (
                      <div className="invalid-feedback">
                        {formik.errors.end_date}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Recurrence<span className="text-danger">*</span>
                    </label>
                    <select
                      aria-label="Default select example"
                      className={`form-select ${
                        formik.touched.recurrence && formik.errors.recurrence
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("recurrence")}
                    >
                      <option value=""></option>
                      <option value="Weekly">Weekly</option>
                      <option value="Alternate Week">Alternate Week</option>
                    </select>
                    {formik.touched.recurrence && formik.errors.recurrence && (
                      <div className="invalid-feedback">
                        {formik.errors.recurrence}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Property Type<span className="text-danger">*</span>
                    </label>
                    <select
                      aria-label="Default select example"
                      className={`form-select ${
                        formik.touched.additional_specs?.property_type &&
                        formik.errors.additional_specs?.property_type
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps(
                        "additional_specs.property_type"
                      )}
                    >
                      <option value=""></option>
                      <option value="Office">Office</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Residential">Residential</option>
                    </select>
                    {formik.touched.additional_specs?.property_type &&
                      formik.errors.additional_specs?.property_type && (
                        <div className="invalid-feedback">
                          {formik.errors.additional_specs?.property_type}
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Property Size<span className="text-danger">*</span>
                    </label>
                    <select
                      aria-label="Default select example"
                      className={`form-select ${
                        formik.touched.additional_specs?.property_size &&
                        formik.errors.additional_specs?.property_size
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps(
                        "additional_specs.property_size"
                      )}
                    >
                      <option value=""></option>
                      <option value="Below 100 sqm">Below 100 sqm</option>
                      <option value="100 - 500 sqm">100 - 500 sqm</option>
                      <option value="Above 500 sqm">Above 500 sqm</option>
                    </select>
                    {formik.touched.additional_specs?.property_size &&
                      formik.errors.additional_specs?.property_size && (
                        <div className="invalid-feedback">
                          {formik.errors.additional_specs?.property_size}
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Cleaning Hours<span className="text-danger">*</span>
                    </label>
                    <select
                      aria-label="Default select example"
                      className={`form-select ${
                        formik.touched.additional_specs?.cleaning_hours &&
                        formik.errors.additional_specs?.cleaning_hours
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps(
                        "additional_specs.cleaning_hours"
                      )}
                    >
                      <option value=""></option>
                      {Array.from({ length: 12 }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                    {formik.touched.additional_specs?.cleaning_hours &&
                      formik.errors.additional_specs?.cleaning_hours && (
                        <div className="invalid-feedback">
                          {formik.errors.additional_specs.cleaning_hours}
                        </div>
                      )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Range<span className="text-danger">*</span>
                    </label>
                    <select
                      aria-label="Default select example"
                      className={`form-select ${
                        formik.touched.range && formik.errors.range
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("range")}
                    >
                      <option value=""></option>
                      <option value="Short">Short</option>
                      <option value="Medium">Medium</option>
                      <option value="Long">Long</option>
                    </select>
                    {formik.touched.range && formik.errors.range && (
                      <div className="invalid-feedback">
                        {formik.errors.range}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">Offers</label>
                    <select
                      type="text"
                      className={`form-select ${
                        formik.touched.offer_id && formik.errors.offer_id
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("offer_id")}
                    >
                      <option selected></option>
                      {offers &&
                        offers.map((data) => (
                          <option key={data.id} value={data.id}>
                            {data.coupon_code}
                          </option>
                        ))}
                    </select>
                    {formik.touched.offer_id && formik.errors.offer_id && (
                      <div className="invalid-feedback">
                        {formik.errors.offer_id}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">
                      Price<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        formik.touched.price && formik.errors.price
                          ? "is-invalid"
                          : ""
                      }`}
                      {...formik.getFieldProps("price")}
                    />
                    {formik.touched.price && formik.errors.price && (
                      <div className="invalid-feedback">
                        {formik.errors.price}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 col-12 mb-3">
                    <label className="form-label">Description</label>
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
                    {formik.touched.description &&
                      formik.errors.description && (
                        <div className="invalid-feedback">
                          {formik.errors.description}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default SubscriptionEdit;
