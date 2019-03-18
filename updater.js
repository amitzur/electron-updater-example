'use strict';
const {autoUpdater} = require("electron-updater");
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

function updater(app) {
    log.info('Starting auto updater')
    app.on('ready', function()  {
        checkForUpdates();
    });

    autoUpdater.on('update-not-available', (info) => {
        setTimeout(checkForUpdates, 5000);
    })

    autoUpdater.on('update-downloaded', (info) => {
        log.info('Will quit and install in 2 seconds');
        setTimeout(() => {
            log.info('quitting and installing...');
            autoUpdater.quitAndInstall();
        }, 2000);
    })

    return autoUpdater
}

function checkForUpdates() {
    autoUpdater.checkForUpdatesAndNotify().catch(err => log.error(err));
}

module.exports = updater;