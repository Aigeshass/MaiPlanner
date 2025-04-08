import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TermsOfServicePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Terms of Service</Typography>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
      
      <Box className="terms-container" sx={{ 
        fontFamily: 'Arial, sans-serif', 
        color: '#333',
        '& h1, & h2, & h3': { fontFamily: 'Arial, sans-serif' },
        '& p': { mb: 2, lineHeight: 1.6 }
      }}>
        <Typography variant="h5" component="h1" gutterBottom>
          TERMS OF SERVICE
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Last updated April 08, 2025
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ mt: 3 }}>
          These Terms of Service ("Terms") govern your access to and use of MaiPlanner ("we," "our," or "us") 
          website, applications, and services (collectively, the "Services"). Please read these Terms carefully 
          before using the Services.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 3 }}>
          1. ACCEPTANCE OF TERMS
        </Typography>
        <Typography variant="body1" paragraph>
          By accessing or using the Services, you agree to be bound by these Terms and our Privacy Policy. 
          If you do not agree to these Terms, you may not access or use the Services.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          2. CHANGES TO TERMS
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to modify these Terms at any time. We will provide notice of any material 
          changes by posting the updated Terms on our website or through other communications. Your 
          continued use of the Services after such changes constitutes your acceptance of the new Terms.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          3. ACCOUNT REGISTRATION
        </Typography>
        <Typography variant="body1" paragraph>
          To access certain features of the Services, you may need to register for an account. You agree 
          to provide accurate, current, and complete information during registration and to update such 
          information to keep it accurate, current, and complete. You are solely responsible for 
          safeguarding your account credentials and for any activity that occurs under your account.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          4. USER RESPONSIBILITIES
        </Typography>
        <Typography variant="body1" paragraph>
          When using our Services, you agree not to:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <li>Violate any applicable law, regulation, or third-party rights</li>
          <li>Use the Services in any manner that could disable, overburden, or impair the Services</li>
          <li>Use any robot, spider, or other automated device to access or use the Services</li>
          <li>Attempt to gain unauthorized access to any portion of the Services</li>
          <li>Use the Services for any illegal or unauthorized purpose</li>
          <li>Transmit any viruses, worms, defects, Trojan horses, or other items of a destructive nature</li>
        </Box>

        <Typography variant="h6" component="h2" gutterBottom>
          5. INTELLECTUAL PROPERTY
        </Typography>
        <Typography variant="body1" paragraph>
          The Services and all content, features, and functionality thereof, including but not limited to all 
          information, software, text, displays, images, video, and audio, and the design, selection, and 
          arrangement thereof, are owned by MaiPlanner, its licensors, or other providers of such material 
          and are protected by copyright, trademark, patent, trade secret, and other intellectual property or 
          proprietary rights laws.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          6. GOOGLE CALENDAR API SERVICES
        </Typography>
        <Typography variant="body1" paragraph>
          Our application uses Google APIs. By using our service, you are also agreeing to be bound by the 
          Google Terms of Service. Additionally, our use and transfer to any other app of information received 
          from Google APIs will adhere to <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, 
          including the Limited Use requirements.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          7. LIMITATION OF LIABILITY
        </Typography>
        <Typography variant="body1" paragraph>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL MAIPLANNER, ITS 
          AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS 
          BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION 
          WITH YOUR USE, OR INABILITY TO USE, THE SERVICES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, 
          INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          8. DISCLAIMER OF WARRANTIES
        </Typography>
        <Typography variant="body1" paragraph>
          THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY 
          KIND, EITHER EXPRESS OR IMPLIED. NEITHER MAIPLANNER NOR ANY PERSON ASSOCIATED WITH MAIPLANNER 
          MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, 
          QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICES.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          9. TERMINATION
        </Typography>
        <Typography variant="body1" paragraph>
          We may terminate or suspend your access to the Services immediately, without prior notice or 
          liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon 
          termination, your right to use the Services will immediately cease.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          10. GOVERNING LAW
        </Typography>
        <Typography variant="body1" paragraph>
          These Terms shall be governed by the laws of Hong Kong, without regard to its conflict of law principles. 
          Any legal suit, action, or proceeding arising out of, or related to, these Terms or the Services shall 
          be instituted exclusively in the courts of Hong Kong.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          11. CONTACT US
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about these Terms, please contact us at support@maiplanner.com.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsOfServicePage;
