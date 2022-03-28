// import { Cargo } from "../cargo/componente";
// import {Departamento} from "../departamento/departamento"
import {
  getOpcionesDepartamento,
  getOpcionesCargo
} from './opciones.js';

export class Empleado {
  // se ejecuta al instanciar la clea y crea los atributos con this
  constructor() {
    this.id = "";
    this.grabar = true;
    this.url = "http://localhost:3000/empleados";
    this.urlcargo = "http://localhost:3000/cargos"
    this.urldepartamento = "http://localhost:3000/departamentos"
    getOpcionesCargo()
    getOpcionesDepartamento()
  }


  //obtiene la info de la db y la muestra en la tabla
  async obtenerEmpleados(){
    
    let lista_cargos = await fetch(this.urlcargo)
      .then((response) => response.json())
      .then((cargos) => cargos)

    let lista_departamentos = await fetch(this.urldepartamento)
      .then((response) => response.json())
      .then((departamentos) => departamentos)
    
      console.log("los datos del fetch cargo",lista_cargos);
      fetch(this.url)
      .then((response) => response.json())
      .then((empleados) => {
        let filas = ""
        let cont = 0
        
        empleados.forEach((empleado)=>{
          let {idempleado,idcargo,sueldo,cedula,descripcion,estado,iddepartamento} = empleado
          
          //cambiando los idcargo/iddepar por sus decripcion
          let cargo =  lista_cargos.filter(cargo => cargo.idcargo == idcargo)[0].descripcion
          let departamento = lista_departamentos.filter(departamento => departamento.iddepartamento==iddepartamento)[0].descripcion
          
          console.log("solo cargo descripcion",cargo);
          console.log("solo departamento descripcion",departamento);
          
          cont +=1
          filas += `
        <tr>
        <td>${idempleado}</td>
        <td>${descripcion}</td>
        <td>${cedula}</td>
        <td>${cargo}</td>
        <td>${departamento}</td>
        <td>${sueldo}</td>
        <td>${estado ? "Activo" : "Inactivo"}</td>
        <td>
        <button type="button" class="btn btn-edit" id="btn-edit" data-id="${idempleado}">✏️</button>
        <button type="button" class="btn btn-delete" id="btn-delete" data-id="${idempleado}">❌</button>
        </td>
        </tr>
        `
        })
        document.getElementById("detalle-empleados").innerHTML = filas;

        // eliminar
        const btnsDelete = document.querySelectorAll(".btn-delete");
        btnsDelete.forEach((btn) => {
          btn.addEventListener("click", async (e) => {
            console.log(btn.dataset.id, e.target.dataset.id);
            console.log("elimnando...");
            await this.eliminarEmpleado(e.target.dataset.id);
          });
        });

        //editar
        const $btnsEdit = document.querySelectorAll(".btn-edit");
        $btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {

              console.log('datos editar empleado', e.target.dataset.id);
              this.id = e.target.dataset.id; //id empleado
              let {
                descripcion,
                estado,
                sueldo,
                cedula
              } = await this.obtenerEmpleado(this.id);

              document.getElementById("descripcion").value = descripcion;
              document.getElementById("activo").checked = estado;
              document.getElementById("enviar").innerHTML = "Actualizar";
              document.getElementById("cedula").value = cedula;
              document.getElementById("sueldo").value = sueldo;
              this.grabar = false;
            })
          })    
      })
      .catch((err) => console.log(err))
}

  




  async obtenerEmpleado(id) {
    const res = await fetch(`${this.url}/${id}`)
    const dato = await res.json();
    console.log(dato[0]);
    return dato[0];
  }




  async eliminarEmpleado(id) {
    const res = await fetch(`${this.url}/${id}`, {
      method: "delete"
    });
    this.obtenerEmpleados();
  }




  // insertar un nuevo cargo
  async insertarDatos(empleado) {
    const res = await fetch(this.url, {
      method: "post",
      body: empleado
    });
    console.log(res);
    this.obtenerEmpleados()
    return true
  }

  async modificarDatos(empleadoMod, id) {
    try {
      const res = await fetch(`${this.url}/${id}`, {
        method: "put",
        body: empleadoMod
      });
      this.obtenerEmpleados();
      document.getElementById("enviar").innerHTML = "Insertar";
      this.grabar = true;

    } catch (error) {
      console.log("error: ", error);
    }
  }

  // fin de la clase cargo
}