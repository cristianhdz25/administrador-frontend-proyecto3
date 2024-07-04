export const formatDateToDisplay = (isoString) => {
    // Crear un objeto Date a partir del ISOString
    const date = new Date(isoString);

    // Obtener año, mes y día
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
    const day = date.getDate().toString().padStart(2, '0');

    // Retornar la fecha formateada
    return `${day}-${month}-${year}`;
}