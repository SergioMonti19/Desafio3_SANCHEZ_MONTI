document.addEventListener('DOMContentLoaded', function() {
    // Verificar si ya hay sesión activa
    if (isAuthenticated()) {
        window.location.href = 'dashboard.html';
    }

    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');
    const loginText = document.getElementById('loginText');
    const loginSpinner = document.getElementById('loginSpinner');
    const alertContainer = document.getElementById('alertContainer');

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Deshabilitar botón y mostrar spinner
        loginBtn.disabled = true;
        loginText.classList.add('d-none');
        loginSpinner.classList.remove('d-none');
        alertContainer.innerHTML = '';

        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Guardar token
                saveToken(data.token);

                // Mostrar mensaje de éxito
                showAlert('success', '¡Inicio de sesión exitoso! Redirigiendo...');

                // Redirigir al dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showAlert('danger', data.error || 'Credenciales inválidas');
                resetButton();
            }
        } catch (error) {
            console.error('Error:', error);
            showAlert('danger', 'Error de conexión con el servidor. Verifique que el backend esté corriendo en el puerto 8080.');
            resetButton();
        }
    });

    function resetButton() {
        loginBtn.disabled = false;
        loginText.classList.remove('d-none');
        loginSpinner.classList.add('d-none');
    }

    function showAlert(type, message) {
        alertContainer.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }
});
