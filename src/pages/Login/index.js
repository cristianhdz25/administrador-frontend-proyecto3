

import React, { useState } from 'react'
import { Envelope, Lock } from 'phosphor-react'
import { Button, InputIcon, Input, Label, toast } from 'keep-react'
import AlertComponent from '../../components/Alert'
import { getUsuarioPorCorreoContrasenna } from '../../services/usuarioService'
import SpinnerComponent from '../../components/Spinner'

export const Login = ({handleUsuario}) => {

    const [alert, setAlert] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [tipo, setTipo] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAlert = (titulo, texto, tipo) => {
        setTitulo(titulo);
        setTexto(texto);
        setTipo(tipo);
        setAlert(true);
    }

    const handleLoading = (loading) => {
        setLoading(loading);
    }


    const iniciarSesion = (e) => {
        handleLoading(true);
        e.preventDefault();
        const correo = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (correo === "" || password === "") {
            toast.error("Todos los campos son obligatorios");
            handleLoading(false);
            return;
        }

        if (!correo.match(regexCorreo)) {
            toast.error("El correo no es válido");
            handleLoading(false);
            return;
        }
        getUsuarioPorCorreoContrasenna(correo, password, { handleUsuario, handleAlert, handleLoading });
    }



    return (
        <div className='container flex items-center min-h-screen min-w-full '>
        <div className="mx-auto login ">
            <form className="mx-auto  space-y-5 rounded-lg border p-8 shadow-md" onSubmit={iniciarSesion} noValidate>
                <h1 className='text-2xl font-semibold text-white'>Iniciar Sesión</h1>
                    <fieldset className="space-y-1">
                        <Label htmlFor="email">Correo</Label>
                        <div className="relative">
                            <Input id="email" placeholder="Ingrese su correo" className="ps-11"  />
                            <InputIcon>
                                <Envelope size={19} color="#AFBACA" />
                            </InputIcon>
                        </div>
                    </fieldset>
                    <fieldset className="space-y-1">
                        <Label htmlFor="password">Constraseña</Label>
                        <div className="relative">
                            <Input id="password" placeholder="Ingrese su contraseña" type="password" className="ps-11" />
                            <InputIcon>
                                <Lock size={19} color="#AFBACA" />
                            </InputIcon>
                        </div>
                    </fieldset>
                    <Button size="sm" color="secondary" type="submit" >
                        Ingresar
                    </Button>
                </form>
            </div>
            <AlertComponent  modal={alert} titulo={titulo} texto={texto} tipo={tipo} closeModal={setAlert}/>
            <SpinnerComponent show={loading} />
        </div>


    )
}
