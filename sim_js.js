// Asegurarse de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    console.log('Archivo sim_js.js cargado correctamente');

    // Inicializar valores
    const valorUFInput = document.getElementById('valor-uf');
    const primaBrutaUFInput = document.getElementById('prima-bruta-uf');
    const primaBrutaPesosInput = document.getElementById('prima-bruta-pesos');
    const primaBrutaUFAnualInput = document.getElementById('prima-bruta-uf-anual');
    const primaBrutaPesosAnualInput = document.getElementById('prima-bruta-$-anual');
    const primaNetaUFAnualInput = document.getElementById('prima-neta-uf-anual');
    const primaNetaPesosAnualInput = document.getElementById('prima-neta-pesos-anual');
    const comisionPrimaNetaInput = document.getElementById('comision-prima-neta');
    const valorUFComisionInput = document.getElementById('valor-uf-comision');
    const valorPesosComisionInput = document.getElementById('valor-pesos-comision');
    const comisionPrimaNetaPartInput = document.getElementById('comision-prima-neta-part');
    const valorUFComisionPartInput = document.getElementById('valor-uf-comision-part');
    const valorPesosComisionPartInput = document.getElementById('valor-pesos-comision-part');
    const margenValorInput = document.getElementById('margen-valor');

    // Función para calcular el valor en pesos
    function calcularValorPesos() {
        const valorUF = parseFloat(valorUFInput.value) || 0;
        const primaBrutaUF = parseFloat(primaBrutaUFInput.value) || 0;
        primaBrutaPesosInput.value = (valorUF * primaBrutaUF).toFixed(2);
    }

    // Función para calcular valores anuales
    function calcularValoresAnuales() {
        const primaBrutaUF = parseFloat(primaBrutaUFInput.value) || 0;
        primaBrutaUFAnualInput.value = (primaBrutaUF * 11).toFixed(2);

        const primaBrutaPesos = parseFloat(primaBrutaPesosInput.value) || 0;
        primaBrutaPesosAnualInput.value = (primaBrutaPesos * 11).toFixed(2);

        // Calcular Prima Neta UF Anual (Ejemplo: 90% de Prima Bruta UF Anual)
        const primaNetaUFAnual = primaBrutaUFAnualInput.value * 0.9; // Ajusta el porcentaje según sea necesario
        primaNetaUFAnualInput.value = primaNetaUFAnual.toFixed(2);

        // Calcular Prima Neta Pesos Anual
        const valorUF = parseFloat(valorUFInput.value) || 0;
        primaNetaPesosAnualInput.value = (primaNetaUFAnual * valorUF).toFixed(2);
    }

    // Función para calcular comisiones
    function calcularComisiones() {
        const primaNetaUFAnual = parseFloat(primaNetaUFAnualInput.value) || 0;
        const comisionPrimaNeta = parseFloat(comisionPrimaNetaInput.value) || 0;
        valorUFComisionInput.value = ((primaNetaUFAnual * comisionPrimaNeta) / 100).toFixed(2);

        const valorUF = parseFloat(valorUFInput.value) || 0;
        valorPesosComisionInput.value = (valorUFComisionInput.value * valorUF).toFixed(2);
    }

 // Función para calcular comisiones de partners
function calcularComisionesPartners() {
    const valorPesosComision = parseFloat(valorPesosComisionInput.value) || 0; // Valor $ Comisión
    const comisionPrimaNetaPart = parseFloat(comisionPrimaNetaPartInput.value) || 0; // % Comisión Prima Neta Partner

    // Calcular comisión en pesos para partners
    const valorPesosComisionPart = (valorPesosComision * comisionPrimaNetaPart) / 100;
    valorPesosComisionPartInput.value = valorPesosComisionPart.toFixed(2);

    // Calcular comisión en UF para partners
    const valorUF = parseFloat(valorUFInput.value) || 0; // Valor de la UF
    const valorUFComisionPart = valorPesosComisionPart / valorUF;
    valorUFComisionPartInput.value = valorUFComisionPart.toFixed(2);
}


    // Función para calcular margen
    function calcularMargen() {
        const valorPesosComisionPart = parseFloat(valorPesosComisionPartInput.value) || 0;
        margenValorInput.value = valorPesosComisionPart.toFixed(2);
    }

    // Escuchar cambios en los inputs
    valorUFInput.addEventListener('input', () => {
        calcularValorPesos();
        calcularValoresAnuales();
        calcularComisiones();
        calcularComisionesPartners();
    });

    primaBrutaUFInput.addEventListener('input', () => {
        calcularValorPesos();
        calcularValoresAnuales();
        calcularComisiones();
        calcularComisionesPartners();
    });

    comisionPrimaNetaInput.addEventListener('input', calcularComisiones);
    comisionPrimaNetaPartInput.addEventListener('input', calcularComisionesPartners);
    valorPesosComisionPartInput.addEventListener('input', calcularMargen);

    // Inicializar fecha actual
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const currentDate = new Date();
        currentDateElement.textContent = currentDate.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
});