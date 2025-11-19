import './UploadImage.css';

const UploadImage = ({ selectedImage, onImageUpload, label = "Upload Animal Image" }) => {
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageUpload(URL.createObjectURL(file));
    }
  };

  return (
    <div className="upload-image-container">
      <label className="upload-image-label">{label}</label>
      <div className="upload-image-section">
        <label className="upload-image-placeholder">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="upload-image-input"
            hidden
          />
          {selectedImage ? (
            <div className="upload-image-preview">
              <img 
                src={selectedImage} 
                alt="Selected animal" 
                className="upload-image-preview-img"
              />
              <span className="upload-image-change-text">Change Image</span>
            </div>
          ) : (
            <span className="upload-image-text">{label}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default UploadImage;