//llamar a una variable de entorno
const URL_usuario = import.meta.env.VITE_API_USUARIO
const URL_producto = import.meta.env.VITE_API_PRODUCTO

/*GET devuelven una lista de elementos
POST me permiten crear un elemento
PUT para editar todo el elemento/PATCH para editar parte del elemento /me permiten editar un elemento
DELETE me permite eliminar un elemento
*/
export const iniciarSesion = async (usuario) => {
    try {
        const respuesta = await fetch(URL_usuario);
        const listaUsuarios = await respuesta.json();
        const usuarioBuscado = listaUsuarios.find((itemUsuario)=> itemUsuario.email === usuario.email);
        if(usuarioBuscado){
            //email era correcto
            if(usuarioBuscado.password === usuario.password){
                return usuarioBuscado
            }else{
                console.log('La contraseña es incorrecta')
                return null
            }
        }else{
            console.log('El mail no existe')
            //el email no exixte
            return null
        }
    } catch (error) {
        console.log(error);
    }
}

export const obtenerListaProductos = async ()=>{
    try {
        const respuesta = await fetch(URL_producto);
        const listaProductos = await respuesta.json();
        return listaProductos;
    } catch (error) {
        console.log(error)
    }
}