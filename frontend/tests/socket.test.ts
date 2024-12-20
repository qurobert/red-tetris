import { beforeAll, afterAll, describe, it, expect } from "vitest";
import { createServer } from "node:http";
import { type AddressInfo } from "node:net";
import { io as ioc, type Socket as ClientSocket } from "socket.io-client";
import { Server, type Socket as ServerSocket } from "socket.io";

function waitFor(socket: ServerSocket | ClientSocket, event: string) {
	return new Promise((resolve) => {
		socket.once(event, resolve);
	});
}

describe("my awesome project", () => {
	let io: Server, serverSocket: ServerSocket, clientSocket: ClientSocket;

	beforeAll(() => {
		return new Promise((resolve: any) => {
			const httpServer = createServer();
			io = new Server(httpServer);
			httpServer.listen(() => {
				const port = (httpServer.address() as AddressInfo).port;
				console.log("PORT:", port);
				clientSocket = ioc(`http://localhost:${port}`);
				io.on("connection", (socket) => {
					serverSocket = socket;
				});
				clientSocket.on("connect", resolve);
			});
		});
	});

	afterAll(() => {
		io.close();
		clientSocket.disconnect();
	});

	it("should work", () => {
		return new Promise((resolve: any) => {
			clientSocket.on("hello", (arg) => {
				expect(arg).toEqual("world");
				resolve();
			});
			serverSocket.emit("hello", "world");
		});
	});

	it("should work with an acknowledgement", () => {
		return new Promise((resolve: any) => {
			serverSocket.on("hi", (cb) => {
				cb("hola");
			});
			clientSocket.emit("hi", (arg: any) => {
				expect(arg).toEqual("hola");
				resolve();
			});
		});
	});

	it("should work with emitWithAck()", async () => {
		serverSocket.on("foo", (cb) => {
			cb("bar");
		});
		const result = await clientSocket.emitWithAck("foo");
		expect(result).toEqual("bar");
	});

	it("should work with waitFor()", () => {
		clientSocket.emit("baz");

		return waitFor(serverSocket, "baz");
	});
});