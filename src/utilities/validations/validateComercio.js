import { handleInvalidInput, validateForm } from "../validateErrors";

const errorMessages = {

    cedula: {
        valueMissing: "La cédula jurídica es requerida",
        patternMismatch: "La cédula debe tener este formato: ##-###-######"
    },
    nombre: {
        valueMissing: "El nombre del comercio es requerido",
        tooLong: "El nombre del comercio no puede tener más de 200 caracteres"
    },
    correo: {
        valueMissing: "El correo del comercio es requerido",
        patternMismatch: "El correo debe tener este formato: ejemplo@ejemplo.com",
    },
    direccion: {
        valueMissing: "La dirección del comercio es requerida",
        tooLong: "La dirección del comercio no puede tener más de 200 caracteres"
    },
    telefono: {
        valueMissing: "El teléfono del comercio es requerido",
        patternMismatch: "El teléfono debe tener este formato: ####-####"
    },
    cuenta: {
        valueMissing: "La cuenta IBAN del comercio es requerida"
    }

}

export const validateInput = (e) => {
    handleInvalidInput(e.target, errorMessages);
}

export const validateComercioForm = (e) => {
    return validateForm(e.target, errorMessages);
}


export const isValidIBAN = (iban) => {

    // Eliminar espacios en blanco y convertir a mayúsculas
    iban = iban.replace(/\s/g, '').toUpperCase();

    // Verificar la longitud (IBAN de Costa Rica tiene 22 caracteres)
    if (iban.length !== 22) {
        return false;
    }

    // Verificar el formato específico de Costa Rica
    const formatoCR = /^CR\d{2}[0-9A-Z]{18}$/;
    if (!formatoCR.test(iban)) {
        return false;
    }

    // Extraer las partes del IBAN
    const codigoPais = iban.slice(0, 2);

    // Verificar que el código de país sea CR
    if (codigoPais !== 'CR') {
        return false;
    }

    // Realizar la validación del dígito de control
    // Mover los primeros 4 caracteres al final
    const ibanReordenado = iban.slice(4) + iban.slice(0, 4);

    // Convertir letras a números (A=10, B=11, ..., Z=35)
    const ibanNumerico = ibanReordenado.split('').map(char => {
        if (isNaN(char)) {
            return char.charCodeAt(0) - 55;
        }
        return char;
    }).join('');

    // Calcular el módulo 97
    let resto = ibanNumerico;
    while (resto.length > 2) {
        const bloque = resto.slice(0, 9);
        resto = (parseInt(bloque) % 97) + resto.slice(9);
    }

    // El IBAN es válido si el resto es 1
    return parseInt(resto) % 97 === 1;
}
