const { UserRepository } = require("../../../src/respositories");
const mockingoose = require("mockingoose").default;
const { User } = require("../../../src/models");
let {
  UserModelMock: { user, users },
} = require("../../mocks");

describe("User Repository Test", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it("Should return a user by id", async () => {
    const _user = { ...user };
    delete _user.password;
    mockingoose(User).toReturn(user, "findOne");

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.get(_user._id);

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });

  it("Should update an specific user by id", async() => {
    const _user = { ...user };
    delete _user.password;
    mockingoose(User).toReturn(user, "findOneAndUpdate");

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.updated(_user._id, {
      name: "Broly"
    });

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });

  it("Should delete an especific user by id", async() => {
    mockingoose(User).toReturn(user, "findOneAndDelete");

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.delete(user._id);

    expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
  })
});
