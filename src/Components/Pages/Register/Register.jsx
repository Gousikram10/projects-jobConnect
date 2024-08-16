import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './Register.css';

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .required('Name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup
    .number('Enter your phone number')
    .typeError('Phone number must be a number')
    .required('Phone number is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: yup
    .string('Confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
});

export default function Register() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { name, email, phone, password } = values;
      const student = { name, email, phone, password };
      await fetch("http://localhost:8081/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      }).then(() => {
        alert("Added successfully");
      });
    },
  });

  return (
    <div className='total1'>
      <div className='bb'>
        <Box 
          sx={{
            '& .MuiTextField-root': { m: 2.5, width: '50ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              required
              id="name"
              label="Enter Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <br />
            <TextField
              required
              id="phone"
              label="Mobile Number"
              type="number"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <br />
            <TextField
              required
              id="email"
              label="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <br />
            <TextField
              required
              id="password"
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <br />
            <TextField
              required
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  name="terms"
                  checked={formik.values.terms}
                  onChange={formik.handleChange}
                  color="primary"
                />
              }
              label="I agree to the terms and conditions"
            />
            {formik.touched.terms && Boolean(formik.errors.terms) && (
              <Typography color="error">{formik.errors.terms}</Typography>
            )}
            <br />
            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              style={{
                margin: '25px',
                padding: '14px',
                width: '100px',
                borderRadius: '12px',
                backgroundColor: '#199ecf',
                color: 'white',
                border: 'none',
                fontSize: '16px',
              }}
            >
              SUBMIT
            </Button>
          </form>
        </Box>
      </div>
    </div>
  );
}
