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
        log.info('relaunching...');
        app.relaunch();
    })

    return autoUpdater
}

function checkForUpdates() {
    autoUpdater.checkForUpdatesAndNotify().catch(err => log.error(err));
}

module.exports = updater;