import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { borrarProducto, obtenerListaProductos } from "../../helpers/queries";
import { useEffect, useState } from "react";


const ItemProducto = ({ producto, productos, setProductos }) => {

  const handleDelete = ()=>{
    Swal.fire({
      title: 'Esta seguro de borrar el siguiente producto?',
      text: "El siguiente cambio no podra ser revertido",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero borrar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        borrarProducto(producto.id).then((respuesta)=>{
          if(respuesta.status === 200){
            eliminarProducto();
            Swal.fire(
              'Borrado!',
              'El producto fue borrado.',
              'success'
            )
          }else{
            Swal.fire({
              title: "Lo siento!",
              text: "La receta no pudo ser eliminada.",
              icon: "error",
              confirmButtonColor: "#fa8072",
            });
          }
        })
      }
    })
  }

  const eliminarProducto = () =>{
    const nuevaListaProducto = productos.filter((productoFiltrado) => productoFiltrado !== producto);
    setProductos(nuevaListaProducto);
  }

  return (
    <tr>
      <td>{producto.id}</td>
      <td>{producto.nombreProducto}</td>
      <td>${producto.precio}</td>
      <td>{producto.url}</td>
      <td>{producto.categoria}</td>
      <td>
        <Link className="btn btn-warning" to={'/administrador/editar-producto/'+producto.id}>Editar</Link>
        <Button variant="danger" onClick={handleDelete}>
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
