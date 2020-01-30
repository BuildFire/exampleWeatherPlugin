/*authManager.enforceLogin();
if (typeof buildfire.components == "undefined")
    buildfire.components = {};
class Tester {
    constructor() {
        this._handlers = [];
    };
    
    log = (item) => {
        this._handlers.forEach(el => { el(item); });
    };
    onLog = (handler) => {
        this._handlers = [];
        this._handlers.push(handler);
    };
};
buildfire.components.tester = new Tester();


buildfire.components.tester.onLog((log) => {
    const holder = document.getElementById('resultHolder');
    let logType = '';
    switch (log.type) {
        case 'info':
            logType = 'list-group-item-primary';
            break;
        case 'error':
            logType = 'list-group-item-danger';
            break;
        case 'success':
            logType = 'list-group-item-success';
            break;
    };

    const li = document.createElement('li');
    li.innerHTML = log.log;
    li.classList.add('list-group-item');
    li.classList.add(logType);
    holder.appendChild(li);
});

function handleRunTests() {
    document.getElementById('resultHolder').innerHTML = '';

    runTests();
};*/