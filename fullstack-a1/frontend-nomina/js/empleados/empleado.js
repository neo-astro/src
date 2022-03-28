import { Empleado } from "./componente.js";
// import {Cargo} from '../cargo/componente'// instanciamos cargo
// import {Departamento} from '../departamento/componente'// instanciamos departamento



const serEmpleado = new Empleado();
const d = document;
const $formEmpleado = d.getElementById("form-empleado");

d.addEventListener("DOMContentLoaded",()=>{
  serEmpleado.obtenerEmpleados()
  d.addEventListener("submit",async(e)=>{
    e.preventDefault();
    //decodificar el id de cargo y empleado 
    let lista_cargos = await fetch("http://localhost:3000/cargos")
      .then((res) => res.json())
      .then((cargos) => cargos)

    let lista_departamentos = await fetch("http://localhost:3000/departamentos")
      .then((res) => res.json())
      .then((departamentos) => departamentos)


    let $descrip = d.getElementById("descripcion").value;
    let $estado = d.getElementById("activo").checked;
    let $sueldo = d.getElementById("sueldo").value;
    let $cedula = d.getElementById("cedula").value;
    let $cargo = d.getElementById("opciones-cargo").value
    let $departamento = d.getElementById("opciones-departamento").value

    if (serEmpleado.grabar) {

      // let $descrip = d.getElementById("descripcion").value;
      // let $estado = d.getElementById("activo").checked;
      // let $sueldo= d.getElementById("sueldo").value;
      // let $cedula= d.getElementById("cedula").value;


      let idcargo = lista_cargos.filter(cargo => cargo.descripcion == $cargo)[0].idcargo
      console.log("id cargo", idcargo);

      let iddepartamento = lista_departamentos.filter(departamento => departamento.descripcion == $departamento)[0].iddepartamento
      console.log("id departamento", iddepartamento);

      let id = Date.now();
      const empleado = {
        descripcion: $descrip,
        estado: $estado,
        sueldo: $sueldo,
        idcargo: idcargo,
        iddepartamento: iddepartamento,
        cedula: $cedula
      };
      const empleadoJson = JSON.stringify(empleado);
      const res = await serEmpleado.insertarDatos(empleadoJson);
      
    } else { //opcione actualizar
      //debo obtener el id de cargo y de deparatmento 
      let $descrip = d.getElementById("descripcion").value;
      let $estado = d.getElementById("activo").checked;
      let $sueldo = d.getElementById("sueldo").value;
      let $cedula = d.getElementById("cedula").value;
      let $cargo = d.getElementById("opciones-cargo").value
      let $departamento = d.getElementById("opciones-departamento").value


      let idcargo = lista_cargos.filter(cargo => cargo.descripcion == $cargo)[0].idcargo

      let id_departamento = lista_departamentos.filter(departamento => departamento.descripcion == $departamento)[0].iddepartamento

      
      let id = serEmpleado.id;
      const empleado = {
        descripcion: $descrip,
        estado: $estado,
        sueldo: $sueldo,
        idcargo: idcargo,
        iddepartamento: id_departamento,
        cedula: $cedula
      };
      const EmpleadoModJson = JSON.stringify(empleado);
      const res = await serEmpleado.modificarDatos(EmpleadoModJson, serEmpleado.id);
      //mostrar mensaje 
      console.log("elementos al actualizar", EmpleadoModJson, serEmpleado.id);
    }
    $formEmpleado.reset();

  })
});


// d.addEventListener("DOMContentLoaded",serEmpleado.obtenerEmpleados());

// // delegacion de eventos
// d.addEventListener("click", async (e) => {
//   // console.log("target de lo que di click",e.target);
//   // console.log("cargo elemento",d.getElementById("opciones-cargo"));

  
//   if (e.target.matches("#enviar")) {//le diste click a un elemto con id enviar
    
//     e.preventDefault();

//     //decodificar el id de cargo y empleado 
//     let lista_cargos  = await fetch("http://localhost:3000/cargos")
//         .then((res)=>res.json())
//         .then((cargos)=> cargos)

//     let lista_departamentos = await fetch("http://localhost:3000/departamentos")
//         .then((res)=>res.json())
//         .then((departamentos)=> departamentos)

    
//     let $descrip = d.getElementById("descripcion").value;
//     let $estado = d.getElementById("activo").checked;
//     let $sueldo= d.getElementById("sueldo").value;
//     let $cedula= d.getElementById("cedula").value;
//     let $cargo = d.getElementById("opciones-cargo").value
//     let $departamento = d.getElementById("opciones-departamento").value
    

    
//     if ($descrip.trim().length < 3) {
//       alert("Datos vacios o incompletos");
//     } else {

//       if (serEmpleado.grabar) {

//         // let $descrip = d.getElementById("descripcion").value;
//         // let $estado = d.getElementById("activo").checked;
//         // let $sueldo= d.getElementById("sueldo").value;
//         // let $cedula= d.getElementById("cedula").value;
    

//         let idcargo = lista_cargos.filter(cargo => cargo.descripcion == $cargo )[0].idcargo
//         console.log("id cargo",idcargo);
        
//         let iddepartamento = lista_departamentos.filter(departamento  => departamento.descripcion == $departamento)[0].iddepartamento
//         console.log("id departamento",iddepartamento);

//         let id = Date.now();
//         const empleado = { descripcion: $descrip, estado: $estado,sueldo: $sueldo,idcargo: idcargo,iddepartamento: iddepartamento,cedula: $cedula};
//         const empleadoJson = JSON.stringify(empleado);
//         const res = await serEmpleado.insertarDatos(empleadoJson);
//       } else {//opcione actualizar
//         //debo obtener el id de cargo y de deparatmento 
//         let $descrip = d.getElementById("descripcion").value;
//         let $estado = d.getElementById("activo").checked;
//         let $sueldo= d.getElementById("sueldo").value;
//         let $cedula= d.getElementById("cedula").value;
//         let $cargo = d.getElementById("opciones-cargo").value
//         let $departamento = d.getElementById("opciones-departamento").value

        
//         let idcargo = lista_cargos.filter(cargo => cargo.descripcion == $cargo )[0].idcargo
        
//         let id_departamento = lista_departamentos.filter(departamento  => departamento.descripcion ==$departamento )[0].iddepartamento
        
//         console.log("la lista de cargo al actualizar", lista_cargos.filter(cargo => cargo.descripcion ));
//         console.log("la lista de depars al actualizar", lista_departamentos.filter(departamento=> departamento.descripcion ));
//         console.log("la opcion de cargos para actualizar",$cargo);
//         console.log("la opcion de depar para actualizar",$departamento);
//         console.log("id cargo",idcargo);
//         console.log("id departamento",id_departamento);
//         let id = serEmpleado.id;
//         const empleado = {descripcion: $descrip, estado: $estado,sueldo: $sueldo,idcargo: idcargo,iddepartamento: id_departamento,cedula: $cedula };
//         const EmpleadoModJson = JSON.stringify(empleado);
//         const res = await serEmpleado.modificarDatos(EmpleadoModJson, serEmpleado.id);
//         //mostrar mensaje 
//         console.log("elementos al actualizar",EmpleadoModJson,serEmpleado.id);
//       }
//       $formEmpleado.reset();
//     }
//   }
// });


