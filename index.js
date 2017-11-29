"use strict";

const server = require("./server");

server.setLogger((log) => {
	$("#log").append(`${log} <br/>`);
});

const Server = {
	start() {
		server.run(() => {
			$("#currentstate").text("DMultichat запущен!");
			$("#currentstatebg").removeClass("back-danger back-warning").addClass("back-success");
		});
		$("#currentstate").text("DMultichat запускается...");
		$("#currentstatebg").removeClass("back-danger back-success").addClass("back-warning");
	},

	stop() {
		server.stop();
		$("#currentstate").text("DMultichat не запущен!");
		$("#currentstatebg").removeClass("back-success back-warning").addClass("back-danger");
	}
}

const Button = {
	start() {
		Server.start();
	},

	stop() {
		Server.stop();
	}
}