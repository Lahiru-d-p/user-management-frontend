import React, { useState } from "react";
import apiService from "../services/apiService";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PhotoUploadPage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(
        (file) => file.type === "image/jpeg"
      );
      setFiles(selectedFiles);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await apiService.uploadPhotos(id ?? "0", formData);
      if (response.status) {
        toast.success(response.statusText ?? "Upload success");
        navigate("/view");
      } else {
        toast.error(response.statusText ?? "Upload failed");
      }
    } catch (error) {
      toast.error("Photo upload failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <button className="btn btn-secondary" onClick={() => navigate("/view")}>
          Back
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-light">
              <h3 className="text-center">Upload Photos</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="upload" className="form-label">
                    Select JPEG Files
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg"
                    className="form-control"
                    id="upload"
                    onChange={handleFileChange}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-success w-100"
                  onClick={handleSubmit}
                  disabled={files.length === 0}
                >
                  Upload Photos
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadPage;
