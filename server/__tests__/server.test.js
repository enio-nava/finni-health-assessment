const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Server', () => {
  afterAll(async () => {
    // Close the server after all tests
    await mongoose.connection.close();
  });

  describe('GET /', () => {
    it('should return a welcome message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Welcome');
    });
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/non-existent-route');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message');
    });
  });
});
