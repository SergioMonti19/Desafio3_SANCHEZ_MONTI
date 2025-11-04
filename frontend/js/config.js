// Configuración de la API
const API_CONFIG = {
    BASE_URL: 'http://localhost:8080',
    ENDPOINTS: {
        LOGIN: '/login',
        USERS: '/api/users'
    }
};

// Obtener el token del localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Guardar el token
function saveToken(token) {
    localStorage.setItem('token', token);
}

// Eliminar el token
function removeToken() {
    localStorage.removeItem('token');
}

// Verificar si hay sesión activa
function isAuthenticated() {
    return getToken() !== null;
}

// Hacer petición con token
async function fetchWithAuth(url, options = {}) {
    const token = getToken();

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        }
    };

    const finalOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };

    return fetch(url, finalOptions);
}