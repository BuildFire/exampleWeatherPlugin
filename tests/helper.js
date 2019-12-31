const test = (title, runFn) => {
    try {
        runFn();
        logSuccess(title);
    } catch (error) {
        logError(title);
        logError(error);
    }
};

const expect = (title, result) => {
    if (result) {
        logSuccess(title);
    } else {
        logError(title);
    }
};

const cleanPublicData = (ids, tag) => {
    setTimeout(() => {
        ids.forEach((id) => {
            buildfire.publicData.delete(id, tag, () => { });
        });
    }, 2000);
};

const getID = () => Math.random()
    .toString(16)
    .slice(2);

const logError = (msg) => {
    buildfire.components.tester.log({ type: 'error', log: msg });
    console.log(`%cTests ===> ${msg}`, 'color:red;');
};

const logInfo = (msg) => {
    buildfire.components.tester.log({ type: 'info', log: msg });
    console.log(`%cTests ===> ${msg}`, 'color:blue;');
};

const logSuccess = (msg) => {
    buildfire.components.tester.log({ type: 'success', log: msg });
    console.log(`%cTests ===> ${msg}`, 'color:green;');
};