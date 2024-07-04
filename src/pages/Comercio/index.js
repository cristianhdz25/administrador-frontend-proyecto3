import React, { useState, useEffect } from "react";
import { actualizarEstadoComercio, getComercios, registrarComercio } from "../../services/comercioService";
import { Button, Card, CardContent, CardDescription, CardTitle, Skeleton, SkeletonLine } from "keep-react";
import {
  TableRow,
  TableCell,
  Badge,
  Input,
  Label,
} from "keep-react";
import {
  At,
  CreditCard,
  IdentificationCard,
  MapPin,
  Phone,
} from "phosphor-react";
import TableComponent from "../../components/Table";
import ModalComponent from "../../components/Modal";
import DatePickerComponent from "../../components/DatePicker";
import { formatDateToDisplay } from "../../utilities/formats";
import SpinnerComponent from "../../components/Spinner";
import AlertComponent from "../../components/Alert";
import { isValidIBAN, validateComercioForm, validateInput } from "../../utilities/validations/validateComercio";

export const Comercio = () => {
  const [comercios, setComercios] = useState([]);
  const [comercioSeleccionado, setComercioSeleccionado] = useState({});
  const [date, setDate] = useState(null);
  const [updateCount, setUpdateCount] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [modalEditar, setModalEditar] = useState(false);
  const [modalRegistrar, setmodalRegistrar] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [totalComercios, setTotalComercios] = useState(0);
  const [alert, setAlert] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [tipo, setTipo] = useState("");


  useEffect(() => {
    getComercios({ handleComercios, handleTotalComercios, handleSpinner });
  }, [updateCount]);

  const handleComercios = (data) => {
    setComercios(data);
  };

  const handleComercioSeleccionado = (comercio) => {
    setComercioSeleccionado(comercio);
  };

  const handleTotalComercios = (total) => {
    setTotalComercios(total);
  };

  const handleNotification = (titulo, texto, tipo) => {
    setTitulo(titulo);
    setTexto(texto);
    setTipo(tipo);
    setAlert(true);
  };

  const handleDate = (entryDate) => {
    setDate(entryDate);
  };

  const handleUpdate = () => {
    setUpdateCount(updateCount + 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateInput(e);
    setComercioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSpinner = (state) => {
    setLoading(state);
  };

  const openModalRegistro = () => {
    setmodalRegistrar(!modalRegistrar);
  };

  const sendForm = (e) => {
    e.preventDefault();

    if (!date) {
      handleNotification("Error", "La fecha de fundación es requerida", "error");
      return;
    }

    if (!isValidIBAN(comercioSeleccionado.cuenta)) {
      handleNotification("Error", "El IBAN ingresado no es válido", "error");
      return;
    }

    if (!validateComercioForm(e)) {
      handleNotification("Error", "Por favor, complete correctamente el formulario", "error");
      return;
    }

    comercioSeleccionado.fechaFundacion = new Date(date).toISOString();

    handleSpinner(true);
    registrarComercio(comercioSeleccionado, { handleUpdate, handleNotification, handleSpinner });
  }

  const sendFormActualizarEstado = (comercio) => {
    handleSpinner(true);
    handleComercioSeleccionado(comercio);
    comercio.estado = !comercio.estado;
    actualizarEstadoComercio(comercio, { handleUpdate, handleNotification, handleSpinner });
  }

  const verInfoComercio = (comercio) => {
    handleComercioSeleccionado(comercio);
    setModalInfo(!modalInfo);
  }

  return (
    <div className="container mx-auto my-28">
      <div className="container mx-auto md:px-8">
        <TableComponent
          headers={[
            "Cedula Jurídica",
            "Nombre",
            "Dirección",
            "Fecha Fundación",
            "Correo",
            "Teléfono",
            "Estado",
            "Acciones"
          ]}
          titulo="Comercios"
          total={totalComercios}
          filtro={false}
          openModalRegistrar={openModalRegistro}
        >
          {comercios.map((comercio, index) => (
            <TableRow key={index}>
              <TableCell>
                {loading ? (
                  <Skeleton className="max-w-xl space-y-2.5">
                    <SkeletonLine className="h-4 w-full" />
                  </Skeleton>
                ) : (
                  comercio.cedulaJuridica
                )}
              </TableCell>
              <TableCell>
                {loading ? (
                  <Skeleton className="max-w-xl space-y-2.5">
                    <SkeletonLine className="h-4 w-full" />
                  </Skeleton>
                ) : (
                  comercio.nombre
                )}
              </TableCell>
              <TableCell>
                {loading ? (
                  <Skeleton className="max-w-xl space-y-2.5">
                    <SkeletonLine className="h-4 w-full" />
                  </Skeleton>
                ) : (
                  comercio.direccion
                )}
              </TableCell>
              <TableCell>
                {loading ? (
                  <Skeleton className="max-w-xl space-y-2.5">
                    <SkeletonLine className="h-4 w-full" />
                  </Skeleton>
                ) : (
                  formatDateToDisplay(comercio.fechaFundacion)
                )}
              </TableCell>
              <TableCell>
                {loading ? (
                  <Skeleton className="max-w-xl space-y-2.5">
                    <SkeletonLine className="h-4 w-full" />
                  </Skeleton>
                ) : (
                  comercio.correo
                )}
              </TableCell>
              <TableCell>
                {loading ? (
                  <Skeleton className="max-w-xl space-y-2.5">
                    <SkeletonLine className="h-4 w-full" />
                  </Skeleton>
                ) : (
                  comercio.telefono
                )}
              </TableCell>
              <TableCell>
                {loading ? (
                  <Skeleton className="max-w-xl space-y-2.5">
                    <SkeletonLine className="h-4 w-full" />
                  </Skeleton>
                ) : (

                  <Badge
                    showIcon
                    className="text-body-4"
                    color={comercio.estado ? "success" : "error"}
                  >
                    {comercio.estado ? "Activo" : "Inactivo"}
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {loading ? (
                  <Skeleton className="max-w-xl space-y-2.5">
                    <SkeletonLine className="h-4 w-full" />
                  </Skeleton>
                ) : (
                  <div className="flex space-x-4 justify-center">
                    <Button size="xs" color="primary" onClick={() => verInfoComercio(comercio)}>
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                        <path d="M21.894 11.553C19.736 7.236 15.904 5 12 5c-3.903 0-7.736 2.236-9.894 6.553a1 1 0 0 0 0 .894C4.264 16.764 8.096 19 12 19c3.903 0 7.736-2.236 9.894-6.553a1 1 0 0 0 0-.894ZM12 17c-2.969 0-6.002-1.62-7.87-5C5.998 8.62 9.03 7 12 7c2.969 0 6.002 1.62 7.87 5-1.868 3.38-4.901 5-7.87 5Z"></path>
                      </svg>
                    </Button>
                    <Button size="xs" color={comercio.estado ? "error" : "success"} onClick={() => sendFormActualizarEstado(comercio)}>
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M11 3h2v10h-2V3Zm5.41 3.59 1.42-1.42A8.932 8.932 0 0 1 21 12a9 9 0 0 1-18 0c0-2.74 1.23-5.18 3.17-6.83l1.41 1.41A6.995 6.995 0 0 0 12 19c3.87 0 7-3.13 7-7a6.92 6.92 0 0 0-2.59-5.41Z" clip-rule="evenodd"></path>
                      </svg>
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableComponent>
      </div>

      <ModalComponent
        modal={modalRegistrar}
        closeModal={setmodalRegistrar}
        buttonText={"Registrar"}
        sendForm={sendForm}
        form={true}
      >
        <fieldset className="space-y-1">
          <div className="flex flex-row space-x-1 my-1">
            <IdentificationCard size={19} color="#AFBACA" />
            <Label htmlFor="cedula">Cédula Jurídica</Label>
          </div>
          <Label className="my-2">
            <Input
              placeholder="00-000-000000"
              className=""
              type="text"
              name="cedula"
              onChange={handleChange}
              pattern="[0-9]{2}-[0-9]{3}-[0-9]{6}"
              required
            />
            <div className="invalid-feedback ps-2">
            </div>
          </Label>
        </fieldset>

        <fieldset className="space-y-3 my-2">
          <div className="flex flex-row space-x-1 my-1">
            <IdentificationCard size={19} color="#AFBACA" />
            <Label htmlFor="nombre">Nombre</Label>
          </div>
          <Label className="my-2">
            <Input
              placeholder="Super Marta"
              type="text"
              name="nombre"
              className=""
              onChange={handleChange}
              maxLength={200}
              required
            />
            <div className="invalid-feedback ps-2">
            </div>
          </Label>
        </fieldset>

        <fieldset className="space-y-3 my-2">
          <div className="flex flex-row space-x-1 my-1">
            <MapPin size={19} color="#AFBACA" />
            <Label htmlFor="direccion">Dirección</Label>
          </div>
          <Label className="my-2">
            <Input
              placeholder="San José, Desamparados"
              type="text"
              name="direccion"
              className=""
              onChange={handleChange}
              maxLength={200}
              required
            />
            <div className="invalid-feedback ps-2">
            </div>
          </Label>
        </fieldset>

        <fieldset className="space-y-3 my-2">
          <Label htmlFor="date">Fecha Fundación</Label>
          <div className="relative">
            <DatePickerComponent handleDate={handleDate} />
          </div>
        </fieldset>

        <fieldset className="space-y-3 my-2">
          <div className="flex flex-row space-x-1 my-1">
            <At size={19} color="#AFBACA" />
            <Label htmlFor="direccion">Correo electrónico</Label>
          </div>
          <Label className="my-2">
            <Input
              placeholder="ejemplo@ejemplo.com"
              type="text"
              name="correo"
              className=""
              onChange={handleChange}
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              required
            />
            <div className="invalid-feedback ps-2">
            </div>
          </Label>
        </fieldset>

        <fieldset className="space-y-1">
          <div className="flex flex-row space-x-1 my-1">
            <Phone size={19} color="#AFBACA" />
            <Label htmlFor="telefono">Teléfono</Label>
          </div>
          <Label className="my-2">
            <Input
              placeholder="0000-0000"
              type="text"
              name="telefono"
              className=""
              onChange={handleChange}
              pattern="[0-9]{4}-[0-9]{4}"
              required
            />
            <div className="invalid-feedback ps-2">
            </div>
          </Label>
        </fieldset>

        <fieldset className="space-y-1">
          <div className="flex flex-row space-x-1 my-1">
            <CreditCard size={19} color="#AFBACA" />
            <Label htmlFor="cuenta">Cuenta IBAN</Label>
          </div>
          <Label className="my-2">
            <Input
              placeholder="CR00000000000000000000000000"
              type="text"
              name="cuenta"
              className=""
              onChange={handleChange}
            />
            <div className="invalid-feedback ps-2">
            </div>
          </Label>
        </fieldset>
      </ModalComponent>

      <AlertComponent modal={alert} titulo={titulo} texto={texto} tipo={tipo} closeModal={setAlert} />

      <ModalComponent modal={modalInfo} closeModal={setModalInfo} buttonText={"Cerrar"}>

        <div className="flex justify-center flex-col mb-6 space-y-6 mt-6">
          <fieldset className="space-y-1 flex text-center flex-col ">
              <Label htmlFor="cuenta" className="text-body-2 "><p className="text-white">Cédula Jurídica</p></Label>
              <Label className="text-body-3">{comercioSeleccionado.cedulaJuridica}</Label>
          </fieldset>

          <fieldset className="space-y-1 flex text-center flex-col ">
              <Label htmlFor="nombre" className="text-body-2"><p className="text-white">Nombre</p></Label>
              <Label className="text-body-3">{comercioSeleccionado.nombre}</Label>
          </fieldset>

          <fieldset className="space-y-1 flex text-center flex-col ">
              <Label htmlFor="direccion" className="text-body-2"><p className="text-white">Dirección</p></Label>
              <Label className="text-body-3">{comercioSeleccionado.direccion}</Label>
          </fieldset>

          <fieldset className="space-y-1 flex text-center flex-col ">
              <Label htmlFor="fecha" className="text-body-2"><p className="text-white">Fecha de Fundación</p></Label>
              <Label className="ps-1">{formatDateToDisplay(comercioSeleccionado.fechaFundacion)}</Label>
         
          </fieldset>

          <fieldset className="space-y-1 flex text-center flex-col ">
              <Label htmlFor="correo" className="text-body-2"><p className="text-white">Correo Electrónico</p></Label>
              <Label className="ps-1">{comercioSeleccionado.correo}</Label>
            
          </fieldset>

          <fieldset className="space-y-1 flex text-center flex-col ">
              <Label htmlFor="telefono" className="text-body-2"><p className="text-white">Teléfono</p></Label>
              <Label className="ps-1">{comercioSeleccionado.telefono}</Label>        
          </fieldset>

          <fieldset className="space-y-1 flex text-center flex-col ">
            <Label htmlFor="telefono" className="text-body-2"><p className="text-white">Estado</p></Label>
              <Label className="ps-1">{comercioSeleccionado.estado ? "Activo" : "Inactivo"}</Label>
          </fieldset>
        </div>

      </ModalComponent>

      <SpinnerComponent show={loading} />

    </div>
  )
};
