// Inicializar íconos de Lucide
lucide.createIcons();

const canvas = document.getElementById('signature-pad');
const clearBtn = document.getElementById('clear-btn');
const confirmBtn = document.getElementById('confirm-btn');

// Inicializar panel de firma
const signaturePad = new SignaturePad(canvas, {
    backgroundColor: 'rgba(255, 255, 255, 0)',
    penColor: 'rgb(0, 0, 0)'
});

// Ajustar el tamaño del canvas para pantallas de alta resolución
function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    signaturePad.clear(); // necesario para reiniciar el panel
}

window.onresize = resizeCanvas;
resizeCanvas();

// Manejar el botón de limpiar
clearBtn.addEventListener('click', () => {
    signaturePad.clear();
    console.log('Firma limpiada');
});

// Manejar el botón de confirmar
confirmBtn.addEventListener('click', () => {
    if (signaturePad.isEmpty()) {
        alert("Por favor, proporcione una firma antes de confirmar.");
        return;
    }

    const signatureData = signaturePad.toDataURL(); // Por defecto: image/png
    
    // Simulando éxito
    console.log('Firma capturada con éxito:');
    console.log(signatureData);

    confirmBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Procesando...';
    lucide.createIcons();
    confirmBtn.disabled = true;

    setTimeout(() => {
        alert("¡Firma confirmada con éxito! Revisa la consola para ver el Base64.");
        confirmBtn.innerHTML = '<i data-lucide="check-circle-2"></i> Confirmar y Finalizar';
        lucide.createIcons();
        confirmBtn.disabled = false;
    }, 1500);
});

// Función de ayuda para la animación de refresco del ícono
const animateIcons = () => {
    const style = document.createElement('style');
    style.innerHTML = `
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
};
animateIcons();
