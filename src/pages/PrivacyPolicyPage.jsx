import React from 'react';
import { Box, Container, Typography, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Privacy Policy</Typography>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
      
      <Box className="privacy-container" sx={{ 
        fontFamily: 'Arial, sans-serif', 
        color: '#333',
        '& h1, & h2, & h3': { fontFamily: 'Arial, sans-serif' },
        '& p': { mb: 2, lineHeight: 1.6 }
      }}>
        <Typography variant="h5" component="h1" gutterBottom>
          PRIVACY POLICY
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Last updated April 08, 2025
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="body1" paragraph sx={{ mt: 3 }}>
          MaiPlanner ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how 
          we collect, use, and safeguard your information when you use our website and services (collectively, the "Services").
          We respect your privacy and are dedicated to transparent data practices.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4, color: '#646cff', fontWeight: 600 }}>
          1. INFORMATION WE COLLECT
        </Typography>
        <Typography variant="body1" paragraph>
          We collect several types of information from and about users of our Services:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <li>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>Personal Information:</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              This includes email addresses, names, and profile information when you create an account.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>Calendar Data:</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              When you connect your calendar, we access your schedule details to provide our services.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>Usage Data:</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Information about how you interact with our Services, including features used and time spent.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>Device Information:</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Technical data such as browser type, IP address, device type, and operating system.
            </Typography>
          </li>
        </Box>

        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4, color: '#646cff', fontWeight: 600 }}>
          2. HOW WE USE YOUR INFORMATION
        </Typography>
        <Typography variant="body1" paragraph>
          We use the information we collect to:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <li>Provide, maintain, and improve our Services</li>
          <li>Process and complete transactions</li>
          <li>Send administrative information, such as updates, security alerts, and support messages</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Personalize your experience and deliver content relevant to your interests</li>
          <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
          <li>Detect, prevent, and address technical issues</li>
        </Box>

        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4, color: '#646cff', fontWeight: 600 }}>
          3. GOOGLE API SERVICES
        </Typography>
        <Typography variant="body1" paragraph>
          Our application uses Google APIs to access calendar data. Our use and transfer of information received from 
          Google APIs to any other app will adhere to the 
          <a href="https://developers.google.com/terms/api-services-user-data-policy" style={{ color: '#646cff', marginLeft: '5px' }} target="_blank" rel="noopener noreferrer">
            Google API Services User Data Policy
          </a>, including the Limited Use requirements.
        </Typography>
        <Typography variant="body1" paragraph>
          Specifically, we only access the calendar data necessary to provide our scheduling and planning services. 
          We do not sell this data, use it for advertising, or transfer it to third parties except as necessary 
          to provide our services.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4, color: '#646cff', fontWeight: 600 }}>
          4. DATA SHARING AND DISCLOSURE
        </Typography>
        <Typography variant="body1" paragraph>
          We may share your information in the following situations:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <li>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>Service Providers:</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              We may share data with trusted third parties who help us operate our Services.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>Business Transfers:</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              If we are involved in a merger, acquisition, or asset sale, your information may be transferred.
            </Typography>
          </li>
          <li>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>Legal Requirements:</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              We may disclose information if required by law, regulation, or legal process.
            </Typography>
          </li>
        </Box>

        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4, color: '#646cff', fontWeight: 600 }}>
          5. DATA SECURITY
        </Typography>
        <Typography variant="body1" paragraph>
          We implement appropriate technical and organizational measures to protect your personal information 
          against unauthorized access, alteration, disclosure, or destruction. However, no method of 
          transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute 
          security.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4, color: '#646cff', fontWeight: 600 }}>
          6. YOUR PRIVACY RIGHTS
        </Typography>
        <Typography variant="body1" paragraph>
          Depending on your location, you may have certain rights regarding your personal information:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <li>Right to access your personal information</li>
          <li>Right to correct inaccurate or incomplete information</li>
          <li>Right to request deletion of your personal information</li>
          <li>Right to restrict or object to processing of your data</li>
          <li>Right to data portability</li>
          <li>Right to withdraw consent at any time</li>
        </Box>
        <Typography variant="body1" paragraph>
          To exercise these rights, please contact us using the information in the "Contact Us" section.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4, color: '#646cff', fontWeight: 600 }}>
          7. COOKIES AND TRACKING TECHNOLOGIES
        </Typography>
        <Typography variant="body1" paragraph>
          We use cookies and similar tracking technologies to track activity on our Services and hold certain 
          information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
        </Typography>
        <Typography variant="body1" paragraph>
          We use these technologies for:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mb: 2 }}>
          <li>Remembering your preferences and settings</li>
          <li>Understanding how you use our Services</li>
          <li>Authenticating users and maintaining session information</li>
          <li>Improving our Services based on usage patterns</li>
        </Box>
        <Typography variant="body1" paragraph>
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
          However, if you do not accept cookies, some parts of our Services may not function properly.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4, color: '#646cff', fontWeight: 600 }}>
          8. CHILDREN'S PRIVACY
        </Typography>
        <Typography variant="body1" paragraph>
          Our Services are not intended for children under the age of 13. We do not knowingly collect personally 
          identifiable information from children under 13. If you are a parent or guardian and you believe that 
          your child has provided us with personal information, please contact us so that we can take necessary actions.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4, color: '#646cff', fontWeight: 600 }}>
          9. CHANGES TO THIS PRIVACY POLICY
        </Typography>
        <Typography variant="body1" paragraph>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
          the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review 
          this Privacy Policy periodically for any changes.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4, color: '#646cff', fontWeight: 600 }}>
          10. CONTACT US
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us at:
        </Typography>
        <Box sx={{ pl: 4, mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 0.5 }}>Email: privacy@maiplanner.com</Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>Address: 123 Tech Street, Suite 456, Hong Kong</Typography>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Typography variant="body2" paragraph sx={{ fontStyle: 'italic', color: '#666' }}>
          By using our Services, you acknowledge that you have read and understand this Privacy Policy 
          and agree to its terms.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicyPage;
