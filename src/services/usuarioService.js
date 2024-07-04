import axios from "axios";
import { toast } from "keep-react";
import Cookies from "universal-cookie";


const urlBase = "https://comercioapigateway20240702212433.azurewebsites.net/api/Usuario/";

export const getUsuarioPorCorreoContrasenna = async (correo, contrasenna, {handleUsuario, handleAlert, handleLoading }) => {
    await axios.get(`${urlBase}ObtenerUsuarioPorCorreoContrasenna/${correo}/${contrasenna}`)
        .then(response => {
            if (response.status === 200 && response.data.rol.idRol === 2) {
                iniciarSesion(response.data, {handleUsuario});
            }
            handleLoading(false);
        }).catch(error => {
            toast.error("El correo o la contraseña son incorrectos");
            handleLoading(false);
            console.error(error);
        });
}


export const iniciarSesion = (usuario, {handleUsuario}) => {
    const cookie = new Cookies();
    cookie.set('usuario', usuario, { path: '/' });
    handleUsuario(cookie.get('usuario'));
    toast.success("Bienvenido "+ usuario.nombre + " " + usuario.apellidos +"");
}

export const cerrarSesion = ({handleUsuario}) => {
    const cookie = new Cookies();
    cookie.remove('usuario', { path: '/' });
    handleUsuario(null);
    toast.success("Sesión cerrada exitosamente");
}
