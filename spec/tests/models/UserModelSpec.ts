import { config } from "dotenv";
import { UserModel, User } from "../../../src/models/UserModel";
config();
describe("UserModelTest", () => {
  let userModel: UserModel = new UserModel();

  it("should create an instance of User in database", async () => {
    const createdUser: User = await userModel.createUser({
      fristName: "John",
      lastName: "Doe",
      email: "test@gmail.com",
      password: "test",
    } as User);
    expect(createdUser.id).toBeDefined();
  });
});
