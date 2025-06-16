"use client";

import React, { useState } from "react";

export default function FormValidation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 3) return "Name must be at least 3 characters";
    return "";
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!/\d/.test(password)) return "Password must contain at least 1 number";
    if (!/[!@#$%^&*]/.test(password))
      return "Password must contain at least 1 special character";
    return "";
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    if (touched[name]) {
      let error = "";
      switch (name) {
        case "name":
          error = validateName(value);
          break;
        case "email":
          error = validateEmail(value);
          break;
        case "password":
          error = validatePassword(value);
          break;
      }
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  // Handle blur events
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    let error = "";
    switch (name) {
      case "name":
        error = validateName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    const newErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, password: true });

    if (!nameError && !emailError && !passwordError) {
      alert("Form submitted successfully!");
      console.log("Form data:", formData);
    }
  };

  // Get input styling based on validation state
  const getInputClasses = (fieldName) => {
    const baseClasses =
      "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors";

    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClasses} border-red-500 focus:ring-red-200 bg-red-50`;
    } else if (
      touched[fieldName] &&
      !errors[fieldName] &&
      formData[fieldName]
    ) {
      return `${baseClasses} border-green-500 focus:ring-green-200 bg-green-50`;
    }
    return `${baseClasses} border-gray-300 focus:ring-blue-200`;
  };

  // Get label styling based on validation state
  const getLabelClasses = (fieldName) => {
    const baseClasses = "block text-sm font-medium mb-1";

    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClasses} text-red-600`;
    } else if (
      touched[fieldName] &&
      !errors[fieldName] &&
      formData[fieldName]
    ) {
      return `${baseClasses} text-green-600`;
    }
    return `${baseClasses} text-gray-700`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign Up Form
        </h1>

        <div className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className={getLabelClasses("name")}>
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClasses("name")}
              placeholder="Enter your name"
            />
            {touched.name && errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className={getLabelClasses("email")}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClasses("email")}
              placeholder="Enter your email"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className={getLabelClasses("password")}>
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClasses("password")}
              placeholder="Enter your password"
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Minimum 8 characters, 1 number, 1 special character
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
