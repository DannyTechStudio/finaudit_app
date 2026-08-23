/*-----------------------------------------------------
        API BASE URL
-----------------------------------------------------*/
// const API_BASE_URL = "http://localhost:8000/api";
const API_BASE_URL = "http://127.0.0.1:8000/api";


//  Obtaining Token
function getCsrfToken() {

    const cookie = document.cookie
        .split("; ")
        .find(row => row.startsWith("csrftoken="));
    
    return cookie
        ? decodeURIComponent(cookie.split("=")[1])
        : null;
}


async function ensureCsrfToken() {

    console.log("ensureCsrfToken() called");

    let csrfToken = getCsrfToken();

    console.log("Existing CSRF token:", csrfToken);

    if (csrfToken) {
        return csrfToken 
    }

    console.log("Requesting CSRF cookie...");

    const response = await fetch(`${API_BASE_URL}/auth/csrf/`, {
        
        method: "GET",
        credentials: "include"
    });

    console.log("CSRF response:", response.status);

    if (!response.ok) {
        
        throw new Error("Unable to initialize CSRF protection.");
    }

    csrfToken = getCsrfToken();

    console.log("CSRF token after initialization:", csrfToken);

    if (!csrfToken) {

        throw new Error("CSRF cookie was not set by the server.");
    }

    return csrfToken;
}


async function apiRequest(endpoint, options = {}) {

    const method = (options.method || "GET").toUpperCase();

    const headers = {
        "Content-Type": "application/json",
        ...options.headers
    };

    if (!["GET", "HEAD", "OPTIONS", "TRACE"].includes(method)) {
        
        const csrfToken = await ensureCsrfToken();

        headers["X-CSRFToken"] = csrfToken;
    }

    let response;

    try {
        
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            method,
            credentials: "include",
            headers
        });

    } catch (error) {
        
        throw new Error(
            "Unable to connect to PurseLens server. Please check your internet connection."
        );
    }

    let data = null;

    try {

        data = await response.json();
    } catch {

        // Response doesn't contain JSON.
    }

    if (!response.ok) {

        const error = new Error(
            data?.message ||
            data?.detail || 
            "Something went wrong. Please try again."
        );

        error.status = response.status;
        error.data = data;

        throw error;
    }

    return data;
}


async function apiGet(endpoint, options = {}) {
    
    return apiRequest(endpoint, {
        ...options,
        method: "GET"
    });
}


async function apiPost(endpoint, body = null, options = {}) {
    
    return apiRequest(endpoint, {
        ...options,
        method: "POST",
        ...(body !== null && {
            body: JSON.stringify(body)
        })
    });
}


async function apiPut(endpoint, body, options = {}) {
    
    return apiRequest(endpoint, {
        ...options,
        method: "PUT",
        body: JSON.stringify(body)
    });
}


async function apiPatch(endpoint, body, options = {}) {
    
    return apiRequest(endpoint, {
        ...options,
        method: "PATCH",
        body: JSON.stringify(body)
    });
}


async function apiDelete(endpoint, options = {}) {
    
    return apiRequest(endpoint, {
        ...options,
        method: "DELETE"
    });
}

