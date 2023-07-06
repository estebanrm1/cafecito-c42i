import { Container, Row, Spinner } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import { obtenerListaProductos } from "../helpers/queries";
import { useState, useEffect } from "react";

const Inicio = () => {

  const [productos, setProductos] = useState([]);
  const [mostrarSpinner, setMostrarSpinner] = useState(true);

  useEffect(() => {
      obtenerListaProductos().then((respuesta) => {
          if (respuesta) {
              setProductos(respuesta);
              setMostrarSpinner(false);
          } else {
              Swal.fire({
                  title: "Hubo un error!",
                  text: "Intente Realizar esta operacion en un momento por favor",
                  icon: 'error'
              })
          }
      })
  }, [])

  return (
    <section className="mainSection">
      <img
        className="banner"
        src="https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="fondo cafe"
      />
      <Container>
        <h1 className="display-4">Nuestros Productos</h1>
        <hr />
        <Row xs={1} md={2} lg={3} xl={4} className="justify-content-center align-items-stretch">
                    {mostrarSpinner ? (
                        <div className="my-3 text-center">
                            <Spinner animation="grow" variant="danger"></Spinner>
                        </div>
                    ) : (
                        productos.map((producto) => (
                            <CardProducto key={producto.id} producto={producto}></CardProducto>
                        ))
                    )}
                </Row>
      </Container>
    </section>
  );
};

export default Inicio;
