import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiService from "../services/apiService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginValues {
  firstName: string;
  lastName: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik<LoginValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await apiService.login(values);
        if (response.status) {
          localStorage.setItem("token", response.data);
          toast.success(response.statusText ?? "User Login success");

          resetForm();
          navigate("/view");
        } else {
          toast.error(response.statusText ?? "Login failed");
        }
      } catch (error) {
        toast.error("Login failed");
      }
    },
  });

  return (
    <div className="container mt-5">
      <div className="text-end mb-3">
        <Link to="/register" className="btn btn-secondary">
          Register
        </Link>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
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
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="invalid-feedback">
                      {formik.errors.lastName}
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
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Logging in..." : "Login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
