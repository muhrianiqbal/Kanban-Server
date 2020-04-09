const router = require("express").Router();
const UserController = require("../controllers/user");
const TaskController = require("../controllers/task");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.use(authentication);
router.get("/task", TaskController.showAll);
router.post("/add", TaskController.add);
// router.use("/:id", authorization);
router.put("/:id/update", authorization, TaskController.update);
router.delete("/:id/delete", authorization, TaskController.delete);

module.exports = router;