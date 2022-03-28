"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// importar router
const express_1 = require("express");
// importacion de controladores(funciones) de cargo
const departamento_controller_1 = require("../controllers/departamento.controller");
// instanciar router - ruteador
const router = (0, express_1.Router)();
// rutas de cargos con "/"
router.route("/")
    .get(departamento_controller_1.getDepartamentos)
    .post(departamento_controller_1.createDepartamento);
// rutas de cargos con un id "/:cargoId"
router.route("/:departamentoId")
    .get(departamento_controller_1.getDepartamento)
    .delete(departamento_controller_1.deleteDepartamento)
    .put(departamento_controller_1.updateDepartamento);
exports.default = router;
