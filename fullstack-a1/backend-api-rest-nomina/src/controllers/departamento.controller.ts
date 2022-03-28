import  { Request, Response } from "express";
import { Coneccion } from "../bd/database";
import {Idepartamento} from '../interface/Departamento'
// instanciar la clase coneccion
const conection:Coneccion = new Coneccion();
// controlador de getcargos (funcion o logica de la peticion)
export async function getDepartamentos(req:Request, res:Response): Promise<Response | void> {
 try { 
     const conn = await conection.getConneccion();
     const departamentos = await conn.query("SELECT * FROM departamento");
     return res.json(departamentos[0]);
 }   
 catch (err) {
     console.log(err);
 }
};
// creacion de un cargo
export async function createDepartamento(req: Request, res: Response) {
  try {
    const modDepartamento: Idepartamento = req.body;
    console.log(modDepartamento);
    const conn = await conection.getConneccion();
    const departamentos = await conn.query("INSERT INTO departamento SET ?", [modDepartamento]);
    res.json({ msg: "Departamento insertado Satisfactoriamente", departamento: modDepartamento });
  } catch (err) {
    console.log(err);
  }
}
// obtener un cargo mediante su id 
export async function getDepartamento(req: Request, res: Response) {
  const id = req.params.departamentoId;
  const conn = await conection.getConneccion();
  const departamento = await conn.query("SELECT * FROM departamento WHERE iddepartamento = ?", [id]);
  //console.log(req.params.cargoId,id);
  //res.json(req.params);
  res.json(departamento[0]);
}
// eliminar un cargo mediante su id
export async function deleteDepartamento(req: Request, res: Response) {
  const id = req.params.departamentoId;
  console.log(req.params);
  const conn = await conection.getConneccion();
  await conn.query("DELETE FROM departamento WHERE iddepartamento = ?", [id]);
  res.json({
    message: "departamento eliminado",
    id,
  });
}
// actualizar o modificar o editar un cargo mediante su id
export async function updateDepartamento(req: Request, res: Response) {
  const id = req.params.departamentoId;
  const modDepartamento: Idepartamento = req.body;
  const conn = await conection.getConneccion();
  await conn.query("UPDATE departamento set ? WHERE iddepartamento = ?", [modDepartamento, id]);
  res.json({
    message: "Departamento actualizado",
    modDepartamento,
  });
}
