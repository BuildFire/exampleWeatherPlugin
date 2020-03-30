const authManager = {
    
    _currentUser:null,
    get currentUser() {
        return authManager._currentUser;
    },
    set currentUser(user) {
        authManager._currentUser = user; 
        authManager.onUserChange(user);
    },
    
    enforceLogin() {
        buildfire.auth.getCurrentUser((err, user) => {
            if (!user) {
                buildfire.auth.login({ allowCancel: false }, (err, user) => {
                    if (!user)
                         authManager.enforceLogin();
                    else
                        authManager.currentUser = user;
                });
            }
            else
                authManager.currentUser = user;
        });
       
    },

    onUserChange(user) {
        console.warn('You must handle on user changed');
    }
};
buildfire.auth.onLogout(() => {
    window.buildfire.history.get({}, (e, b) => {
        b.forEach(() => {
          history.pop();
        });
      });
    window.location.reload();
});
