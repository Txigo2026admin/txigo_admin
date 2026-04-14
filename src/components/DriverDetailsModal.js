import React, { useState, useEffect } from 'react';
import './DriverDetailsModal.css';

const DriverDetailsModal = ({ driver, onClose, onSave }) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (driver) {
      setStatus(driver.status || 'Pending');
    }
  }, [driver]);

  if (!driver) return null;

  const handleSave = () => {
    onSave(driver.id, status);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Driver Verification Details</h2>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          {/* Profile Section */}
          <div className="details-grid">
            <h3 className="section-title">Personal Profile</h3>
            <div className="detail-item">
              <span className="detail-label">Full Name</span>
              <span className="detail-value">{driver.fullName || 'Not provided'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Mobile Number</span>
              <span className="detail-value">{driver.mobile || 'Not provided'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email Address</span>
              <span className="detail-value">{driver.email || 'Not provided'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Date of Birth</span>
              <span className="detail-value">{driver.dob || 'Not provided'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Full Address</span>
              <span className="detail-value">{driver.address || 'Not provided'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">State / Pincode</span>
              <span className="detail-value">{driver.state || '-'} / {driver.pincode || '-'}</span>
            </div>

            {/* KYC Section */}
            <h3 className="section-title">KYC Documents</h3>
            <div className="detail-item">
              <span className="detail-label">Aadhar Number</span>
              <span className="detail-value">{driver.aadharNumber || 'Not provided'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">PAN Number</span>
              <span className="detail-value">{driver.panNumber || 'Not provided'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">DL Number</span>
              <span className="detail-value">{driver.dlNumber || 'Not provided'}</span>
            </div>
            <div className="detail-item">
              {/* Empty slot for alignment */}
            </div>

            <div className="detail-item">
              <div className="doc-item">
                <span className="doc-name">Aadhar Card (Front)</span>
                <span className={`doc-status ${driver.aadharFrontUploaded ? 'uploaded' : 'missing'}`}>
                  {driver.aadharFrontUploaded ? 'Uploaded ✓' : 'Missing ✗'}
                </span>
              </div>
            </div>
            <div className="detail-item">
              <div className="doc-item">
                <span className="doc-name">Aadhar Card (Back)</span>
                <span className={`doc-status ${driver.aadharBackUploaded ? 'uploaded' : 'missing'}`}>
                  {driver.aadharBackUploaded ? 'Uploaded ✓' : 'Missing ✗'}
                </span>
              </div>
            </div>
            
            <div className="detail-item">
              <div className="doc-item">
                <span className="doc-name">PAN Card (Front)</span>
                <span className={`doc-status ${driver.panFrontUploaded ? 'uploaded' : 'missing'}`}>
                  {driver.panFrontUploaded ? 'Uploaded ✓' : 'Missing ✗'}
                </span>
              </div>
            </div>
            <div className="detail-item">
              <div className="doc-item">
                <span className="doc-name">PAN Card (Back)</span>
                <span className={`doc-status ${driver.panBackUploaded ? 'uploaded' : 'missing'}`}>
                  {driver.panBackUploaded ? 'Uploaded ✓' : 'Missing ✗'}
                </span>
              </div>
            </div>
            <div className="detail-item">
              <div className="doc-item">
                <span className="doc-name">Driving License (Front)</span>
                <span className={`doc-status ${driver.dlFrontUploaded ? 'uploaded' : 'missing'}`}>
                  {driver.dlFrontUploaded ? 'Uploaded ✓' : 'Missing ✗'}
                </span>
              </div>
            </div>
            <div className="detail-item">
              <div className="doc-item">
                <span className="doc-name">Driving License (Back)</span>
                <span className={`doc-status ${driver.dlBackUploaded ? 'uploaded' : 'missing'}`}>
                  {driver.dlBackUploaded ? 'Uploaded ✓' : 'Missing ✗'}
                </span>
              </div>
            </div>

            {/* Vehicle Section */}
            <h3 className="section-title">Vehicle Details</h3>
            <div className="detail-item">
              <span className="detail-label">Vehicle Type</span>
              <span className="detail-value">{driver.vehicleType || 'Not provided'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">RC Number</span>
              <span className="detail-value">{driver.rcNumber || 'Not provided'}</span>
            </div>

            <div className="detail-item">
              <div className="doc-item">
                <span className="doc-name">RC Document (Front)</span>
                <span className={`doc-status ${driver.rcFrontUploaded ? 'uploaded' : 'missing'}`}>
                  {driver.rcFrontUploaded ? 'Uploaded ✓' : 'Missing ✗'}
                </span>
              </div>
            </div>
            <div className="detail-item">
              <div className="doc-item">
                <span className="doc-name">RC Document (Back)</span>
                <span className={`doc-status ${driver.rcBackUploaded ? 'uploaded' : 'missing'}`}>
                  {driver.rcBackUploaded ? 'Uploaded ✓' : 'Missing ✗'}
                </span>
              </div>
            </div>
            <div className="detail-item">
              <div className="doc-item">
                <span className="doc-name">Vehicle Photo (Front)</span>
                <span className={`doc-status ${driver.carFrontUploaded ? 'uploaded' : 'missing'}`}>
                  {driver.carFrontUploaded ? 'Uploaded ✓' : 'Missing ✗'}
                </span>
              </div>
            </div>
            <div className="detail-item">
              <div className="doc-item">
                <span className="doc-name">Vehicle Photo (Back)</span>
                <span className={`doc-status ${driver.carBackUploaded ? 'uploaded' : 'missing'}`}>
                  {driver.carBackUploaded ? 'Uploaded ✓' : 'Missing ✗'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="status-control">
            <label>Driver Account Status:</label>
            <select 
              className="modal-status-select" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
          <button className="btn-save" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverDetailsModal;
