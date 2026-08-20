// ======================================
// BLOOM AI STORAGE MANAGER
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
    return `${key}${getUserStorageSuffix(user)}`;
}

function saveData(key, data, user = getCurrentUser()) {
    localStorage.setItem(getScopedStorageKey(key, user), JSON.stringify(data));

    if (user && user.id && !["currentUser", "bloomUsers"].includes(key)) {
        fetch('backend/api/storage.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: user.id,
                key: key,
                value: data
            })
        }).catch(err => console.error("Background DB sync failed:", err));
    }
}

function loadData(key, user = getCurrentUser()) {
    const data = localStorage.getItem(getScopedStorageKey(key, user));
    if (data) {
        try {
            return JSON.parse(data);
        } catch (error) {
            return data;
        }
    }
    return null;
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

function clearAllData() {
    localStorage.clear();
}

function hasData(key, user = getCurrentUser()) {
    return localStorage.getItem(getScopedStorageKey(key, user)) !== null;
}