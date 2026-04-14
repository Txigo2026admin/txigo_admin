import React, { useState } from 'react';
import './DriverTable.css';
import DriverDetailsModal from './DriverDetailsModal';

const DriverTable = () => {
  // Dummy data generated based on the txigo_app global_state fields:
  // fullName, dob, email, address, pincode, state, aadharNumber, rcNumber
  const [data, setData] = useState([
    {
      id: 1,
      fullName: 'Rahul Sharma',
      dob: '1992-05-14',
      email: 'rahul.sharma@example.com',
      pincode: '700001',
      state: 'West Bengal',
      address: 'Kolkata, Park Street',
      mobile: '7980641007',
      vehicleType: 'Car',
      rcNumber: 'WB04F1234',
      aadharNumber: '1234 5678 9012',
      panNumber: 'ABCDE1234F',
      dlNumber: 'DL-1234567890',
      aadharFrontUploaded: true,
      aadharBackUploaded: true,
      panFrontUploaded: true,
      panBackUploaded: true,
      dlFrontUploaded: true,
      dlBackUploaded: true,
      rcFrontUploaded: true,
      rcBackUploaded: true,
      carFrontUploaded: true,
      carBackUploaded: true,
      registeredAt: '2022-07-09 12:52:15',
      verifyAt: '2026-02-03 17:22:56',
      type: 'regular',
      status: 'Active'
    },
    {
      id: 2,
      fullName: 'Amit Kumar',
      email: 'amit.k@example.com',
      pincode: '110001',
      state: 'Delhi',
      address: 'Connaught Place',
      mobile: '9876543210',
      vehicleType: 'Mini',
      rcNumber: 'DL1CAB4321',
      registeredAt: '2023-01-15 09:30:00',
      verifyAt: '2026-02-14 10:45:00',
      type: 'regular',
      status: 'Blocked'
    },
    {
      id: 3,
      fullName: 'Priya Singh',
      email: 'priya.s@example.com',
      pincode: '400001',
      state: 'Maharashtra',
      address: 'Mumbai CST',
      mobile: '9123456789',
      vehicleType: 'Sedan',
      rcNumber: 'MH01AB9876',
      registeredAt: '2023-05-20 14:15:22',
      verifyAt: 'Pending',
      type: 'pending',
      status: 'Inactive'
    }
  ]);

  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleSaveStatus = (driverId, newStatus) => {
    setData((prevData) =>
      prevData.map((driver) =>
        driver.id === driverId ? { ...driver, status: newStatus } : driver
      )
    );
    setSelectedDriver(null); // Close modal on save
  };

  const handleStatusChangeForm = (driverId, newStatus) => {
    setData((prevData) =>
      prevData.map((driver) =>
        driver.id === driverId ? { ...driver, status: newStatus } : driver
      )
    );
  };

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Driver Verification Management</h1>
        <p className="dashboard-subtitle">Manage and verify registered drivers, their KYC, and vehicle documents.</p>
      </div>

      {/* Top Filters exactly like the screenshot */}
      <div className="filters-container">
        <div className="filters-row">
          <select className="filter-select">
            <option value="">Category</option>
            <option value="scooty">Scooty</option>
            <option value="bike">Bike</option>
            <option value="car">Car</option>
          </select>
          
          <input type="text" className="filter-input" placeholder="Search City" />
          
          <select className="filter-select">
            <option value="">Select Status</option>
            <option value="under_verification">Under Verification</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>

          <select className="filter-select">
            <option value="">Select Type</option>
            <option value="regular">Regular</option>
            <option value="premium">Premium</option>
          </select>

          <div className="search-input-wrapper">
            <label>Search:</label>
            <input type="text" className="search-input" />
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Pincode</th>
              <th>City</th>
              <th>Mobile</th>
              <th>Vehicle Type / RC</th>
              <th>Registered at</th>
              <th>Verify At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((driver) => (
              <tr key={driver.id}>
                <td>
                  <span className="user-name">{driver.fullName}</span>
                  <span className="sub-text">{driver.email}</span>
                </td>
                <td>{driver.pincode}</td>
                <td>{driver.address}</td>
                <td>{driver.mobile}</td>
                <td>
                  <span className="user-name">{driver.vehicleType}</span>
                  <span className="sub-text">{driver.rcNumber}</span>
                </td>
                <td>
                  <span className="user-name">{driver.registeredAt.split(' ')[0]}</span>
                  <span className="sub-text">{driver.registeredAt.split(' ')[1]}</span>
                </td>
                <td>
                  {driver.verifyAt === 'Pending' ? (
                    <span style={{ color: '#b45309', fontWeight: 500 }}>Pending</span>
                  ) : (
                    <>
                      <span className="user-name">{driver.verifyAt.split(' ')[0]}</span>
                      <span className="sub-text">{driver.verifyAt.split(' ')[1]}</span>
                    </>
                  )}
                </td>
                <td>
                  <div className="action-cell">
                    <button className="btn-view" onClick={() => setSelectedDriver(driver)}>View</button>
                    <select 
                      className="status-dropdown" 
                      value={driver.status}
                      onChange={(e) => handleStatusChangeForm(driver.id, e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Blocked">Blocked</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="table-footer">
          <div className="entries-info">
            Show <select className="entries-select"><option>10</option><option>25</option><option>50</option></select> entries
          </div>
          <div className="entries-info">
            Showing 1 to {data.length} of {data.length} entries
          </div>
        </div>
      </div>

      {/* Driver Details Modal */}
      <DriverDetailsModal 
        driver={selectedDriver} 
        onClose={() => setSelectedDriver(null)}
        onSave={handleSaveStatus}
      />
    </div>
  );
};

export default DriverTable;
