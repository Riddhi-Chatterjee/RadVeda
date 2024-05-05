import React, { useState } from 'react';
import './RadUpdateProfile.css';

const RadUpdateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    address1: '',
    address2: '',
    country: '',
    state: '',
    city: '',
    additionalMobileNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:');
    console.log('First Name:', formData.firstName);
    console.log('Middle Name:', formData.middleName);
    console.log('Last Name:', formData.lastName);
    console.log('Address 1:', formData.address1);
    console.log('Address 2:', formData.address2);
    console.log('Country:', formData.country);
    console.log('State:', formData.state);
    console.log('City:', formData.city);
    console.log('Additional Mobile Number:', formData.additionalMobileNumber);
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter First Name" />
        </label>
        <br />
        <label>
          Middle Name:
          <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Enter Middle Name" />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter Last Name" />
        </label>
        <br />
        <label>
          Address 1:
          <input type="text" name="address1" value={formData.address1} onChange={handleChange} placeholder="Enter Address 1" />
        </label>
        <br />
        <label>
          Address 2:
          <input type="text" name="address2" value={formData.address2} onChange={handleChange} placeholder="Enter Address 2" />
        </label>
        <br />
        <label>
          Country:
          <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Enter Country" />
        </label>
        <br />
        <label>
          State:
          <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="Enter State" />
        </label>
        <br />
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Enter City" />
        </label>
        <br />
        <label>
          Additional Mobile Number:
          <input type="text" name="additionalMobileNumber" value={formData.additionalMobileNumber} onChange={handleChange} placeholder="Enter Additional Mobile Number" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RadUpdateProfile;
