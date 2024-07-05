import axios from 'axios';

const urlBase = 'https://comercioapigateway20240702212433.azurewebsites.net/api/Comercio/';


export const getComercios = async ({ handleComercios, handleTotalComercios, handleLoadingTable }) => {
    await axios.get(`${urlBase}ListarComercios`)
        .then(response => {

            if (response.status === 200) {
                handleComercios(response.data);
                handleTotalComercios(response.data.length);

            }

            handleLoadingTable(false);
        }).catch(error => {
            handleLoadingTable(false);
            console.error(error);
        });
}

export const registrarComercio = async (comercio, { handleUpdate, handleNotification, handleSpinner }) => {

    const data = {
        nombre: comercio.nombre.trim(),
        direccion: comercio.direccion.trim(),
        telefono: comercio.telefono.trim(),
        fechaFundacion: comercio.fechaFundacion,
        correo: comercio.correo.trim(),
        cedulaJuridica: comercio.cedula.trim(),
        cuentaIBAN: comercio.cuenta.trim(),
        estado: true
    };

    await axios.post(`${urlBase}RegistrarComercio`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {

            console.log(response.status);
            if (response.status === 200) {
                handleUpdate();
                handleNotification("Registro exitoso", "El comercio se ha registrado exitosamente", "success");
                handleSpinner(false);
                return;
            }
            handleNotification("Error", "Ha ocurrido un error al registrar el comercio", "error");
            handleSpinner(false);
        }).catch(error => {
            handleSpinner(false);
            console.error(error);
            handleNotification("Error", error.response.data.message, "error");

        });
}

export const actualizarEstadoComercio = async (comercio, { handleUpdate, handleNotification, handleSpinner }) => {

    try {
        const response = await axios.put(`${urlBase}ActualizarEstadoComercio/${comercio.id}/${comercio.estado}`);

        if (response.data) {
            handleUpdate();
            handleSpinner(false);
            handleNotification("Actualización exitosa", "El estado del comercio se ha actualizado exitosamente", "success");
        } else {
            handleSpinner(false);
            handleNotification("Error", "Ha ocurrido un error al actualizar el estado del comercio", "error");
        }
    } catch (error) {
        handleNotification("Error", "Ha ocurrido un error al actualizar el estado del comercio", "error");
        console.error(error);
    } finally {
        handleSpinner(false);
    }
}