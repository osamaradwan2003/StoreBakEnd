import { Order, OrderModel } from "./../../../src/models/OrderModel";
import { config } from "dotenv";
config();
describe("OrderModelTest", () => {
  let model: OrderModel = new OrderModel();

  it("should create an instance of Order in database", async () => {
    const createOrder: Order = await model.createOrder({
      user_id: 1,
      product_id: 1,
      quantity: 1,
      status: "completed",
    } as Order);
    expect(createOrder.id).toBeDefined();
  });
});
