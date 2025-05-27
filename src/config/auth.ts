export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-key-for-dev',
  },
};