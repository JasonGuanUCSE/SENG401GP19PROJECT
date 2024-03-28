const {
    getAllOrders,
    getOrderByID,
    getOrderByEmail,
    addOrder
} = require('./orders.js');

// Mock the orderModel
jest.mock("../model/orderModel");

afterEach(() => {
    jest.clearAllMocks();
});

describe("Order controller tests", () => {
    timeout = 10000; // timeout = 10 seconds
    it("should add an order", async () => {
        // Mock addOrder function
        const req = {
            body: {
                "orderID": "zurie1711581135288",
                "customerEmail": "zuriel123.abasola@gmail.com",
                "customerName": "Zuriel Abasola",
                "productID": [
                    2585,
                    1234
                ],
                "quantity": [
                    2,
                    1
                ],
                "totalPrice": 36.5,
                "date": "2024-03-27T23:12:15.364Z",
                "paymentMethod": "Credit Card",
                "store": "Walmart",
                "status": "paid",
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await addOrder(req, res);
        // Expects 200 status code
        expect(res.status).toHaveBeenCalledWith(201);
    }, timeout);

    it("fails to get all orders because of date", async () => {
        // Mock getAllOrders function
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await getAllOrders(req, res);
        // Expects 500 status code
        expect(res.status).toHaveBeenCalledWith(500);
    }   , timeout);


});