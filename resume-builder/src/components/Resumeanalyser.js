import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper, CircularProgress, Snackbar, Alert, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import UploadIcon from '@mui/icons-material/Upload';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Resumeanalyser = () => {
  const [file, setFile] = useState(null);
  const [resumeAnalysis, setResumeAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [field, setField] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [fileName, setFileName] = useState('No file chosen');

  const API_KEY = 'AIzaSyDPglACCrulnBIQsE9xuXA118rn16UiOQw'; // Replace with your Google API Key

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : 'No file chosen');
  };

  const uploadFile = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      setOpenSnackbar(true);
      return;
    }

    const fileSize = file.size;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError(null);

    try {
      const uploadResponse = await axios.post(
        `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${API_KEY}`,
        formData,
        {
          headers: {
            'X-Goog-Upload-Command': 'start, upload, finalize',
            'X-Goog-Upload-Header-Content-Length': fileSize,
            'X-Goog-Upload-Header-Content-Type': file.type,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const cd = uploadResponse.data;
      const fileUri = cd.file.uri;
      analyzeResume(fileUri);
    } catch (err) {
      setError('Error uploading the file: ' + err.message);
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  const analyzeResume = async (fileUri) => {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              role: 'user',
              parts: [
                {
                  fileData: {
                    fileUri: fileUri,
                    mimeType: file.type,
                  },
                },
                {
                  text: `Analyze my resume for field ${field} and provide a comprehensive assessment more important the header without comments and notations that includes a resume score out of 100, highlighting my strengths, areas of improvement, and skills to add. For strengths, identify key competencies and provide detailed descriptions of each, illustrating how they contribute to my career growth. For areas of improvement, list specific aspects that need enhancement, accompanied by actionable suggestions to make my resume more impactful. Identify skills I should add, categorized by field, and include a list of skills to improve in each field along with corresponding learning links. Additionally, suggest other jobs field that align with my current skills and experience, explaining why these roles are suitable. Finally, provide a list of project ideas, detailing the tech stack used and a description of each project's purpose and objectives. Ensure that the analysis is comprehensive, informative, and tailored to my career goals. Here is my resume: give text without star and double star`
                }
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 64,
            topP: 0.95,
            maxOutputTokens: 8192,
            responseMimeType: 'text/plain',
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const responseText = response.data.candidates[0].content.parts[0].text;
      setResumeAnalysis(responseText);
    } catch (err) {
      setError('Error analyzing the resume: ' + err.message);
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const cleanText = (text) => {
    return text
      .replace(/\*+/g, '') // Remove all stars
      .replace(/undefined/g, '') // Remove 'undefined'
      .trim(); // Remove extra whitespace
  };

  const renderResumeAnalysis = (analysisText) => {
    const lines = analysisText.split('\n');

    const renderHeading = (text) => (
      <Typography variant="h4" component="h2" sx={styles.heading}>
        <u>{cleanText(text)}</u>
      </Typography>
    );

    const renderBoldText = (text) => (
      <Typography variant="body1" component="strong" sx={styles.boldText}>
        {cleanText(text)}
      </Typography>
    );

    const renderParagraph = (text) => (
      <Typography variant="body1" component="p" sx={styles.text}>
        {cleanText(text)}
      </Typography>
    );

    const analysisContent = lines.map((line, index) => {
      if (line.startsWith('## ')) {
        return (
          <Box key={index} marginY={2}>
            {renderHeading(line.slice(3))}
          </Box>
        );
      }

      if (line.startsWith('*') && line.endsWith('*')) {
        return (
          <Box key={index} marginY={1}>
            {renderBoldText(line)}
          </Box>
        );
      }

      if (line.trim() !== '') {
        return (
          <Box key={index} marginY={1}>
            {renderParagraph(line)}
          </Box>
        );
      }

      return null;
    });

    return <Box sx={styles.analysisWrapper}>{analysisContent}</Box>;
  };

  return (
    <div style={{height:'100%'}}>
    <Box sx={styles.container}>
      <Typography variant="h3" component="h1" sx={styles.header}>
        Resume Analyzer
      </Typography>
      <Paper elevation={5} sx={styles.fileUploadContainer}>
        <input
          type="file"
          accept=".pdf"
          id="file-upload"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload">
          <Button
            variant="contained"
            component="span"
            sx={styles.chooseFileButton}
            startIcon={<UploadIcon />}
          >
            {fileName}
          </Button>
        </label>
        <TextField
          label="Enter Your Role"
          value={field}
          onChange={(e) => setField(e.target.value)}
          sx={styles.fieldInput}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={uploadFile}
          sx={styles.uploadButton}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={24} color="inherit" /> : null}
        >
          {loading ? 'Uploading...' : 'Upload and Analyze'}
        </Button>
      </Paper>
      {error && (
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity="error" icon={<ErrorOutlineIcon />}>
            {error}
          </Alert>
        </Snackbar>
      )}
      {resumeAnalysis && (
        <Paper elevation={5} sx={styles.analysisContainer}>
          <Typography variant="h4" component="h2" sx={styles.analysisHeader}>
            Resume Analysis
          </Typography>
          {renderResumeAnalysis(resumeAnalysis)}
        </Paper>
      )}
    </Box>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: ' auto',
    marginTop:'100px',
    padding: '60px',
    fontFamily: '"Roboto", sans-serif',
    lineHeight: '1.8',

    color: '#333',
    background: 'linear-gradient(to right, #74ebd5, #acb6e5)', // Gradient background
  },
  header: {
    textAlign: 'center',
    color: 'black',
    marginBottom: '30px',
    fontFamily: '"Pacifico", cursive',
    fontSize: '48px',
    fontWeight: 'bold',
  },
  fileUploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:'100%',
    padding: '30px',
    marginBottom: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  chooseFileButton: {
    marginBottom: '20px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '8px',
    backgroundColor: '#3498db',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#2980b9',
    },
  },
  fieldInput: {
    marginBottom: '20px',
    width: '100%',
  },
  uploadButton: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '8px',
    backgroundColor: '#e74c3c',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#c0392b',
    },
  },
  analysisContainer: {
    marginTop: '30px',
    padding: '40px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  analysisHeader: {
    color: '#2c3e50',
    marginBottom: '15px',
    fontSize: '26px',
    fontWeight: 'bold',
  },
  analysisWrapper: {
    marginTop: '20px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '10px',
    color: '#2c3e50',
  },
  boldText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  text: {
    fontSize: '16px',
    marginBottom: '10px',
    color: '#555',
  },
};

export default Resumeanalyser;
