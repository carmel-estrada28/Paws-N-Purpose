import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import Header from '../../components/Header/Header';
import './CreateDonationBox.css';

function CreateDonationBox() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goalAmount: '',
    targetDate: '',
    photoFile: null,
    photoUrl: ''
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData(prev => ({
      ...prev,
      photoFile: file,
      photoUrl: ''
    }));

    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Donation Box Data:', formData);
    navigate('/my-projects');
  };

  return (
    <div className="create-donation-box">
      <Header withColor isLoggedIn isFixed />

      <div className="create-donation-box-content">
        <button className="back-pill" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>

        <div className="donation-box-card">
          <h1>Create Donation Box</h1>

          <form onSubmit={handleSubmit}>
            <div className="donation-box-grid">

              {/* LEFT COLUMN */}
              <div>
                <label className="simple-label">Photo</label>

                {!photoPreview ? (
                  <div className="photo-dropzone">
                    <Upload size={32} />
                    <p>Upload cover photo</p>

                    <label className="upload-hidden">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>

                    <input
                      type="text"
                      name="photoUrl"
                      placeholder="Paste image URL..."
                      value={formData.photoUrl}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <img src={photoPreview} className="photo-preview" />
                )}
              </div>

              {/* RIGHT COLUMN */}
              <div>
                <label className="simple-label">Donation Box Title</label>
                <input
                  className="simple-input"
                  name="title"
                  placeholder="e.g. Help Marsha In Need!"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

                <label className="simple-label">Description</label>
                <textarea
                  className="simple-textarea"
                  name="description"
                  placeholder="e.g. Marsha Marsha Marsha Marsh"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />

                <label className="simple-label">Goal Amount</label>
                <input
                  className="simple-input"
                  type="number"
                  name="goalAmount"
                  placeholder="e.g. 10,203"
                  value={formData.goalAmount}
                  onChange={handleChange}
                  required
                />

                <label className="simple-label">Target Date (Optional)</label>
                <input
                  className="simple-input"
                  type="date"
                  name="targetDate"
                  value={formData.targetDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="donation-save-button">
              Save Donation Box
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateDonationBox;
