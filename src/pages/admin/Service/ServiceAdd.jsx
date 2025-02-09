import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Cropper from "react-easy-crop";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import fetchAllServiceGroupWithIds from "../../List/ServiceGroupList";
import { FiAlertTriangle } from "react-icons/fi";

function ServiceAdd() {
  const navigate = useNavigate();
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [serviceGroup, setServiceGroup] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [originalFileName, setOriginalFileName] = useState("");
  const [originalFileType, setOriginalFileType] = useState("");
  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const SUPPORTED_FORMATS = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];

  const imageValidation = Yup.mixed()
    .required("*Image is required")
    .test("fileFormat", "Unsupported format", (value) => {
      return !value || (value && SUPPORTED_FORMATS.includes(value.type));
    })
    .test("fileSize", "File size is too large. Max 2MB.", (value) => {
      return !value || (value && value.size <= MAX_FILE_SIZE);
    });

  const validationSchema = Yup.object().shape({
    service_group_id: Yup.string().required("*Service Group Id is required"),
    name: Yup.string().required("*Name is required"),
    order: Yup.string().required("*Order is required"),
    price: Yup.number()
      .typeError("*Price must be a number")
      .required("*Price is required")
      .positive("*Please enter a valid number")
      .integer("*Price must be a whole number"),
    image: imageValidation,
    description: Yup.string()
      .required("*Description is a required field")
      .max(200, "*The maximum length is 200 characters"),
  });

  const formik = useFormik({
    initialValues: {
      service_group_id: "",
      name: "",
      slug: "",
      order: "",
      price: "",
      image: null,
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);
      const formData = new FormData();
      formData.append("service_group_id", values.service_group_id);
      formData.append("name", values.name);
      formData.append("slug", values.slug);
      formData.append("description", values.description);
      if (values.image) {
        if (values.image instanceof File || values.image instanceof Blob) {
          formData.append("image", values.image);
        }
      }
      formData.append("order", values.order);
      formData.append("price", values.price);
      try {
        const response = await api.post("service", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/service");
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

  useEffect(() => {
    const slug = formik.values.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^\w-]+/g, "");
    formik.setFieldValue("slug", slug);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.name]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size is too large. Max 2MB.");
        event.target.value = null;
        formik.setFieldValue("image", null);
        return;
      }
      if (!SUPPORTED_FORMATS.includes(file.type)) {
        formik.setFieldError("image", "Unsupported format.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setOriginalFileName(file.name);
        setOriginalFileType(file.type);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const targetWidth = 300;
    const targetHeight = 300;
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      targetWidth,
      targetHeight
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          blob.name = "croppedImage.jpeg";
          resolve(blob);
        } else {
          reject(new Error("Canvas is empty"));
        }
      }, "image/jpeg");
    });
  };

  const handleCropSave = async () => {
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const file = new File([croppedImageBlob], originalFileName, {
        type: originalFileType,
      });
      formik.setFieldValue("image", file);
      setOriginalFileType(file.type);
      formik.setFieldError("image", "");
      formik.setFieldTouched("image", false);
      setShowCropper(false);
    } catch (error) {
      console.error("Error cropping the image:", error);
    }
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setImageSrc(null);
    formik.setFieldValue("image", "");
    document.querySelector("input[type='file']").value = "";
  };

  const fetchServiceGroup = async () => {
    try {
      const service = await fetchAllServiceGroupWithIds();
      setServiceGroup(service);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchServiceGroup();
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
          <Link to="/service" className="custom-breadcrumb">
            &nbsp;Service
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Service Add
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
              <span className="me-2 text-muted">Add Service</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to="/service">
                <button type="button " className="btn btn-sm btn-border">
                  Back
                </button>
              </Link>
              &nbsp;&nbsp;
              <button
                type="submit"
                className="btn btn-button"
                disabled={loadIndicator}
              >
                {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Save
              </button>
            </div>
          </div>
          <div className="container-fluid px-4">
            <div className="row py-4">
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Service Group Id<span className="text-danger">*</span>
                </label>
                <select
                  aria-label="Default select example"
                  className={`form-select ${
                    formik.touched.service_group_id &&
                    formik.errors.service_group_id
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("service_group_id")}
                >
                  <option selected></option>
                  {serviceGroup &&
                    serviceGroup.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                </select>
                {formik.touched.service_group_id &&
                  formik.errors.service_group_id && (
                    <div className="invalid-feedback">
                      {formik.errors.service_group_id}
                    </div>
                  )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
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
                  Order<span className="text-danger">*</span>
                </label>
                <select
                  aria-label="Default select example"
                  className={`form-select ${
                    formik.touched.order && formik.errors.order
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("order")}
                >
                  <option value=""></option>
                  {Array.from({ length: 50 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                {formik.touched.order && formik.errors.order && (
                  <div className="invalid-feedback">{formik.errors.order}</div>
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
                  <div className="invalid-feedback">{formik.errors.price}</div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <label className="form-label">
                  Image
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  accept=".png,.jpeg,.jpg,.svg,.webp"
                  className={`form-control ${
                    formik.touched.image && formik.errors.image
                      ? "is-invalid"
                      : ""
                  }`}
                  name="image"
                  onChange={handleFileChange}
                  onBlur={formik.handleBlur}
                />
                <p style={{ fontSize: "13px" }}>
                  Note: Maximum file size is 2MB. Allowed: .png, .jpg, .jpeg,
                  .svg, .webp.
                </p>
                {formik.touched.image && formik.errors.image && (
                  <div className="invalid-feedback">{formik.errors.image}</div>
                )}

                {showCropper && imageSrc && (
                  <div className="crop-container">
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={300 / 300}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                      cropShape="rect"
                      showGrid={false}
                    />
                  </div>
                )}

                {showCropper && (
                  <div className="d-flex justify-content-start mt-3 gap-2">
                    <button
                      type="button"
                      className="btn btn-button mt-3"
                      onClick={handleCropSave}
                    >
                      Save Cropped Image
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary mt-3"
                      onClick={handleCropCancel}
                    >
                      Cancel
                    </button>
                  </div>
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
        </div>
      </form>
    </div>
  );
}

export default ServiceAdd;
