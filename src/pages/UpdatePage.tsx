import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiService from "../services/apiService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface UpdateFormValues {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  remark: string;
}

const UpdatePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState<UpdateFormValues | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (id) {
          const response = await apiService.getUserById(id);
          const userData = response.data;

          const transformedData: UpdateFormValues = {
            title: userData.title || "",
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            dateOfBirth: userData.dateOfBirth
              ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
              : "",
            gender: userData.gender || "",
            remark: userData.remark || "",
          };

          setInitialData(transformedData);
        }
      } catch (error) {
        toast.warning("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const formik = useFormik<UpdateFormValues>({
    initialValues: initialData || {
      title: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      remark: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      dateOfBirth: Yup.date().required("Required"),
      gender: Yup.string().required("Required"),
      remark: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if (id) {
          const response = await apiService.updateUser(id, values);

          if (response.status) {
            toast.success(response.statusText ?? "Update success");

            resetForm();
            navigate("/view");
          } else {
            toast.error(response.statusText ?? "Update failed");
          }
        }
      } catch (error) {
        toast.error("Update failed");
      }
    },
  });

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <Link to="/view" className="btn btn-secondary">
          Back
        </Link>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-light">
              <h3 className="text-center">Update User</h3>
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <div className="d-flex gap-3">
                    <div className="form-check">
                      <input
                        type="radio"
                        id="titleMr"
                        name="title"
                        value="Mr"
                        className="form-check-input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.title === "Mr"}
                      />
                      <label htmlFor="titleMr" className="form-check-label">
                        Mr
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="titleMrs"
                        name="title"
                        value="Mrs"
                        className="form-check-input"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.title === "Mrs"}
                      />
                      <label htmlFor="titleMrs" className="form-check-label">
                        Mrs
                      </label>
                    </div>
                  </div>
                  {formik.touched.title && formik.errors.title ? (
                    <div className="text-danger">{formik.errors.title}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`form-control ${
                      formik.touched.firstName && formik.errors.firstName
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="invalid-feedback">
                      {formik.errors.firstName}
                    </div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`form-control ${
                      formik.touched.lastName && formik.errors.lastName
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="invalid-feedback">
                      {formik.errors.lastName}
                    </div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className={`form-control ${
                      formik.touched.dateOfBirth && formik.errors.dateOfBirth
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.dateOfBirth}
                  />
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                    <div className="invalid-feedback">
                      {formik.errors.dateOfBirth}
                    </div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className={`form-select ${
                      formik.touched.gender && formik.errors.gender
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender ? (
                    <div className="invalid-feedback">
                      {formik.errors.gender}
                    </div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="remark" className="form-label">
                    Remark
                  </label>
                  <textarea
                    id="remark"
                    name="remark"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.remark}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Updating..." : "Update"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
