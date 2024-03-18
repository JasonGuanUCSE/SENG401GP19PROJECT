const mongoose = require('../server/node_modules/mongoose');
const Users = require('../model/model');
const server = require('./server'); // Import your server
const supertest = require('supertest');
const request = supertest(server); // Pass your server to supertest

// Mock mongoose's find and findOne methods
jest.mock('mongoose');
mongoose.find = jest.fn();
mongoose.findOne = jest.fn();

describe('Users controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllUsers returns all users', async () => {
    const mockUsers = [{ name: 'John Doe', email: 'john@example.com' }, { name: 'Jane Doe', email: 'jane@example.com' }];
    mongoose.find.mockResolvedValue(mockUsers);

    const response = await request.get('/api/Jstacart/Users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  test('emailExists returns true if email exists', async () => {
    const mockEmail = 'john@example.com';
    mongoose.findOne.mockResolvedValue({ email: mockEmail });

    const exists = await Users.emailExists(mockEmail);

    expect(exists).toBe(true);
  });

  test('emailExists returns false if email does not exist', async () => {
    const mockEmail = 'john@example.com';
    mongoose.findOne.mockResolvedValue(null);

    const exists = await Users.emailExists(mockEmail);

    expect(exists).toBe(false);
  });
});