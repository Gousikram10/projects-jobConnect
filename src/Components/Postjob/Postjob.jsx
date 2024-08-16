import React, { useState } from 'react';
import upload from '../../Asserts/upload_area.svg';
import job_images from '../../Asserts/jobs';
import './Postjob.css';
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

const Postjob = () => {
  const [image, setImage] = useState(false);


  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    city: '',
    image: '',
    address: '',
    startDate: null,
    applyBy: null,
    Salary: '',
    experience: '',
    aboutjob: '',
    skills: [],
    eligibility: '',
    aboutCompany: '',
    vacancies: 0,
    jobType: '',
  });

  const [newSkill, setNewSkill] = useState('');
  const [newEligibility, setNewEligibility] = useState('');
  const [errors, setErrors] = useState({});

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const Add_Jobs = async()=>{
    console.log(formData);
    let responseData;
    let job=formData;
    let form=new FormData();
    form.append('company',image);
    await fetch('http://localhost:4000/upload',{
      method:'POST',
      headers:{
        Accept:'application/json',
      },
      body:form,
    }).then((res)=>res.json())
    .then((data)=>{responseData=data})
    if(responseData.success)
    {
       job.image=responseData.image_url;
       console.log(job);
       await fetch('http://localhost:4000/addjobs',{
        method:'POST',
        headers:{
          Accept:'application/json',
          "Content-Type":'application/json',
        },
        body:JSON.stringify(job),
       }).then((res)=>res.json()).then((data)=>{
        data.success?alert("Added Successfully"):alert("Failed")  
       })
    }
  }

  const handleDateChange = (date, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: date,
    });
  };

  const handleSkillAdd = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill],
      });
      setNewSkill('');
    }
  };

  const handleSkillDelete = (skillToDelete) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToDelete),
    });
  };

  const handleEligibilityAdd = () => {
    if (newEligibility && !formData.eligibility.includes(newEligibility)) {
      setFormData({
        ...formData,
        eligibility: [...formData.eligibility, newEligibility],
      });
      setNewEligibility('');
    }
  };

  const handleEligibilityDelete = (eligibilityToDelete) => {
    setFormData({
      ...formData,
      eligibility: formData.eligibility.filter((e) => e !== eligibilityToDelete),
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.companyName) tempErrors.companyName = 'Company Name is required';
    if (!formData.role) tempErrors.role = 'Role is required';
    if (!formData.city) tempErrors.city = 'City is required';
    if (!formData.address) tempErrors.address = 'Address is required';
    if (!formData.startDate) tempErrors.startDate = 'Start Date is required';
    if (!formData.applyBy) tempErrors.applyBy = 'Apply By Date is required';
    if (!formData.salary) tempErrors.salary = 'Salary is required';
    if (!formData.experience) tempErrors.experience = 'Experience is required';
    if (!formData.aboutJob) tempErrors.aboutJob = 'About Job is required';
    if (formData.skills.length === 0) tempErrors.skills = 'At least one skill is required';
    if (formData.eligibility.length === 0) tempErrors.eligibility = 'At least one eligibility criterion is required';
    if (!formData.aboutCompany) tempErrors.aboutCompany = 'About Company is required';
    if (!formData.vacancies || isNaN(formData.vacancies) || parseInt(formData.vacancies) <= 0)
      tempErrors.vacancies = 'Valid number of vacancies is required';
    if (!formData.jobType) tempErrors.jobType = 'Job Type is required';

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const Add_Product = async () => {
    let responseData;
    let product = formData;
    let form = new FormData();
    form.append('product', image);
    try {
      const uploadResponse = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: form,
      });
      responseData = await uploadResponse.json();
      if (responseData.success) {
        product.image = responseData.image_url;
        console.log(product);
        const addResponse = await fetch('http://localhost:4000/addproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
        const addData = await addResponse.json();
        addData.success ? alert('Product Added') : alert('Failed');
      }
    } catch (error) {
      console.error('Error uploading or adding product:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      Add_Product();
      console.log('Form data submitted:', formData);
    }
  };

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
                  margin="normal"
                  label="Company Name"
                  name="companyName"
                  variant="outlined"
                  value={formData.companyName}
                  onChange={handleChange}
                  error={Boolean(errors.companyName)}
                  helperText={errors.companyName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Role"
                  name="role"
                  variant="outlined"
                  value={formData.role}
                  onChange={handleChange}
                  error={Boolean(errors.role)}
                  helperText={errors.role}
                  select
                >
                  <MenuItem value="">Select Role</MenuItem>
                  {job_images.map((job)=>{
                     return <MenuItem value={job.name}>{job.name}</MenuItem>
                  })}
                 
                  </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="City"
                  name="city"
                  variant="outlined"
                  value={formData.city}
                  onChange={handleChange}
                  error={Boolean(errors.city)}
                  helperText={errors.city}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Address"
                  name="address"
                  variant="outlined"
                  value={formData.address}
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
                    value={formData.startDate}
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
                    value={formData.applyBy}
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
                  label="Salary"
                  name="Salary"
                  variant="outlined"
                  value={formData.Salary}
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
                  label="Experience (Years)"
                  name="experience"
                  variant="outlined"
                  value={formData.experience}
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
                  label="About the Job"
                  name="aboutjob"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={formData.aboutjob}
                  onChange={handleChange}
                  error={Boolean(errors.aboutjob)}
                  helperText={errors.aboutjob}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Add Skill"
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
                  {formData.skills.map((skill) => (
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
                  label="Eligibility"
                  name="eligibility"
                  variant="outlined"
                  value={formData.eligibility}
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
                  label="About the Company"
                  name="aboutCompany"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={formData.aboutCompany}
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
                  label="Vacancies"
                  name="vacancies"
                  variant="outlined"
                  value={formData.vacancies}
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
                  label="Job Type"
                  name="jobType"
                  variant="outlined"
                  value={formData.jobType}
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
                <Button onClick={()=>Add_Jobs()} type="submit" variant="contained" color="primary" fullWidth>
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

export default Postjob;
