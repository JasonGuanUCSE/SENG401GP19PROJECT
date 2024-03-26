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
    // Expects 200 status code
    }, timeout);

    it("should return one product", async () => {
    // Mock getOneProduct function
    // Expects 200 status code
    }, timeout);

    it("should return products by category", async () => {
    // Mock getProductsByCategory function
    // Expects 200 status code
    }, timeout);
});