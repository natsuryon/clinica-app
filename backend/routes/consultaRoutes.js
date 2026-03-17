const express = require("express");
const router = express.Router();

const consultaController = require("../controllers/consultaController");
const auth = require("../middleware/auth");

router.post("/agendar", auth, consultaController.agendar);
router.get("/listar", auth, consultaController.listar);

module.exports = router;
