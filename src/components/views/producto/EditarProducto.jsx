import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { editarProducto, obtenerProducto } from "../../helpers/queries";
import Swal from "sweetalert2";


const EditarProducto = () => {
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  const {id} =useParams();


  useEffect(()=>{
    obtenerProducto(id).then((respuesta)=>{
      if(respuesta){
      setValue('nombreProducto', respuesta.nombreProducto);
      setValue('precio', respuesta.precio);
      setValue('url', respuesta.url);
      setValue('categoria', respuesta.categoria);
      }
    })
  },[])

  const onSubmit = (productoEditado) =>{
    console.log(productoEditado);
    editarProducto(productoEditado, id).then((productoEditado)=>{
    if(productoEditado.status === 200){
      Swal .fire('Producto editado', `El producto fue editado correctamente`, 'success');
      }else{
        Swal.fire('Ocurrio un error', `El producto no pudo ser editado`, 'error');
    }
    })
  }

  return (
    <section className="container mainSection">
      <h1 className="display-4 mt-5">Editar producto</h1>
      <hr />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formNombreProducto">
          <Form.Label>Producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Cafe"
            {...register("nombreProducto", {
              required: "El nombre del producto es obligatorio",
              minLength: {
                value: 2,
                message: "La cantidad minima de caracteres es de 2 digitos",
              },
              maxLength: {
                value: 100,
                message: "La cantidad maxima de caracteres es de 100 digitos",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.nombreProducto?.message}
          </Form.Text>
        
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            {...register("precio", {
              required: "El precio del producto es obligatorio",
              min: {
                value: 1,
                message: "El precio minimo es de $1",
              },
              max: {
                value: 10000,
                message: "El precio maximo es de $10000",
              }
            })}
          />
          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formUrl">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            {...register("url",{
              required:"La imagen es obligatoria"
            })}
          />
        <Form.Text className="text-danger">
          {errors.url?.message}
        </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCategoria">
          <Form.Label>Categoria*</Form.Label>
          <Form.Select
          {...register("categoria",{
            required:"La categoria es obligatoria",
          })}
          >
            <option value="">Seleccione una opcion</option>
            <option value="bebida caliente">Bebida caliente</option>
            <option value="bebida fria">Bebida fria</option>
            <option value="dulce">Dulce</option>
            <option value="salado">Salado</option>
          </Form.Select>
          <Form.Text className="text-danger">
            {errors.categoria?.message}
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default EditarProducto;
