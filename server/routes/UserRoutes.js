const userController = require("../controllers/UserController");
const {authenticate} = require("../config/jwt");
module.exports = (app) => {
    app.post("/api/register", userController.register);
    app.post("/api/login", userController.login)
    app.post("/api/logout", userController.logout)
    app.get("/api/users", authenticate, userController.findAll);
}