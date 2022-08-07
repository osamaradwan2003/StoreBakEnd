import app from "../../../src/server";
import supertest from "supertest";

const request = supertest(app);

describe("userRouter endpoints Tests", () => {
  let userId: string = "1";
  beforeAll(async () => {
    const response = await request
      .post("/users")
      .send({
        fristName: "malek",
        lastName: "Radwan",
        email: "malek" + Math.round(Math.random() * 1000) + "@gmail.com",
        password: "123456",
      })
      .set("Accept", "application/json")
      .expect(201)
      .then((res) => {
        process.env.TOKEN = res.body.token;
      })
      .catch((err) => {
        //@ts-ignore
        throw err;
      });
  });

  it("GET /users and should return 200 OK", async () => {
    let response = await request
      .get("/users")
      .set("Authorization", "Bearer " + process.env.TOKEN)
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
  });
  it("GET /user:id and should return 200OK", async () => {
    let response = await request
      .get("/users/" + userId)
      .set("Authorization", "Bearer " + process.env.TOKEN)
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
  });
});

describe("Product Routes endpoints Tests", () => {
  it("GET /products and should return list  of  Products and status 200OK ", async () => {
    let response = await request
      .get("/products")
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
  });
  it("GET /products and should return Product and status 200OK", async () => {
    let response = await request
      .get("/products/1")
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
  });
  it("Post /products and should create Product and retrun it with status 201OK", async () => {
    let response = await request
      .post("/products/")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + process.env.TOKEN)
      .send({
        name: "product 6",
        price: 200,
        category: "Health",
        description: "this is product 6",
      });
    expect(response.status).toBe(201);
  });

  it("GET /products/category/catname and should return Product by category Name with status 200OK", async () => {
    let response = await request
      .get("/products/category/technology")
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
  });
  it("GET /products/mostpepoular and should return Product by category Name with status 200OK", async () => {
    let response = await request
      .get("/products/mostpepoular")
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
  });
});

describe("Order Routes endpoints Tests", () => {
  it("GET /orders/:user_id and should return list  of  orders and status 200OK ", async () => {
    let response = await request
      .get("/orders/1")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + process.env.TOKEN);
    expect(response.status).toBe(200);
  });
  it("GET /orders/:user_id/completed and should return list  of  orders and status 200OK ", async () => {
    let response = await request
      .get("/orders/1/completed")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + process.env.TOKEN);
    expect(response.status).toBe(200);
  });
  it("Crete Order :-> Post /orders/:user_id and should create order and retrun it with status 201OK", async () => {
    let response = await request
      .post("/orders/1")
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + process.env.TOKEN)
      .send({
        user_id: 1,
        product_id: 1,
        quantity: 1,
        status: "pending",
      });
    process.env.order_id = response.body.id;
    expect(response.status).toBe(201);
  });

  it("Update Order :-> Put /orders/:user_id/:order_id and should create order and retrun it with status 202 OK", async () => {
    let response = await request
      .put("/orders/1/" + process.env.order_id)
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + process.env.TOKEN)
      .send({
        quantity: 2,
        status: "completed",
      });
    expect(response.status).toBe(202);
  });
});
