const ulrdepartamento = "http://localhost:3000/departamentos"

export function getOpcionesCargo(){
     
    fetch("http://localhost:3000/cargos")
    .then((res)=>res.json())
    .then((cargos)=>{
      let opcionesCargo = ''
      cargos.forEach((cargo)=>{
        let {descripcion,idcargo} = cargo
        opcionesCargo += `<option data-id=${idcargo} >${descripcion}</option>`
      })
      document.getElementById('opciones-cargo').innerHTML += opcionesCargo
    })
    
}
export function getOpcionesDepartamento(){
    fetch("http://localhost:3000/departamentos")
    .then((res)=>res.json())
    .then((departamentos)=>{
      //console.log("departamentos", departamentos);
      let opcionesDepartamento = ''
      departamentos.forEach((departamento)=>{
        let {descripcion,iddepartamento} = departamento
        opcionesDepartamento += `<option data-id=${iddepartamento} >${descripcion}</option>`
      })
      document.getElementById('opciones-departamento').innerHTML += opcionesDepartamento
    })
    .catch((err)=>{
      console.log(err);
    })

    
    
    

}