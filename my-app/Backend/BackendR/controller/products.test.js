
const { addProduct ,
    getProductsByBoth, 
    getProductsByStore,
    getProductsByCategory,
    getOneProduct,
    getAllProducts
} = require('../controller/products.js');


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
        await getAllProducts(req, res);
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
        await getOneProduct(req, res);
        // Expects 200 status code
        expect(res.status).toHaveBeenCalledWith(200);
    }, timeout);

    it("should return products by category", async () => {
        // Mock getProductsByCategory function
        const req = {
            params: {
                category: "category"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await getProductsByCategory(req, res);
        // Expects 200 status code
        expect(res.status).toHaveBeenCalledWith(200);
    }, timeout);

    it("should return products by store", async () => {
        // Mock getProductsByStore function
        const req = {
            params: {
                store: "store"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await getProductsByStore(req, res);
        // Expects 200 status code
        expect(res.status).toHaveBeenCalledWith(200);
    }, timeout);

    it("should return products by store and category", async () => {
        // Mock getProductsByStoreAndCategory function
        const req = {
            params: {
                store: "store",
                category: "category"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await getProductsByBoth(req, res);
        // Expects 200 status code
        expect(res.status).toHaveBeenCalledWith(200);
    }, timeout);

    describe("Add product tests", () => {
        it('should return 400 if product id already exists', async () => {
            // Mock productExists function to return true

            const req = {
                body: {
                    id: 1,
                    // name: 'name',
                    description: 'description',
                    price: 10,
                    quantity: 1,
                    store: ['store'],
                    category: ['category'],
                    image: 'image',
                    Instock: true
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            jest.mock('../controller/products.js', () => jest.fn().mockResolvedValue(true));

            await addProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: expect.any(String) }); // Check if message is returned
        });
    });
});