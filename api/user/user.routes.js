const router = require("express").Router();
const { checkToken } = require("../../auth/checkValidations");
const { createUser, loginUser, getUser } = require("./user.controller");

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/", checkToken, getUser);

module.exports = router;