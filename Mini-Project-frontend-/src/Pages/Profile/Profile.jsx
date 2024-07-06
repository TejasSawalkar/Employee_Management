import React from 'react';
import { Box, Container, Typography, Avatar, Button } from '@mui/material';

const AdminProfile = () => {
  // You can fetch admin details from an API or use static data
  const adminDetails = {
    name: 'Raj Gaikwad',
    email: 'raj@gmail.com',
    avatar: '/static/images/avatar/2.jpg'
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar alt={adminDetails.name} src={adminDetails.avatar} sx={{ width: 100, height: 100 }} />
        <Typography variant="h4" component="h1" sx={{ mt: 2 }}>
          {adminDetails.name}
        </Typography>
        <Typography variant="h6" component="h2" color="textSecondary">
          {adminDetails.email}
        </Typography>
        {/* Add more profile details or actions here */}
        <Button variant="contained" sx={{ mt: 4 }}>Edit Profile</Button>
      </Box>
    </Container>
  );
};

export default AdminProfile;
