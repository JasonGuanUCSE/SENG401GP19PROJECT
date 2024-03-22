const request = require('../node_modules/supertest');
const { getAllUsers, getOneUser } = require('./users');
const Users = require('../model/userModel');

jest.mock('../model/userModel');

describe('User Controller', () => {
  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [{ name: 'John Doe', email: 'john@example.com' }];
      Users.find.mockResolvedValue(mockUsers);

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn(() => res),
      };

      await getAllUsers(req, res);
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });
  });

  describe('getOneUser', () => {
    it('should return one user', async () => {
      const mockUser = { name: 'John Doe', email: 'john@example.com' };
      Users.findOne.mockResolvedValue(mockUser);

      const req = { params: { name: 'John Doe' } };
      const res = {
        json: jest.fn(),
        status: jest.fn(() => res),
      };

      await getOneUser(req, res);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
  });
});