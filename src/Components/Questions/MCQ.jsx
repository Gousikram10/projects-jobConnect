import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTimer } from 'react-timer-hook';
import { Box, Button, Container, Typography, Paper, RadioGroup, FormControlLabel, Radio, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import './MCQ.css';
import { useParams } from 'react-router-dom';

const MCQ = () => {
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [resources, setResources] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [Det, setJob] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/jobs/${id}`);
        setJob(response.data);
        setSkills(response.data.skills || []);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };
    fetchJob();
  }, [id]);

  const handleSkillChange = (event) => {
    setSelectedSkill(event.target.value);
  };

  const handleSubmit = () => {
    if (!mcqs) return;

    const result = mcqs.map((mcq, index) => {
      const isCorrect = selectedAnswers[index] === mcq.answer;
      return {
        ...mcq,
        selectedAnswer: selectedAnswers[index],
        isCorrect
      };
    });
    const correctAnswers = result.filter((r) => r.isCorrect).length;
    setScore(correctAnswers);
    setResults(result);
    pause();
  };

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

  const { seconds, minutes, start, pause, restart } = useTimer({
    expiryTimestamp: time,
    onExpire: handleSubmit,
  });

  async function generateAnswer() {
    if (!selectedSkill) {
      setError('Please select a skill.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setQuizStarted(false);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDPglACCrulnBIQsE9xuXA118rn16UiOQw",
        {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `give 5 mcq test about ${selectedSkill} with only 4 options with short explanations run more faster\n`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 1,
            topK: 64,
            topP: 0.95,
            maxOutputTokens: 8192,
            responseMimeType: "application/json"
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const responseText = response.data.candidates[0].content.parts[0].text;
      const parsedResponse = JSON.parse(responseText);
      
      setMcqs(parsedResponse.questions || []);
      setQuizStarted(true);
      restart(time, false);
      start();
    } catch (error) {
      console.error('Error fetching MCQs:', error);
      setError('An error occurred while fetching the MCQs.');
    } finally {
      setLoading(false);
    }
  }

  const fetchResources = async () => {
    setLoading(true);
    setError(null);
    setResources([]);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDPglACCrulnBIQsE9xuXA118rn16UiOQw",
        {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `generate resources  for ${selectedSkill} in heading and links like {resources: Array(2)}
resources
: 
Array(2)
0
: 
heading
: 
"C++ Resources"
links
: 
Array(4)
0
: 
{name: 'C++ Reference', url: 'https://www.cplusplus.com/reference/'}
1
: 
{name: 'C++ Tutorial', url: 'https://www.tutorialspoint.com/cplusplus/'}
2
: 
{name: 'C++ Documentation', url: 'https://en.cppreference.com/w/'}
3
: 
{name: 'C++ Standard', url: 'https://isocpp.org/std/'}
length
: 
4
[[Prototype]]
: 
Array(0)
[[Prototype]]
: 
Object
1
: 
{heading: 'JavaScript Resources', links: Array(4)}
length
: 
2
[[Prototype]]
: 
Array(0)
[[Prototype]]
: 
Object\n`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 1,
            topK: 64,
            topP: 0.95,
            maxOutputTokens: 8192,
            responseMimeType: "application/json"
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const responseText = response.data.candidates[0].content.parts[0].text;
      const parsedResponse = JSON.parse(responseText);
      console.log(parsedResponse);

      setResources(parsedResponse.resources || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setError('An error occurred while fetching the resources.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (questionIndex, option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: option
    }));
  };

  return (
    <div className="body2">
      <Container maxWidth="md">
        <Paper elevation={3} className="app">
          <Typography variant="h4" gutterBottom>MCQ TEST</Typography>
          
          {/* Skill Selection */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Skill</InputLabel>
            <Select
              value={selectedSkill}
              onChange={handleSkillChange}
              label="Select Skill"
            >
              {skills.map((skill, index) => (
                <MenuItem key={index} value={skill}>{skill}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button className='generate-btn' onClick={generateAnswer} disabled={loading} variant="contained" color="primary">
            {loading ? 'Generating...' : 'START TEST'}
          </Button>
          
          {quizStarted && (
            <div className='timer'>
              <Typography variant="h4">Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Typography>
            </div>
          )}

          {mcqs && mcqs.length > 0 && !results && (
            <div className='mcq-container'>
              <Typography variant="h5" gutterBottom>Generated MCQs</Typography>
              <ol>
                {mcqs.map((mcq, index) => (
                  <li key={index} className='mcq-item'>
                    <Typography variant="subtitle1"><strong>Question:</strong> {mcq.question}</Typography>
                    <RadioGroup>
                      {mcq.options.map((option, i) => (
                        <FormControlLabel
                          key={i}
                          control={<Radio />}
                          label={option}
                          value={option}
                          checked={selectedAnswers[index] === option}
                          onChange={() => handleOptionChange(index, option)}
                        />
                      ))}
                    </RadioGroup>
                  </li>
                ))}
              </ol>
              <Button className='submit-btn' onClick={handleSubmit} variant="contained" color="primary">Submit Answers</Button>
            </div>
          )}

          {results && (
            <div className='results-container'>
              <Typography variant="h5" gutterBottom>Results</Typography>
              <ol>
                {results.map((result, index) => (
                  <li key={index} className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                    <Typography variant="subtitle1"><strong>Question:</strong> {result.question}</Typography>
                    <Typography variant="subtitle1"><strong>Your Answer:</strong> {result.selectedAnswer}</Typography>
                    <Typography variant="subtitle1" className={`result-status ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                      {result.isCorrect ? 'Correct' : 'Incorrect'}
                    </Typography>
                    <Typography variant="subtitle1"><strong>Explanation:</strong> {result.explanation}</Typography>
                  </li>
                ))}
              </ol>
              <Typography variant="h2" className='score1'> 
                You scored {score} out of {results.length}
              </Typography>
              <div className='button-align'>
                <Button className='retry-btn' onClick={() => window.location.reload()} variant="contained" color="secondary" sx={{marginRight:'30px'}}>Try Again</Button>
                <Button className='resources-btn' onClick={fetchResources} variant="contained" color="primary">Get Resources</Button>
              </div>
            </div>
          )}

          {resources.length > 0 && (
            <div className='resources-container'>
              <Typography variant="h5" gutterBottom>Learning Resources</Typography>
              {resources.map((resourceGroup, index) => (
                <div key={index} className='resource-group'>
                  <Typography variant="h6">{resourceGroup.heading}</Typography>
                  <ul>
                    {resourceGroup.links.map((link, linkIndex) => (
                      <li key={linkIndex} className='resource-item'>
                        <Typography variant="subtitle1">
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.name}
                          </a>
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default MCQ;
