import React, { useState, useEffect, useCallback } from "react";
import { FaUpload, FaTimes, FaFileImage, FaFolder } from "react-icons/fa";

const steps = [
  "Analyzing radiograph...",
  "Detecting diseases...",
  "Performing deep learning...",
];

const sampleImages = [
  "normal_1.jpg",
  "normal_2.jpg",
  "lung_opacity_1.jpg",
  "lung_opacity_2.jpg",
  "pneumonia_1.jpg",
  "pneumonia_2.jpg",
];

const UploadSection = ({ setResult, setLoadingStep }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showSampleImages, setShowSampleImages] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFile(file);
    }
  }, []);

  const handleFile = (file) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Add useEffect for cleaning up object URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSampleSelect = async (filename) => {
    try {
      const response = await fetch(`/samples/${filename}`);
      const blob = await response.blob();
      const file = new File([blob], filename, { type: blob.type });
      handleFile(file);
      setShowSampleImages(false);
    } catch (error) {
      alert("Failed to load sample image");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image");

    setResult(null);

    // Fake progressive loading effect
    for (const step of steps) {
      setLoadingStep(step);
      await new Promise((res) => setTimeout(res, 1000));
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Failed to fetch prediction");
    } finally {
      setLoadingStep(null);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-3xl">
      {/* Sample Images Button */}
      <button
        onClick={() => setShowSampleImages(true)}
        className="fixed -bottom-2 left-4 flex flex-row items-center gap-2 bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
      >
        <FaFolder className="w-4 h-4" /> Sample
      </button>

      {/* Sample Images Modal */}
      {showSampleImages && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowSampleImages(false)}
        >
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Sample Images</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sampleImages.map((filename) => (
                <div
                  key={filename}
                  className="relative group cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSampleSelect(filename);
                  }}
                >
                  <img
                    src={`/samples/${filename}`}
                    alt="Sample"
                    className="w-full h-32 object-cover rounded-lg shadow-md group-hover:opacity-75 transition-opacity"
                    onError={(e) =>
                      console.error("Failed to load:", filename, e.target.src)
                    }
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      Select
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        className={`relative border-2 border-dashed ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-blue-300"
        } rounded-xl p-8 w-full transition-all duration-200`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
          className="hidden"
          id="file-upload"
        />

        {previewUrl ? (
          <div className="flex flex-col items-center space-y-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-[250px] max-h-[250px] md:max-w-[500px] md:max-h-[500px] object-contain rounded-lg shadow-lg cursor-zoom-in mb-4"
              onClick={() => setIsZoomed(true)}
            />
            <p className="text-sm text-gray-600 font-medium">{file.name}</p>
          </div>
        ) : (
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center space-y-4 cursor-pointer"
          >
            <FaFileImage className="w-12 h-12 text-blue-400" />
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-700">
                Drag and drop or click to upload
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supported formats: JPEG, PNG
              </p>
            </div>
          </label>
        )}
      </div>

      {isZoomed && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-full max-h-full">
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute -top-14 -right-2 text-blue-400 border-2 rounded-full shadow-inner border-blue-400 hover:text-white p-2  transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            <img
              src={previewUrl}
              alt="Zoomed Preview"
              className="max-w-full w-md h-md max-h-full object-contain rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg flex items-center gap-2 transition-transform hover:scale-105"
      >
        <FaUpload className="w-5 h-5" /> Analyze Image
      </button>
    </div>
  );
};

export default UploadSection;
