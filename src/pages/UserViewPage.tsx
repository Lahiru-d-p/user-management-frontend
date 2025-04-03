import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface Photo {
  id: number;
  file: string;
}

interface User {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  remark: string;
  userPhotos: Photo[];
}

const UserViewPage: React.FC = () => {
  const [query, setQuery] = useState<any>({});
  const [results, setResults] = useState<User[]>([]);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await apiService.searchUsers(query);
      setResults(response.data ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePhoto = async (photoId: number, userId: number) => {
    try {
      const response = await apiService.deletePhoto(photoId);
      if (response.status) {
        toast.success(response.statusText ?? "Photo deleted successfully");

        setResults([]);
        handleSearch();
      } else {
        toast.error(response.statusText ?? "Photo delete failed");
      }
    } catch (error) {
      toast.error("Failed to delete photo");
    }
  };

  const logout = async () => {
    localStorage.setItem("token", "");
  };

  return (
    <div className="container mt-5">
      <div className="text-end mb-3">
        <Link to="/" onClick={() => logout()} className="btn btn-secondary">
          Log Out
        </Link>
      </div>
      <div className="row mb-3">
        <div className="col-md-2 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            onChange={(e) => setQuery({ ...query, firstName: e.target.value })}
          />
        </div>
        <div className="col-md-2 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            onChange={(e) => setQuery({ ...query, lastName: e.target.value })}
          />
        </div>
        <div className="col-md-2 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Start Date"
            onChange={(e) => setQuery({ ...query, startDate: e.target.value })}
          />
        </div>
        <div className="col-md-2 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="End Date"
            onChange={(e) => setQuery({ ...query, endDate: e.target.value })}
          />
        </div>
        <div className="col-md-2 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Gender"
            onChange={(e) => setQuery({ ...query, gender: e.target.value })}
          />
        </div>
        <div className="col-md-2 mb-2">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Remark</th>
            <th>Update</th>
            <th>Photos</th>
          </tr>
        </thead>
        <tbody>
          {results?.map((user) => (
            <tr key={user?.id}>
              <td>{user?.title}</td>
              <td>{`${user?.firstName} ${user?.lastName}`}</td>
              <td>{moment(user?.dateOfBirth).format("YYYY-MM-DD")}</td>
              <td>{user?.gender}</td>
              <td>{user?.remark}</td>
              <td>
                <Link
                  to={`/update/${user?.id}`}
                  className="btn btn-sm btn-info"
                >
                  Edit
                </Link>
              </td>
              <td>
                {user?.userPhotos?.map((photo) => (
                  <div
                    key={photo?.id}
                    className="position-relative d-inline-block mx-1"
                  >
                    <img
                      src={photo?.file}
                      alt="User"
                      width="50"
                      className="rounded"
                    />
                    <button
                      className="btn btn-danger btn-sm position-absolute top-0 start-100 translate-middle"
                      style={{
                        fontSize: "0.75rem",
                      }}
                      onClick={() => handleDeletePhoto(photo?.id, user?.id)}
                    >
                      X
                    </button>
                  </div>
                ))}
                {user?.userPhotos?.length < 2 && (
                  <Link
                    to={`/upload/${user?.id}`}
                    className="mt-2 btn btn-sm btn-success d-flex align-items-center justify-content-center"
                    style={{ width: "5px", height: "5px", fontSize: "0.75rem" }}
                    title="Add Photo"
                  >
                    +
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserViewPage;
