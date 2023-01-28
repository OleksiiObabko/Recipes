require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const {MONGO_URL, PORT} = require("./configs/config");
const {authorRouter, authRouter, roleRouter} = require("./routers");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
	res.json(`Listening port: ${PORT}`);
});

app.use("/auth", authRouter);
app.use("/authors", authorRouter);
app.use("/roles", roleRouter);

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message || "Unknown error",
		status: err.status || 500
	});
});

app.listen(PORT, async () => {
	mongoose.set("strictQuery", false);
	await mongoose.connect(MONGO_URL);
	console.log(`Server is listening port: ${PORT}`);
});
