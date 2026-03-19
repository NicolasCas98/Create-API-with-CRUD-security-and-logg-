const express = require("express");
const { body } = require("express-validator");

const controller = require("../controllers/users.controller");
const validate = require("../middlewares/validate.middleware");

const router = express.Router();

const userValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  validate
];

router.post("/random", controller.getRandomUsers);
router.get("/random", controller.getRandomUsers);
router.post("/batch-users", controller.createBatchUsers);

router.get("/", controller.getUsers);
router.post("/", userValidation, controller.createUser);

router.get("/:id", controller.getUserById);
router.put("/:id", userValidation, controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;