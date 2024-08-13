export const getToken = (): string | null => {
    return localStorage.getItem('jwtToken');
};

export const getUserRoles = (): string[] => {
    const token = getToken();
    if (!token) return [];
    
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.authorities || [];
};

export const isAuthenticated = (): boolean => {
    return !!getToken();
};

export const isAdmin = (): boolean => {
    return getUserRoles().includes('[ADMIN]');
};
