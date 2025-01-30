import { useState } from "react";
import logo from "../../../assets/Logo_3_Final_7.png";
import PlayStore from "../../../assets/play_store_badge.png";
import AppStore from "../../../assets/app_store_badge.png";
import { FaLocationDot } from "react-icons/fa6";
import { IoCloseSharp, IoMail } from "react-icons/io5";
import { FiAlertTriangle, FiPlus } from "react-icons/fi";
import { FaPhoneAlt } from "react-icons/fa";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import { useNavigate } from "react-router-dom";

function Company() {
  const navigate = useNavigate();
  const [loadIndicator, setLoadIndicator] = useState(false);
  const vendor_id = localStorage.getItem("vendor_id");
  const [fields, setFields] = useState([{ experience: "", service: "" }]);

  const validationSchema = Yup.object().shape({
    company_name: Yup.string().required("*Company Name is required"),
    owner_name: Yup.string().required("*Owner Name is required"),
    address: Yup.string().required("*Address is required"),
    nationality: Yup.string().required("*Nationality is required"),
    citizenship: Yup.string().required("*Citizenship is required"),
    company_registration_no: Yup.string().required(
      "*Company Registration No is required"
    ),
    no_of_employees: Yup.string().required("*No of Employees is required"),
    services_offering: Yup.string().required("*Services Offering is required"),
    // availablity: Yup.string().required("*Availablity is required"),
    working_hrs: Yup.string().required("*Working Hrs is required"),
    // providing_services: Yup.string().required(
    //   "*Providing Services is required"
    // ),
    payment_mode: Yup.string().required("*Payment Mode is required"),
    email: Yup.string()
      .required("*Email is required")
      .email("*Invalid email format"),
    mobile: Yup.number()
      .typeError("*Phone Number must be a number")
      .required("**Phone Number is required")
      .positive("*Please enter a valid number")
      .integer("**Phone Number must be a whole number"),
  });

  const formik = useFormik({
    initialValues: {
      vendor_id: vendor_id,
      company_name: "",
      owner_name: "",
      address: "",
      mobile: "",
      email: "",
      nationality: "",
      citizenship: "",
      company_registration_no: "",
      no_of_employees: "",
      services_offering: "",
      // availablity: [],
      working_hrs: "",
      providing_services: {},
      payment_mode: "",
      other_details: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      const availability = ["Monday", "Wednesday", "Friday"];

      const providing_services = fields.reduce((acc, field) => {
        if (field.service && field.experience) {
          acc[field.service] = field.experience;
        }
        return acc;
      }, {});

      const payload = {
        ...values,
        availablity: availability,
        providing_services,
      };
      try {
        const response = await api.post(
          `vendor/register/company/${vendor_id}`,
          payload
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/company");
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
          toast.error("An error occurred while deleting the record.");
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
    <>
      {/* ==== NAV bar ==== */}
      <section className="header">
        <nav className="navbar navbar-expand-lg py-0 px-0">
          <div className="container-fluid px-0 py-md-2 py-lg-0 py-2">
            <a
              href="/"
              className="text-light text-decoration-none ps-2 ps-md-3 d-flex align-items-center"
            >
              <img
                src={logo}
                alt="Logo"
                className="me-2 my-1 my-md-2 img-fluid"
                style={{ height: "60px" }}
              />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto me-3 text-light ps-2">
                <li className="nav-item pe-3">
                  <a className="nav-link active" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item pe-3">
                  <a className="nav-link active" href="#">
                    Services
                  </a>
                </li>
                <li className="nav-item pe-3">
                  <a className="nav-link active" href="#">
                    Join as partner
                  </a>
                </li>
                <li className="nav-item pe-3">
                  <a className="nav-link active" href="#">
                    Cantact Us
                  </a>
                </li>
                <li className="nav-item pe-3">
                  <a className="nav-link active" href="#">
                    Blog
                  </a>
                </li>
                <li className="nav-item pe-3">
                  <a className="nav-link active" href="#">
                    Login/Register
                  </a>
                </li>
                <li className="nav-item pe-3">
                  <a className="nav-link active" href="#">
                    <i className="fas fa-bell"></i>
                  </a>
                </li>
              </ul>
              <div className="py-5 num text-center">
                <a href="tel:+6588941306" className="text-decoration-none">
                  <button
                    className="btn register_button mx-3 mx-md-0 mx-lg-3 text-light"
                    type="button"
                  >
                    <i className="fas fa-phone me-1"></i> +65 88941306
                  </button>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </section>

      <section className="container-fluid px-0">
        {/* <!--==== Hero Section ====-->  */}
        <section
          className="partner_top"
          style={{ paddingTop: "80px", paddingBottom: "30px" }}
        >
          <div className="cta-container pb-5">
            <h1 className="h1-tag pt-5 pb-4">
              Earn More, Join as Helper Partner Today !
            </h1>
            <h2 className="h2-tag">
              Need more reasons to be happy? Join us and we promise you will
              have a lot
            </h2>
          </div>

          <div className="container text-end mt-5 pe-1 pe-md-0 pt-5">
            <img src={PlayStore} alt="Play store" className="link_img me-4" />
            <img src={AppStore} alt="App store" className="link_img" />
          </div>
        </section>

        {/* <!--==== Application Section Start ====-->  */}
        <section className="form-container">
          <div className="container">
            <h3 className="text-center my-5 py-5">
              Please enter the necessary details to process your application
            </h3>
            <div className="container custum-width">
              <div className="row d-flex justify-content-between">
                <div className="col-md-5 col-12 mb-3">
                  <input
                    type="text"
                    className={`form-control form-control-lg w-100 my-3 ${
                      formik.touched.company_name && formik.errors.company_name
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Company Name"
                    {...formik.getFieldProps("company_name")}
                  />
                  {formik.touched.company_name &&
                    formik.errors.company_name && (
                      <div className="invalid-feedback">
                        {formik.errors.company_name}
                      </div>
                    )}
                </div>
                <div className="col-md-5 col-12 mb-3">
                  <input
                    type="text"
                    className={`form-control form-control-lg w-100 my-3 ${
                      formik.touched.owner_name && formik.errors.owner_name
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Owner Name"
                    {...formik.getFieldProps("owner_name")}
                  />
                  {formik.touched.owner_name && formik.errors.owner_name && (
                    <div className="invalid-feedback">
                      {formik.errors.owner_name}
                    </div>
                  )}
                </div>
                <div className="col-md-5 col-12 mb-3">
                  <input
                    type="text"
                    className={`form-control form-control-lg w-100 my-3 ${
                      formik.touched.mobile && formik.errors.mobile
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Phone Number"
                    {...formik.getFieldProps("mobile")}
                  />
                  {formik.touched.mobile && formik.errors.mobile && (
                    <div className="invalid-feedback">
                      {formik.errors.mobile}
                    </div>
                  )}
                </div>
                <div className="col-md-5 col-12 mb-3">
                  <input
                    type="email"
                    className={`form-control form-control-lg w-100 my-3 ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="col-md-12 col-12 mb-3">
                  <textarea
                    type="text"
                    className={`form-control form-control-lg w-100 my-3 ${
                      formik.touched.address && formik.errors.address
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Address"
                    {...formik.getFieldProps("address")}
                    rows="8"
                  ></textarea>
                  {formik.touched.address && formik.errors.address && (
                    <div className="invalid-feedback">
                      {formik.errors.address}
                    </div>
                  )}
                </div>
                <div className="col-md-5 col-12 mb-3">
                  <select
                    type="text"
                    className={`form-select form-select-lg w-100 my-3 custom-select ${
                      formik.touched.citizenship && formik.errors.citizenship
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{ fontSize: "90%" }}
                    {...formik.getFieldProps("citizenship")}
                  >
                    <option value="">Select a Nation</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Malaysia">Malaysia</option>
                  </select>
                  {formik.touched.citizenship && formik.errors.citizenship && (
                    <div className="invalid-feedback">
                      {formik.errors.citizenship}
                    </div>
                  )}
                </div>
                <div className="col-md-5 col-12 mb-3">
                  <select
                    type="text"
                    className={`form-select form-select-lg w-100 my-3 custom-select ${
                      formik.touched.nationality && formik.errors.nationality
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{ fontSize: "90%" }}
                    {...formik.getFieldProps("nationality")}
                  >
                    <option value="">Select a Nationality</option>
                    <option value="Singaporen">Singaporen</option>
                    <option value="Singaporen PR">Singaporen PR</option>
                  </select>
                  {formik.touched.nationality && formik.errors.nationality && (
                    <div className="invalid-feedback">
                      {formik.errors.nationality}
                    </div>
                  )}
                </div>
                <div className="col-md-5 col-12 mb-3">
                  <input
                    type="text"
                    className={`form-control form-control-lg w-100 my-3 ${
                      formik.touched.company_registration_no &&
                      formik.errors.company_registration_no
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Company Registration Number"
                    {...formik.getFieldProps("company_registration_no")}
                  />
                  {formik.touched.company_registration_no &&
                    formik.errors.company_registration_no && (
                      <div className="invalid-feedback">
                        {formik.errors.company_registration_no}
                      </div>
                    )}
                </div>
                <div className="col-md-5 col-12 mb-3">
                  <input
                    type="text"
                    className={`form-control form-control-lg w-100 my-3 ${
                      formik.touched.no_of_employees &&
                      formik.errors.no_of_employees
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="No of Employees  pledging"
                    {...formik.getFieldProps("no_of_employees")}
                  />
                  {formik.touched.no_of_employees &&
                    formik.errors.no_of_employees && (
                      <div className="invalid-feedback">
                        {formik.errors.no_of_employees}
                      </div>
                    )}
                </div>
                <div className="col-md-5 col-12 mb-3"></div>
                <div className="col-md-12 col-12 mb-3">
                  <textarea
                    type="text"
                    className={`form-control form-control-lg w-100 my-3 ${
                      formik.touched.services_offering &&
                      formik.errors.services_offering
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Services offering"
                    {...formik.getFieldProps("services_offering")}
                    rows="8"
                  ></textarea>
                  {formik.touched.services_offering &&
                    formik.errors.services_offering && (
                      <div className="invalid-feedback">
                        {formik.errors.services_offering}
                      </div>
                    )}
                </div>
                <div className="col-md-12 col-12 mb-3">
                  <textarea
                    type="text"
                    className={`form-control form-control-lg w-100 my-3 ${
                      formik.touched.availablity && formik.errors.availablity
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Availability"
                    {...formik.getFieldProps("availablity")}
                    rows="8"
                  ></textarea>
                  {formik.touched.availablity && formik.errors.availablity && (
                    <div className="invalid-feedback">
                      {formik.errors.availablity}
                    </div>
                  )}
                </div>
                <div className="col-md-12 col-12 mb-3">
                  <textarea
                    type="text"
                    className={`form-control form-control-lg w-100 my-3 ${
                      formik.touched.working_hrs && formik.errors.working_hrs
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Working Hours"
                    {...formik.getFieldProps("working_hrs")}
                    rows="8"
                  ></textarea>
                  {formik.touched.working_hrs && formik.errors.working_hrs && (
                    <div className="invalid-feedback">
                      {formik.errors.working_hrs}
                    </div>
                  )}
                </div>
              </div>
              {/* <!--==== Service Offered Start ====--> */}
              <div className="row">
                <div className="col-12 mb-2 mt-5">
                  <h4 className="text-start">Services Offered</h4>
                </div>
                {fields.map((field, index) => (
                  <div className="row mb-3" key={index}>
                    <div className="col-5">
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
                    <div className="col-1 d-flex justify-content-start align-items-center">
                      <p className="fs-4"></p>
                    </div>
                    <div className="col-5">
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
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={handleAddField}
                        >
                          <FiPlus style={{ fontSize: "20px" }} />
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                <div className="col-md-5 col-12 mb-3">
                  <select
                    type="text"
                    className={`form-select form-select-lg w-100 my-3 custom-select ${
                      formik.touched.payment_mode && formik.errors.payment_mode
                        ? "is-invalid"
                        : ""
                    }`}
                    style={{ fontSize: "90%" }}
                    {...formik.getFieldProps("payment_mode")}
                  >
                    <option value="">Select a Payment Mode</option>
                    <option value="1">Cash</option>
                    <option value="2">UPI</option>
                    <option value="3">Bank Tranfer</option>
                  </select>
                  {formik.touched.payment_mode &&
                    formik.errors.payment_mode && (
                      <div className="invalid-feedback">
                        {formik.errors.payment_mode}
                      </div>
                    )}
                </div>
                <div className="col-md-5 col-12"></div>
                <div className="col-md-12 col-12 mb-3">
                  <textarea
                    type="text"
                    className={`form-control form-control-lg w-100 my-3 ${
                      formik.touched.other_details &&
                      formik.errors.other_details
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder="Other Details"
                    {...formik.getFieldProps("other_details")}
                    rows="8"
                  ></textarea>
                  {formik.touched.other_details &&
                    formik.errors.other_details && (
                      <div className="invalid-feedback">
                        {formik.errors.other_details}
                      </div>
                    )}
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <button
                    type="submit"
                    className="fw-medium submit_btn"
                    style={{ whiteSpace: "nowrap" }}
                    onClick={formik.handleSubmit}
                    disabled={loadIndicator}
                  >
                    {loadIndicator && (
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                      ></span>
                    )}
                    Submit
                  </button>
                </div>
              </div>
              {/* <!--==== Service Offered End ====--> */}
            </div>
          </div>
        </section>

        {/* <!-- FAQ and CTA Start --> */}
        <div className="container">
          <div className="row mt-0 mt-md-5">
            <div className="col-12 my-5 d-flex justify-content-center">
              <h2 className="text-ff4397 py-5">Frequently Asked Questions</h2>
            </div>
            <div className="col-12 accorardian">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item mb-3 mb-md-5">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      What types of cleaning services do you offer?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      We offer a variety of cleaning services, including general
                      home cleaning, deep cleaning, kitchen cleaning, bathroom
                      cleaning, and move-in/move-out cleaning.
                    </div>
                  </div>
                </div>
                {/* <!-- Accordion Item 2 --> */}
                <div className="accordion-item mb-3 mb-md-5">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Do I need to provide cleaning supplies?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      No, our team brings all the necessary cleaning supplies
                      and equipment. If you prefer us to use your specific
                      products, just let us know during booking.
                    </div>
                  </div>
                </div>
                {/* <!-- Accordion Item 3 --> */}
                <div className="accordion-item mb-3 mb-md-5">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      How long does a cleaning session take?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      The duration of the cleaning session depends on the size
                      of your home and the type of cleaning required. A typical
                      session takes between 2 to 4 hours.
                    </div>
                  </div>
                </div>
                {/* <!-- Accordion Item 4 --> */}
                <div className="accordion-item mb-3 mb-md-5">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Are your cleaners background-checked?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Yes, all our cleaners are thoroughly vetted and
                      background-checked to ensure your safety and peace of
                      mind.
                    </div>
                  </div>
                </div>
                {/* <!-- Accordion Item 5 --> */}
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Can I reschedule or cancel a booking?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      Yes, you can reschedule or cancel your booking. Please
                      note that we require at least 24 hours notice to avoid
                      cancellation fees.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container my-3 my-md-5">
          <div className="card bottom_card py-4 px-2">
            <div className="row">
              <div className="col-md-1 col-12 pe-0"></div>
              <div className="col-md-7 col-12 py-2 py-md-4 ps-4 ps-md-0 pe-3 pe-md-0">
                <p className="text-light fw-small bottom_card_ptag">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
              <div className="col-md-4 py-4 py-md-0 pe-0 pe-md-4 pe-lg-0 col-lg-3 col-12 d-flex justify-content-md-end justify-content-center align-items-center">
                <img
                  src={PlayStore}
                  alt="Play store"
                  className="link_img me-3"
                />
                <img src={AppStore} alt="App store" className="link_img" />
              </div>
              <div className="col-md-1 col-12"></div>
            </div>
          </div>
        </div>
        {/* <!-- FAQ and CTA End --> */}

        {/* <!--==== Footer Section ====--> */}
        <section className="container-fluid footer">
          <div className="container">
            <div className="row m-0 m-0">
              <div className="col-md-4 col-12 text-md-start text-center mt-4">
                <div className="ps-2">
                  <p className="footer-title">Contact</p>
                </div>
                <div className="footer-links">
                  <div className="links">
                    <a
                      href="https://www.google.com/maps/place/The+Alexcier/@1.2916847,103.8111868,17z/data=!3m2!4b1!5s0x31da1a2cf1b2be13:0x7b0f9d88a36fdfbb!4m6!3m5!1s0x31da1bb95520771b:0xf2b9dfa378aa9a6e!8m2!3d1.2916793!4d103.8137617!16s%2Fg%2F11gyxjfkjk?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D"
                      className="text-decoration-none d-flex justify-content-md-start justify-content-center align-items-center"
                      style={{ fontSize: "16px", color: "#ffffff" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div>
                        <FaLocationDot />
                        <span>
                          The Alexcier, <br />
                          237 Alexandra Road, #04-10,
                          <br />
                          Singapore-159929.
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 text-md-start text-center mt-4">
                <div className="ps-2">
                  <p className="footer-title">Email</p>
                </div>
                <div className="footer-links">
                  <div className="links">
                    <a
                      href="mailto:info@trucklah.com"
                      className="text-decoration-none"
                      style={{ fontSize: "16px", color: "#ffffff" }}
                    >
                      <IoMail />
                      info@helperlah.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 text-md-start text-center mt-4">
                <div className="ps-2">
                  <p className="footer-title">Contact</p>
                </div>
                <div className="footer-links">
                  <div className="links">
                    <a
                      href="tel:+6588941306"
                      className="text-decoration-none"
                      style={{ fontSize: "16px", color: "#ffffff" }}
                    >
                      <FaPhoneAlt />
                      +65 8894 1306
                    </a>
                  </div>
                </div>
                <div className="list-unstyled d-flex flex-wrap gap-lg-1 gap-md-0 gap-0 justify-content-center align-items-center">
                  <span>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none line-divider"
                      aria-label="Visit our facebook page"
                    >
                      <FaFacebook
                        size={50}
                        className="p-2"
                        style={{ color: "#ffff" }}
                      />
                    </a>
                  </span>
                  <span>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none line-divider"
                      aria-label="Visit our twitter page"
                    >
                      <FaTwitter
                        size={50}
                        className="p-2"
                        style={{ color: "#ffff" }}
                      />
                    </a>
                  </span>
                  <span>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none line-divider"
                      aria-label="Visit our instagram page"
                    >
                      <FaInstagram
                        size={50}
                        className="p-2"
                        style={{ color: "#ffff" }}
                      />
                    </a>
                  </span>
                  <span>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none line-divider"
                      aria-label="Visit our linkedin page"
                    >
                      <FaLinkedin
                        size={50}
                        className="p-2"
                        style={{ color: "#ffff" }}
                      />
                    </a>
                  </span>
                  <span>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none line-divider"
                      aria-label="Visit our youtube page"
                    >
                      <FaYoutube
                        size={50}
                        className="p-2"
                        style={{ color: "#ffff" }}
                      />
                    </a>
                  </span>
                  <span>
                    <a
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none line-divider"
                      aria-label="Visit our tiktok page"
                    >
                      <FaTiktok
                        size={50}
                        className="p-2"
                        style={{ color: "#ffff" }}
                      />
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr className="text-light" />
          <div className="copyrights">
            <p className="text-center text-light m-0 pb-3">
              2024 © Copyright Helperlah Pte Ltd. All Rights Reserved.
            </p>
          </div>
        </section>
        {/* <!--==== Footer End ====--> */}
      </section>
    </>
  );
}

export default Company;
