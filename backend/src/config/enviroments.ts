require('dotenv').config();

export default {
  serverPort: process.env.SERVER_PORT || 5000,
  frontEndUrl: process.env.FRONTEND_URL || 'http://127.0.0.1:3000',
  backendServerUrl: process.env.BACKEND_SERVER_URL || 'http://127.0.0.1:5000'
}