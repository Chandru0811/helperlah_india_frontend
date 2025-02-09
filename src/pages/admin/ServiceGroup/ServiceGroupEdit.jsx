import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Cropper from "react-easy-crop";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";

function ServiceGroupEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
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
    .nullable()
    .test("fileFormat", "Unsupported format", (value) => {
      if (value) return true; 
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .test("fileSize", "File size is too large. Max 2MB.", (value) => {
      if (value) return true;
      return value.size <= MAX_FILE_SIZE;
    });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("*Name is required"),
    order: Yup.string().required("*Order is required"),
    base_price: Yup.number()
      .typeError("*Basic Price must be number")
      .required("*Basic Price is required")
      .positive("*Please enter a valid number")
      .integer("*Basic Price must be a whole number"),
    image: imageValidation,
    description: Yup.string()
      .required("*Description is a required field")
      .max(200, "*The maximum length is 200 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      order: "",
      base_price: "",
      image: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoadIndicator(true);

      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", values.name);
      formData.append("slug", values.slug);
      formData.append("description", values.description);
      if (values.image) {
        if (values.image instanceof File || values.image instanceof Blob) {
          formData.append("image", values.image);
        }
      }
      formData.append("order", values.order);
      formData.append("base_price", values.base_price);
      try {
        const response = await api.post(
          `serviceGroup/update/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/servicegroup");
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

  const scrollToError = (errors) => {
    const errorField = Object.keys(errors)[0];
    const errorElement = document.querySelector(`[name="${errorField}"]`);
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      errorElement.focus();
    }
  };

  useEffect(() => {
    if (formik.submitCount > 0 && Object.keys(formik.errors).length > 0) {
      scrollToError(formik.errors);
    }
  }, [formik.submitCount, formik.errors]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`serviceGroup/${id}`);
        formik.setValues(response.data.data);
        setPreviewImage(`${ImageURL}${response.data.data.image}`);
      } catch (error) {
        toast.error("Error Fetching Data", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (event) => {
    const file = event?.target?.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size is too large. Max 2MB.");
        event.target.value = null;
        formik.setFieldValue("image", null);
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

      if (file.size > MAX_FILE_SIZE) {
        formik.setFieldError(`image`, "File size is too large. Max 2MB.");
      }
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getCroppedImg = (imageSrc, crop, croppedAreaPixels) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
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

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          blob.name = "croppedImage.jpeg";
          resolve(blob);
        }, "image/jpeg");
      };
    });
  };

  const handleCropSave = async () => {
    try {
      const croppedImageBlob = await getCroppedImg(
        imageSrc,
        crop,
        croppedAreaPixels
      );
      const file = new File([croppedImageBlob], originalFileName, {
        type: originalFileType,
      });

      formik.setFieldValue("image", file);
      const croppedImageURL = URL.createObjectURL(croppedImageBlob);
      setPreviewImage(croppedImageURL);
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

  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

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
          <Link to="/servicegroup" className="custom-breadcrumb">
            &nbsp;Service Group
          </Link>
          <span className="breadcrumb-separator"> &gt; </span>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          &nbsp;Service Group Edit
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
              <span className="me-2 text-muted">Edit Service Group</span>
            </div>
            <div className="my-2 pe-3 d-flex align-items-center">
              <Link to="/servicegroup">
                <button type="button " className="btn btn-sm btn-border">
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
            <div className="container-fluid px-4">
              <div className="row py-4">
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
                    <div className="invalid-feedback">
                      {formik.errors.order}
                    </div>
                  )}
                </div>
                <div className="col-md-6 col-12 mb-3">
                  <label className="form-label">
                    Basic Price<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.base_price && formik.errors.base_price
                        ? "is-invalid"
                        : ""
                    }`}
                    {...formik.getFieldProps("base_price")}
                  />
                  {formik.touched.base_price && formik.errors.base_price && (
                    <div className="invalid-feedback">
                      {formik.errors.base_price}
                    </div>
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
                    <div className="invalid-feedback">
                      {formik.errors.image}
                    </div>
                  )}

                  {previewImage && (
                    <div className="my-3">
                      <img
                        src={previewImage}
                        alt="Selected"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </div>
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
          )}
        </div>
      </form>
    </div>
  );
}

export default ServiceGroupEdit;
