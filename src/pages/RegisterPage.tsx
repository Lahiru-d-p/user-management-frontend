import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiService from "../services/apiService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface RegisterFormValues {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  password: string;
  remark: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      title: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      remark: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      dateOfBirth: Yup.date().required("Required"),
      gender: Yup.string().required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      remark: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await apiService.registerUser(values);

        toast.success("User registered successfully!");
        resetForm();
        navigate("/login");
      } catch (error) {
        toast.error("Registration failed");
      }
    },
  });

  return (
    <div className="container mt-5">
      <div className="text-end mb-3">
        <Link to="/login" className="btn btn-secondary">
          Login
        </Link>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Register</h3>
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
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {formik.touched.gender && formik.errors.gender ? (
                    <div className="invalid-feedback">
                      {formik.errors.gender}
                    </div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="invalid-feedback">
                      {formik.errors.password}
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
                  {formik.isSubmitting ? "Registering..." : "Register"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
