import UsersController from '../controllers/users';
import routes from '.'

jest.mock("../controllers/users");
jest.mock('express', () => ({
  Router: () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }),
}))

describe("routes", () => {
  it("registers routes", () => {
    expect(routes.get).toHaveBeenCalledWith("/users/:user_id", UsersController.get)
    expect(routes.post).toHaveBeenCalledWith("/users", UsersController.create)
    expect(routes.put).toHaveBeenCalledWith("/users/:user_id", UsersController.update)
    expect(routes.delete).toHaveBeenCalledWith("/users/:user_id", UsersController.delete)
  })
})