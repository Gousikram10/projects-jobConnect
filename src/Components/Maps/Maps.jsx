import React, { useContext, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import osm from './osm-providers';
import L from 'leaflet';
import axios from 'axios';
import './Maps.css';
import { JobContext } from '../TotalContext.jsx/TotalContext';
import { Card, Button, TextField, Box, Grid, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export const Maps = () => {
    const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
    const [zoom, setZoom] = useState(7);

    const markicon = new L.Icon({
        iconUrl: require('./placeholder.png'),
        iconSize: [35, 45],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
    });

    const { data1 } = useContext(JobContext);
    const [maploc, setMaploc] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [filters, setFilters] = useState({ city: '', address: '' });

    const fetaddress = async () => {
        const jobsWithCoordinates = await Promise.all(
            data1.map(async (job) => {
                const { lat, lon } = await geocodeAddress(job.city);
                return {
                    ...job,
                    latitude: lat,
                    longitude: lon,
                };
            })
        );
        setMaploc(jobsWithCoordinates);
        setFilteredJobs(jobsWithCoordinates);
    };

    const geocodeAddress = async (address) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
            );
            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                return { lat: parseFloat(lat), lon: parseFloat(lon) };
            }
        } catch (error) {
            console.error('Geocoding error:', error);
        }
        return { lat: 37.7749, lon: -122.4194 };
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = async () => {
        const filtered = filterJobs(filters);
        if (filtered.length > 0) {
            setCenter({ lat: filtered[0].latitude, lng: filtered[0].longitude });
            setZoom(10);
        } else if (filters.city || filters.address) {
            const { lat, lon } = await geocodeAddress(`${filters.city} ${filters.address}`);
            setCenter({ lat, lon });
            setZoom(10);
        }
    };

    const filterJobs = (filterValues) => {
        const { city, address } = filterValues;
        const filtered = maploc.filter(job => {
            return (
                (city === '' || job.city.toLowerCase().includes(city.toLowerCase())) &&
                (address === '' || job.address.toLowerCase().includes(address.toLowerCase()))
            );
        });
        setFilteredJobs(filtered);
        return filtered;
    };

    const handleReset = () => {
        setFilters({ city: '', address: '' });
        setFilteredJobs(maploc);
        setCenter({ lat: 13.084622, lng: 80.248357 });
        setZoom(15);
    };

    const handleMarkerClick = (lat, lng) => {
        setCenter({ lat, lng });
        setZoom(15); // Adjust the zoom level as needed
    };

    return (
        <Box className='Maps' sx={{ p: 2, bgcolor: '#e3f2fd', minHeight: '100vh' }}>
            <Paper elevation={6} sx={{ p: 3, mb: 4, bgcolor: '#ffffff', borderRadius: 3, boxShadow: '0 6px 12px rgba(0,0,0,0.1)' }}>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={12} textAlign="center">
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e88e5', mb: 2 }}>React Leaflet Map</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Filter by City"
                            variant="outlined"
                            name="city"
                            value={filters.city}
                            onChange={handleFilterChange}
                            sx={{ bgcolor: '#f5f5f5', borderRadius: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Filter by Address"
                            variant="outlined"
                            name="address"
                            value={filters.address}
                            onChange={handleFilterChange}
                            sx={{ bgcolor: '#f5f5f5', borderRadius: 1 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={2} textAlign="center">
                        <Button variant="contained" color="primary" onClick={fetaddress} sx={{ borderRadius: 2 }}>Get Locations</Button>
                    </Grid>
                    <Grid item xs={12} sm={4} md={2} textAlign="center">
                        <Button variant="outlined" color="secondary" onClick={handleReset} sx={{ borderRadius: 2 }}>Reset</Button>
                    </Grid>
                    <Grid item xs={12} sm={4} md={2} textAlign="center">
                        <Button variant="contained" color="primary" onClick={applyFilters} sx={{ borderRadius: 2 }}>Apply Filters</Button>
                    </Grid>
                </Grid>
            </Paper>
            <Card sx={{ p: 3, bgcolor: '#ffffff', borderRadius: 3, boxShadow: '0 6px 12px rgba(0,0,0,0.1)' }}>
                <Box sx={{ height: '600px', width: '100%' }}>
                    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%', borderRadius: '12px' }}>
                        <TileLayer 
                            url={osm.maptiler.url} 
                            attribution={osm.maptiler.attribution} 
                        />
                        {filteredJobs.map((job, index) => (
                            <Marker 
                                key={index} 
                                position={[job.latitude, job.longitude]} 
                                icon={markicon}
                                eventHandlers={{
                                    click: () => {
                                        handleMarkerClick(job.latitude, job.longitude);
                                    },
                                }}
                            >
                                <Popup>
                                    <img src={job.image} style={{height:'120px',width:'190px'}} alt={`${job.companyName} logo`}></img>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize:'25px', color: 'black' }}>{job.companyName}</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2', fontSize:'20px' }}>City: {job.city}</Typography>
                                    <Typography variant="body2" sx={{ color: '#555555', fontSize:'16px' }}>Address: {job.address}</Typography>
                                    <Typography variant="body2" sx={{ color: '#388e3c', fontSize:'16px' }}>Salary: ${job.Salary}</Typography>
                                    <Typography variant="body2" sx={{ color: '#7b1fa2', fontSize:'16px' }}>Qualification: {job.eligibility}</Typography>
                                    <Typography variant="body2" sx={{ color: '#f57c00', fontSize:'16px' }}>Job Type: {job.jobType}</Typography>
                                    <Link to={`/list/${job.id}`} target='_blank'><button className='map-btn'>apply</button></Link>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </Box>
            </Card>
        </Box>
    );
};
