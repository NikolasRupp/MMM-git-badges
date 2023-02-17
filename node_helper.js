var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

    init() {
    },

    start() {
    },

    stop() {
    },

    // If notification of the main.js file is received, the node_helper will do this here:
    socketNotificationReceived(notification, payload) {
		console.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
    },
});
