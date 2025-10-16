const mongoose = require("mongoose");

// Prefer MONGO_URL if set; fallback to MONGODB_URI
const mongoUri = process.env.MONGO_URL || process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Do NOT enable TLS/SSL for local MongoDB connections.
});
const connection = mongoose.connection;
connection.on("connected", () => {
    console.log("Mongo DB connected successfully");
});
connection.on("error", (err) => {
    console.log("Mongo DB not connected ", err);
});
