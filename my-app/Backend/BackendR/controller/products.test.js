const products = require("./products.js");

// Mock the productsModel
jest.mock("../model/productsModel");

afterEach(() => {
    jest.clearAllMocks();
});

describe("Product controller tests", () => {
    timeout = 10000; // timeout = 10 seconds
    it("should return all products", async () => {
        // Mock getAllProducts function
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await products.getAllProducts(req, res);
        // Expects 200 status code
        expect(res.status).toHaveBeenCalledWith(200);
    }, timeout);

    it("should return one product", async () => {
        // Mock getOneProduct function
        const req = {
            params: {
                id: 1
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await products.getOneProduct(req, res);
        // Expects 200 status code
        expect(res.status).toHaveBeenCalledWith(200);
    }, timeout);

    it("should return products by category", async () => {
    // Mock getProductsByCategory function
    // Expects 200 status code
    }, timeout);
});