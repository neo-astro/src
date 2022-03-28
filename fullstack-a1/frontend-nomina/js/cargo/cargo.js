import {
    Cargo
} from "./componente.js";
// instanciamos cargo
const serCargo = new Cargo();
const d = document;
const $formCargo = d.getElementById("form-cargo");


d.addEventListener("DOMContentLoaded", ()=>{
    
    try {
        serCargo.obtenerCargos()
        d.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("se envio", e.target);
            

            let $descrip = d.getElementById("descripcion").value;
            let $estado = d.getElementById("activo").checked;
            if (serCargo.grabar) {
                
                const cargo = {
                    descripcion: $descrip,
                    estado: $estado
                };
                const cargoJson = JSON.stringify(cargo);
                await serCargo.insertarDatos(cargoJson);
                
            } else {
                
                const cargo = {
                    descripcion: $descrip,
                    estado: $estado
                };
                const cargoModJson = JSON.stringify(cargo);
                await serCargo.modificarDatos(cargoModJson, serCargo.id);
                
            }
            $formCargo.reset();
        });

    }catch(e) {alert(e)}

});


