import { Product, ProductModel } from "./../../../src/models/ProductModel";
import { config } from "dotenv";
config();
describe("ProductModelTest", () => {
  let model: ProductModel = new ProductModel();

  it("should create an instance of Product in database", async () => {
    const createProduct: Product = await model.createProduct({
      name: "product 1",
      price: 200,
      category: "Technology",
      description: "this is product 1",
    } as Product);
    expect(createProduct.id).toBeDefined();
  });
});
