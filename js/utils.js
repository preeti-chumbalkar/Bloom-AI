// ======================================
// BLOOM AI SHARED STORAGE HELPERS
// ======================================

function getCurrentUser() {
    try {
        const currentUser = localStorage.getItem('currentUser');
        return currentUser ? JSON.parse(currentUser) : null;
    } catch (error) {
        return null;
    }
}

function getUserStorageSuffix(user) {
    const email = (user && user.email ? user.email : '').trim().toLowerCase();
    return email ? `_${email}` : '';
}

function getScopedStorageKey(key, user = getCurrentUser()) {
    const rawKeys = ["currentUser", "bloomUsers"];
    if (rawKeys.includes(key)) {
        return key;
    }
    const suffix = getUserStorageSuffix(user);
    return `${key}${suffix}`;
}

function saveData(key, data, user = getCurrentUser()) {
    localStorage.setItem(getScopedStorageKey(key, user), JSON.stringify(data));
}

function loadData(key, user = getCurrentUser()) {
    const value = localStorage.getItem(getScopedStorageKey(key, user));
    if (!value) return null;
    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
}

function deleteData(key, user = getCurrentUser()) {
    localStorage.removeItem(getScopedStorageKey(key, user));
}

function clearUserData(user = getCurrentUser()) {
    const suffix = getUserStorageSuffix(user);
    Object.keys(localStorage).forEach((storageKey) => {
        if (storageKey.endsWith(suffix)) {
            localStorage.removeItem(storageKey);
        }
    });
}

function saveUserSession(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function clearUserSession() {
    localStorage.removeItem('currentUser');
}
