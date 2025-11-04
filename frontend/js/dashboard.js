document.addEventListener('DOMContentLoaded', async function() {
    // Verificar autenticación
    if (!isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }

    const logoutBtn = document.getElementById('logoutBtn');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const usersTable = document.getElementById('usersTable');
    const usersTableBody = document.getElementById('usersTableBody');
    const userCount = document.getElementById('userCount');
    const alertContainer = document.getElementById('alertContainer');

    // Cerrar sesión
    logoutBtn.addEventListener('click', function() {
        if (confirm('¿Está seguro que desea cerrar sesión?')) {
            removeToken();
            window.location.href = 'index.html';
        }
    });

    // Cargar usuarios
    await loadUsers();

    async function loadUsers() {
        try {
            const response = await fetchWithAuth(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USERS}`);

            if (response.status === 401 || response.status === 403) {
                showAlert('danger', 'Token expirado o inválido. Por favor, inicie sesión nuevamente.');
                setTimeout(() => {
                    removeToken();
                    window.location.href = 'index.html';
                }, 2000);
                return;
            }

            if (!response.ok) {
                throw new Error('Error al cargar usuarios');
            }

            const users = await response.json();

            // Ocultar spinner y mostrar tabla
            loadingSpinner.classList.add('d-none');
            usersTable.classList.remove('d-none');

            // Renderizar usuarios
            renderUsers(users);
            userCount.textContent = users.length;

        } catch (error) {
            console.error('Error:', error);
            loadingSpinner.classList.add('d-none');
            showAlert('danger', 'Error al cargar los usuarios. Verifique la conexión con el servidor.');
        }
    }

    function renderUsers(users) {
        usersTableBody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>#${user.id}</strong></td>
                <td>
                    <i class="bi bi-person"></i>
                    ${user.username}
                </td>
                <td>
                    <code>${user.password}</code>
                </td>
                <td>
                    <span class="user-badge role-${user.role.toLowerCase()}">
                        ${user.role}
                    </span>
                </td>
            `;
            usersTableBody.appendChild(row);
        });
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