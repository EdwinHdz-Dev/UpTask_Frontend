export function formatDate(isoString: string) : string{
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric' 
    })
    return formatter.format(date)
}

export function formatDates(isoString: string): string {
    const date = new Date(isoString);

    // Obtener componentes de fecha en UTC
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; // Sumar 1 porque los meses van de 0 a 11 en JavaScript
    const day = date.getUTCDate();

    // Formatear la fecha en el formato deseado
    return `${day} de ${getMonthName(month)} de ${year}`;
}

export function formatDateForInput(isoString: string): string {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = `${date.getUTCMonth() + 1}`.padStart(2, '0'); // Ajustar el mes para tener dos dígitos
    const day = `${date.getUTCDate()}`.padStart(2, '0'); // Ajustar el día para tener dos dígitos
    return `${year}-${month}-${day}`;
}

// Función auxiliar para obtener el nombre del mes
function getMonthName(month: number): string {
    const months = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    return months[month - 1]; // Restar 1 para obtener el mes correcto del arreglo
}


export function calculateTheoreticalProgress(createdAt : string, estimatedCompletionDate : string) {
    const currentDate = new Date();
    const createdAtDate = new Date(createdAt);
    const estimatedCompletionDateDate = new Date(estimatedCompletionDate);

    const totalProjectDuration = estimatedCompletionDateDate.getTime() - createdAtDate.getTime();
    const elapsedTime = currentDate.getTime() - createdAtDate.getTime();

    // Calcular el porcentaje de avance
    const theoreticalProgress = (elapsedTime / totalProjectDuration) * 100;

    return theoreticalProgress;
}