const service = require("../services/users.service");
const { NotFoundError } = require("../utils/errors");

exports.getUsers = (req, res, next) => {
  try {
    const users = service.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = (req, res, next) => {
  try {
    const user = service.getById(req.params.id);

    if (!user) {
      return next(new NotFoundError("User not found"));
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.createUser = (req, res, next) => {
  try {
    const user = service.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = (req, res, next) => {
  try {
    const updated = service.update(req.params.id, req.body);

    if (!updated) {
      return next(new NotFoundError("User not found"));
    }

    res.json({ message: "User updated" });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = (req, res, next) => {
  try {
    const deleted = service.remove(req.params.id);

    if (!deleted) {
      return next(new NotFoundError("User not found"));
    }

    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

exports.createBatchUsers = (req, res, next) => {
  try {
    const result = service.createMany(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.getRandomUsers = async (req, res, next) => {
  try {
    const users = await service.fetchRandomUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};