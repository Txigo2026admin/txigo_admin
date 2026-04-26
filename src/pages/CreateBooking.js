import React, { useState, useEffect } from 'react';
import './CreateBooking.css';
import { createBooking } from '../api/bookingService';
import { getStates } from '../api/driverService';
import { INDIA_STATES } from '../utils/indiaStates';

const CreateBooking = () => {
  const [booking, setBooking] = useState({
    // User Details
    userName: '',
    mobileNumber: '',
    
    // Booking Configuration
    bookingType: '', // Outstation, Rental, Airport Ride, Station Ride
    wayType: '', // One-way, Roundtrip (for Outstation)
    airportDirection: '', // From airport, To Airport (for Airport Ride)
    rentalPackage: '', // 1-10, 5-50, 8-80 (for Rental)
    
    // Route Details
    pickupLocation: '',
    dropLocation: '',
    pickupDateTime: '',
    returnTime: '',
    pincode: '',
    state: '',
    
    // Coordinates
    pickupLat: '',
    pickupLng: '',
    dropLat: '',
    dropLng: '',
    
    // Vehicle & Trip Details
    distance: '',
    vehicleType: '',
    car: 'Sedan', // Mini, Sedan, SUV, SUV+, Traveller
    seater: '4', // 4, 6, 7, 13, 15, 17, 25
    ac: 'AC',
    
    // Driver & Pricing Policy
    driverNightAllowance: '',
    tollCharges: 'Excluded',
    extraKm: '15',
    extraHour: '20/hr',
    waitingCharge: '',
    
    // Financials
    totalFare: '',
    advancedAmount: '',
    pilotShare: '',
    companyShare: '',
    allocateOurPilot: false
  });

  const [showPilotInfoModal, setShowPilotInfoModal] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [allStates, setAllStates] = useState([]);

  useEffect(() => {
    const loadStates = async () => {
      try {
        const states = await getStates();
        setAllStates(states);
      } catch (err) {
        console.warn('Failed to load states:', err);
      }
    };
    loadStates();
  }, []);

  const handleChange = (field, value) => {
    setBooking(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Basic validation
    // Specific validation
    const missingFields = [];
    if (!booking.userName) missingFields.push('User Name');
    if (!booking.mobileNumber) missingFields.push('Mobile Number');
    if (!booking.bookingType) missingFields.push('Booking Type');
    if (!booking.pickupDateTime) missingFields.push('Pickup Date and Time');
    
    // Conditional requirements
    if (booking.bookingType === 'Outstation' && !booking.wayType) missingFields.push('Way Type');
    if (booking.bookingType === 'Airport Ride' && !booking.airportDirection) missingFields.push('Airport Direction');
    if (booking.bookingType === 'Rental' && !booking.rentalPackage) missingFields.push('Rental Package');
    if (booking.wayType === 'Roundtrip' && !booking.returnTime) missingFields.push('Return Time (Timings)');
    
    if (missingFields.length > 0) {
      setMessage({ 
        text: `The following fields are missing: ${missingFields.join(', ')}`, 
        type: 'error' 
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Sending Booking Data:', booking);
      await createBooking(booking);
      
      setMessage({ text: 'Booking successfully created!', type: 'success' });
      
      // Reset form on success (except defaults)
      setBooking({
        userName: '',
        mobileNumber: '',
        bookingType: '',
        wayType: '',
        airportDirection: '',
        rentalPackage: '',
        pickupLocation: '',
        dropLocation: '',
        pickupDateTime: '',
        returnTime: '',
        pincode: '',
        state: '',
        pickupLat: '',
        pickupLng: '',
        dropLat: '',
        dropLng: '',
        distance: '',
        vehicleType: '',
        car: 'Sedan',
        seater: '4',
        ac: 'AC',
        driverNightAllowance: '',
        tollCharges: 'Excluded',
        extraKm: '15',
        extraHour: '20/hr',
        waitingCharge: '',
        totalFare: '',
        advancedAmount: '',
        pilotShare: '',
        companyShare: '',
        allocateOurPilot: false
      });
      
    } catch (error) {
      console.error('Submission Error:', error);
      setMessage({ 
        text: typeof error === 'string' ? error : (error.message || 'Failed to create booking. Please try again.'), 
        type: 'error' 
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    }
  };

  return (
    <div className="create-booking-container">
      <div className="form-header">
        <div className="header-title-wrapper">
          <h1 className="form-title">Create New Booking</h1>
          <p className="form-subtitle instruction-text">
            For Outstation roundtrip kindly choose booking type, waytype, pickup time and return time first then pickup and drop location
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => window.location.reload()} disabled={loading}>Reset Form</button>
          <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Saving...' : 'Save Booking'}
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`form-message ${message.type}`}>
          {message.text}
        </div>
      )}

      <datalist id="states-list">
        {INDIA_STATES.map(st => <option key={st} value={st} />)}
      </datalist>

      <form onSubmit={handleSubmit} className="booking-form">
        {/* SECTION 1: CUSTOMER & SERVICE */}
        <div className="form-section-card">
          <h2 className="section-title">
            <span className="section-icon">👤</span> Customer & Service Type
          </h2>
          <div className="input-grid">
            <div className="input-field">
              <label>User Name</label>
              <input 
                type="text" 
                placeholder="Enter client name"
                value={booking.userName}
                onChange={(e) => handleChange('userName', e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label>Mobile Number</label>
              <input 
                type="tel" 
                placeholder="Contact number"
                value={booking.mobileNumber}
                onChange={(e) => handleChange('mobileNumber', e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <label>Booking Type</label>
              <select 
                value={booking.bookingType}
                onChange={(e) => handleChange('bookingType', e.target.value)}
                required
              >
                <option value="">Choose booking type--</option>
                <option value="Outstation">Outstation</option>
                <option value="Rental">Rental</option>
                <option value="Airport Ride">Airport Ride</option>
                <option value="Station Ride">Station Ride</option>
              </select>
            </div>

            {booking.bookingType === 'Outstation' && (
              <div className="input-field anim-fade-in">
                <label>Way Type</label>
                <select 
                  value={booking.wayType}
                  onChange={(e) => handleChange('wayType', e.target.value)}
                  required
                >
                  <option value="">Select Way Type--</option>
                  <option value="One-way">One-way</option>
                  <option value="Roundtrip">Roundtrip</option>
                </select>
              </div>
            )}

            {booking.bookingType === 'Airport Ride' && (
              <div className="input-field anim-fade-in">
                <label>Airport Direction</label>
                <select 
                  value={booking.airportDirection}
                  onChange={(e) => handleChange('airportDirection', e.target.value)}
                  required
                >
                  <option value="">Select Direction--</option>
                  <option value="From airport">From airport</option>
                  <option value="To Airport">To Airport</option>
                </select>
              </div>
            )}

            {booking.bookingType === 'Rental' && (
              <div className="input-field anim-fade-in">
                <label>Rental Package</label>
                <select 
                  value={booking.rentalPackage}
                  onChange={(e) => handleChange('rentalPackage', e.target.value)}
                  required
                >
                  <option value="">Select Package--</option>
                  <option value="1-10">1 Hour - 10 KM</option>
                  <option value="5-50">5 Hours - 50 KM</option>
                  <option value="8-80">8 Hours - 80 KM</option>
                </select>
              </div>
            )}

            <div className="input-field">
              <label>Pickup Date and Time</label>
              <input 
                type="datetime-local" 
                value={booking.pickupDateTime}
                onChange={(e) => handleChange('pickupDateTime', e.target.value)}
                required
              />
            </div>

            {booking.wayType === 'Roundtrip' && booking.bookingType === 'Outstation' && (
              <div className="input-field anim-fade-in">
                <label>Return Date & Time</label>
                <input 
                  type="datetime-local" 
                  value={booking.returnTime}
                  onChange={(e) => handleChange('returnTime', e.target.value)}
                  required
                />
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: ROUTE & TIMELINE */}
        <div className="form-section-card">
          <h2 className="section-title">
            <span className="section-icon">📍</span> Route & Timeline
          </h2>
          <div className="input-grid">
            <div className="input-field full-width">
              <label>Pickup Location</label>
              <input 
                type="text" 
                placeholder="Full pickup address"
                value={booking.pickupLocation}
                onChange={(e) => handleChange('pickupLocation', e.target.value)}
              />
            </div>
            <div className="input-field full-width">
              <label>Drop Location</label>
              <input 
                type="text" 
                placeholder="Full destination address"
                value={booking.dropLocation}
                onChange={(e) => handleChange('dropLocation', e.target.value)}
              />
            </div>
            <div className="input-field">
              <label>Pincode</label>
              <input 
                type="text" 
                placeholder="Area pincode"
                value={booking.pincode}
                onChange={(e) => handleChange('pincode', e.target.value)}
              />
            </div>
            <div className="input-field">
              <label>State</label>
              <input 
                type="text" 
                placeholder="Select State"
                value={booking.state}
                onChange={(e) => handleChange('state', e.target.value)}
                list="states-list"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: COORDINATES */}
        <div className="form-section-card">
          <h2 className="section-title">
            <span className="section-icon">🗺️</span> GPS Coordinates
          </h2>
          <div className="input-grid">
            <div className="input-field">
              <label>Pickup Latitude</label>
              <input type="text" value={booking.pickupLat} onChange={(e) => handleChange('pickupLat', e.target.value)} placeholder="0.000000" />
            </div>
            <div className="input-field">
              <label>Pickup Longitude</label>
              <input type="text" value={booking.pickupLng} onChange={(e) => handleChange('pickupLng', e.target.value)} placeholder="0.000000" />
            </div>
            <div className="input-field">
              <label>Drop Latitude</label>
              <input type="text" value={booking.dropLat} onChange={(e) => handleChange('dropLat', e.target.value)} placeholder="0.000000" />
            </div>
            <div className="input-field">
              <label>Drop Longitude</label>
              <input type="text" value={booking.dropLng} onChange={(e) => handleChange('dropLng', e.target.value)} placeholder="0.000000" />
            </div>
          </div>
        </div>

        {/* SECTION 4: VEHICLE & PILOT CONFIG */}
        <div className="form-section-card">
          <div className="section-header-flex">
            <h2 className="section-title">
              <span className="section-icon">🚗</span> Vehicle & Details
            </h2>
            <div className="pilot-toggle-wrapper">
              <div className="checkbox-container">
                <input 
                  type="checkbox" 
                  id="allocateOurPilot"
                  className="custom-checkbox"
                  checked={booking.allocateOurPilot} 
                  onChange={(e) => handleChange('allocateOurPilot', e.target.checked)} 
                />
                <label htmlFor="allocateOurPilot" className="checkbox-label">Allocate our pilot</label>
              </div>
              <button 
                type="button" 
                className="info-btn" 
                onClick={() => setShowPilotInfoModal(true)}
                title="What is Allocate our pilot?"
              >
                ⓘ
              </button>
            </div>
          </div>
          <div className="input-grid">
            <div className="input-field">
              <label>Distance (km)</label>
              <input type="number" value={booking.distance} onChange={(e) => handleChange('distance', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Vehicle Category</label>
              <select value={booking.car} onChange={(e) => handleChange('car', e.target.value)}>
                <option value="Mini">Mini</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="SUV+">SUV+</option>
                <option value="Traveller">Traveller</option>
              </select>
            </div>
            <div className="input-field">
              <label>Seater?</label>
              <select value={booking.seater} onChange={(e) => handleChange('seater', e.target.value)}>
                <option value="4">4 Seater</option>
                <option value="6">6 Seater</option>
                <option value="7">7 Seater</option>
                <option value="13">13 Seater</option>
                <option value="15">15 Seater</option>
                <option value="17">17 Seater</option>
                <option value="25">25 Seater</option>
              </select>
            </div>
            <div className="input-field">
              <label>AC?</label>
              <select value={booking.ac} onChange={(e) => handleChange('ac', e.target.value)}>
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 5: PRICING & FARE */}
        <div className="form-section-card">
          <h2 className="section-title">
            <span className="section-icon">💳</span> Pricing & Total Fare
          </h2>
          <div className="input-grid">
            <div className="input-field">
              <label>Driver night allowance</label>
              <input type="number" value={booking.driverNightAllowance} onChange={(e) => handleChange('driverNightAllowance', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Toll charges</label>
              <input type="text" value={booking.tollCharges} onChange={(e) => handleChange('tollCharges', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Extra km</label>
              <input type="text" value={booking.extraKm} onChange={(e) => handleChange('extraKm', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Extra hour</label>
              <input type="text" value={booking.extraHour} onChange={(e) => handleChange('extraHour', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Waiting Charge</label>
              <input type="number" value={booking.waitingCharge} onChange={(e) => handleChange('waitingCharge', e.target.value)} />
            </div>
            
            <div className="input-field highlight">
              <label>Total Fare (₹)</label>
              <div className="fare-input-wrapper">
                <input type="text" value={booking.totalFare} onChange={(e) => handleChange('totalFare', e.target.value)} />
              </div>
            </div>
            
            <div className="input-field">
              <label>Advanced Amount</label>
              <input type="number" value={booking.advancedAmount} onChange={(e) => handleChange('advancedAmount', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Pilot share</label>
              <input type="number" value={booking.pilotShare} onChange={(e) => handleChange('pilotShare', e.target.value)} />
            </div>
            <div className="input-field">
              <label>Company share</label>
              <input type="number" value={booking.companyShare} onChange={(e) => handleChange('companyShare', e.target.value)} />
            </div>
          </div>
        </div>
      </form>

      {/* Pilot Information Modal */}
      {showPilotInfoModal && (
        <div className="modal-backdrop" onClick={() => setShowPilotInfoModal(false)}>
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon-wrapper info">ⓘ</div>
            <h2 className="modal-title">Allocate Our Pilot</h2>
            <div className="modal-content">
              <p>When this option is enabled, this booking is specifically reserved for <strong>our local pilot fleet</strong>.</p>
              <div className="feature-explainer">
                <span className="tag">Note:</span>
                <p>Those bookings created by admin for that region with this tag <strong>cannot be accepted by any other general pilot</strong>.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-modal-close" onClick={() => setShowPilotInfoModal(false)}>Understood</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBooking;
