function getCurrentUser(userID, users) {
    let currentUser = false;

    for (const user of users) {
        if (userID == user.id) {
            currentUser = user;
        }
    }

    return currentUser;
}

module.exports = getCurrentUser;
