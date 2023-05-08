const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
	// if (req.url === "/") {
	// 	fs.readFile(
	// 		path.join(__dirname, "public", "index.html"),
	// 		(err, content) => {
	// 			if (err) throw err;
	// 			res.writeHead(200, { "Content-Type": "text/html" });
	// 			res.end(content);
	// 		}
	// 	);
	// }

	// if (req.url === "/about") {
	// 	fs.readFile(
	// 		path.join(__dirname, "public", "about.html"),
	// 		(err, content) => {
	// 			if (err) throw err;
	// 			res.writeHead(200, { "Content-Type": "text/html" });
	// 			res.end(content);
	// 		}
	// 	);
	// }
	// if (req.url === "/api/user") {
	// 	const users = [
	// 		{ name: "bob", age: 40 },
	// 		{ name: "john", age: 20 },
	// 	];

	// 	res.writeHead(200, { "Content-Type": " application/json " });
	// 	res.end(JSON.stringify(users));
	// }

	// Build file path
	let filePath = path.join(
		__dirname,
		"public",
		req.url === "/" ? "index.html" : req.url
	);

	// Extension of file
	let extname = path.extname(filePath);

	// Content Type
	let contentType = "text/html";

	switch (extname) {
		case ".js":
			contentType = "text/javascript";
			break;
		case ".css":
			contentType = "text/css";
			break;
		case ".json":
			contentType = "application/json";
			break;
		case ".png":
			contentType = "image/png";
			break;
		case ".jpg":
			contentType = "image/jpg";
			break;
		case ".png":
			contentType = "image/png";
			break;
		case ".ico":
			contentType = "image/ico";
			break;
	}

	fs.readFile(filePath, (err, content) => {
		if (err) {
			if (err.code == "ENOENT") {
				// Page Not Found
				fs.readFile(
					path.join(__dirname, "public", "404.html"),
					(err, content404) => {
						res.writeHead(200, { "Content-Type": "text/html" });
						res.end(content404, "utf-8");
					}
				);
			} else {
				// Server Error
				res.write(500);
				res.end(`Server Error: ${err.code}`);
			}
		} else {
			res.writeHead(200, { "Content-Type": contentType });
			res.end(content, "utf-8");
		}
	});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}...`));
