import React, { useContext, useEffect, useState } from 'react';
import upload from '../../Asserts/upload_area.svg';
import job_images from '../../Asserts/jobs';
import './Update.css';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Grid,
  MenuItem,
  Chip,
  IconButton,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { JobContext } from '../TotalContext.jsx/TotalContext';

const Update = () => {
  const [image, setImage] = useState(null);
  const { data1 } = useContext(JobContext);
  const [jobs, setJobs] = useState(data1);
  const { id } = useParams();
  const [Det, setDet] = useState({});
  const [newSkill, setNewSkill] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/jobs/${id}`);
        setDet(response.data);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    fetchJob();
  }, [id]);

  const updateJob = async (id, job) => {
    try {
      const response = await axios.put(`http://localhost:4000/updatejob/${id}`, job);
      const updatedJobs = jobs.map(job => (job.id === id ? response.data : job));
      setJobs(updatedJobs);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setDet({ ...Det, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, fieldName) => {
    setDet({ ...Det, [fieldName]: date });
  };

  const handleSkillAdd = () => {
    if (newSkill && !Det.skills.includes(newSkill)) {
      setDet({ ...Det, skills: [...Det.skills, newSkill] });
      setNewSkill('');
    }
  };

  const handleSkillDelete = (skillToDelete) => {
    setDet({ ...Det, skills: Det.skills.filter((skill) => skill !== skillToDelete) });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!Det.companyName) tempErrors.companyName = 'Company Name is required';
    if (!Det.role) tempErrors.role = 'Role is required';
    if (!Det.city) tempErrors.city = 'City is required';
    if (!Det.address) tempErrors.address = 'Address is required';
    if (!Det.startDate) tempErrors.startDate = 'Start Date is required';
    if (!Det.applyBy) tempErrors.applyBy = 'Apply By Date is required';
    if (!Det.Salary) tempErrors.Salary = 'Salary is required';
    if (!Det.experience) tempErrors.experience = 'Experience is required';
    if (!Det.aboutjob) tempErrors.aboutjob = 'About Job is required';
    if (Det.skills.length === 0) tempErrors.skills = 'At least one skill is required';
    if (!Det.eligibility) tempErrors.eligibility = 'Eligibility is required';
    if (!Det.aboutCompany) tempErrors.aboutCompany = 'About Company is required';
    if (!Det.vacancies || isNaN(Det.vacancies) || parseInt(Det.vacancies) <= 0)
      tempErrors.vacancies = 'Valid number of vacancies is required';
    if (!Det.jobType) tempErrors.jobType = 'Job Type is required';

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };
const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleUpdateClick(id);
      console.log('Form data submitted:', Det);
      alert("Updated Successfully");
      navigate('/');
    }
  };

  const handleUpdateClick = async (id) => {
    let responseData;
    let job = { ...Det };
    let form = new FormData();
    form.append('company', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: form,
    }).then((res) => res.json())
      .then((data) => { responseData = data });

    if (responseData.success) {
      job.image = responseData.image_url;
      updateJob(id, job);
    }
  };
  console.log(Det);

  return (
    <div className='postjob'>
      <Container maxWidth="md">
        <Box
          sx={{
            mt: 4,
            p: 4,
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'white',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Job Post Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  defaultValue={Det.companyName}
                  
                  margin="normal"
                  placeholder="Company Name"
                  name="companyName"
                  variant="outlined"
                  value={Det.companyName }
                  onChange={handleChange}
                  error={Boolean(errors.companyName)}
                  helperText={errors.companyName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="Role"
                  name="role"
                  variant="outlined"
                  value={Det.role || ''}
                  onChange={handleChange}
                  error={Boolean(errors.role)}
                  helperText={errors.role}
                  select
                >
                  <MenuItem value="">Select Role</MenuItem>
                  {job_images.map((job) => (
                    <MenuItem key={job.name} value={job.name}>
                      {job.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="City"
                  name="city"
                  variant="outlined"
                  value={Det.city || ''}
                  onChange={handleChange}
                  error={Boolean(errors.city)}
                  helperText={errors.city}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="Address"
                  name="address"
                  variant="outlined"
                  value={Det.address || ''}
                  onChange={handleChange}
                  error={Boolean(errors.address)}
                  helperText={errors.address}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date"
                    value={Det.startDate || null}
                    onChange={(date) => handleDateChange(date, 'startDate')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.startDate)}
                        helperText={errors.startDate}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Apply By"
                    value={Det.applyBy || null}
                    onChange={(date) => handleDateChange(date, 'applyBy')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.applyBy)}
                        helperText={errors.applyBy}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="Salary"
                  name="Salary"
                  variant="outlined"
                  value={Det.Salary || ''}
                  onChange={handleChange}
                  error={Boolean(errors.Salary)}
                  helperText={errors.Salary}
                  select
                >
                  <MenuItem value="">Select Salary</MenuItem>
                  <MenuItem value="10000-20000">10000-20000</MenuItem>
                  <MenuItem value="20000-30000">20000-30000</MenuItem>
                  <MenuItem value="30000-40000">30000-40000</MenuItem>
                  <MenuItem value="50000+">50000+</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="Experience (Years)"
                  name="experience"
                  variant="outlined"
                  value={Det.experience || ''}
                  onChange={handleChange}
                  error={Boolean(errors.experience)}
                  helperText={errors.experience}
                  select
                >
                  <MenuItem value="">Select Experience</MenuItem>
                  <MenuItem value="0-1 year">0-1 Year</MenuItem>
                  <MenuItem value="2-3 years">2-3 Years</MenuItem>
                  <MenuItem value="3-5 years">4-5 Years</MenuItem>
                  <MenuItem value="5 years +">5+ Years</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="About the Job"
                  name="aboutjob"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={Det.aboutjob || ''}
                  onChange={handleChange}
                  error={Boolean(errors.aboutjob)}
                  helperText={errors.aboutjob}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="Add Skill"
                  variant="outlined"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleSkillAdd}>
                        <AddIcon />
                      </IconButton>
                    ),
                  }}
                />
                <Box sx={{ mt: 2 }}>
                  {Det.skills && Det.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      onDelete={() => handleSkillDelete(skill)}
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                  {errors.skills && (
                    <Typography color="error" variant="body2">
                      {errors.skills}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="Eligibility"
                  name="eligibility"
                  variant="outlined"
                  value={Det.eligibility || ''}
                  onChange={handleChange}
                  error={Boolean(errors.eligibility)}
                  helperText={errors.eligibility}
                  select
                >
                  <MenuItem value="">Select Eligibility</MenuItem>
                  <MenuItem value="10th">10th</MenuItem>
                  <MenuItem value="12th">12th</MenuItem>
                  <MenuItem value="Graduate">Graduate</MenuItem>
                  <MenuItem value="Post graduate">Post Graduate</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="About the Company"
                  name="aboutCompany"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={Det.aboutCompany || ''}
                  onChange={handleChange}
                  error={Boolean(errors.aboutCompany)}
                  helperText={errors.aboutCompany}
                />
              </Grid>
              <div>
                <label htmlFor="file-input">
                  <img
                    src={image ? URL.createObjectURL(image) : upload}
                    alt=""
                    className="addproduct-thumbnail-img"
                  />
                  <h3 style={{ margin: '-10px', paddingLeft: '50px', color: 'gray' }}>
                    Upload company image
                  </h3>
                </label>
                <input
                  onChange={imageHandler}
                  type="file"
                  name="image"
                  id="file-input"
                  hidden
                  required
                />
              </div>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="Vacancies"
                  name="vacancies"
                  variant="outlined"
                  value={Det.vacancies || ''}
                  onChange={handleChange}
                  error={Boolean(errors.vacancies)}
                  helperText={errors.vacancies}
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  placeholder="Job Type"
                  name="jobType"
                  variant="outlined"
                  value={Det.jobType || ''}
                  onChange={handleChange}
                  error={Boolean(errors.jobType)}
                  helperText={errors.jobType}
                  select
                >
                  <MenuItem value="">Select Job Type</MenuItem>
                  <MenuItem value="Work from Home">Work from Home</MenuItem>
                  <MenuItem value="Part time">Part Time</MenuItem>
                  <MenuItem value="Full time">Full Time</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Update;
