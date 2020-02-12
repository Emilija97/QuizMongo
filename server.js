const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const router = express.Router();
const config = require("config");

// const QuestionModel = require("./backend/models/question");
// const ResultModel = require("./backend/models/result");
// const UserModel = require("./backend/models/user");

const app = express();

// Bodyparser Middleware
app.use(express.json());

// app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
});

// DB Config
const db = config.get("mongoURI");

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to database !");
    })
    .catch(err => {
        console.error(err);
    });

// Use Routes
app.use("/questions", require("./backend/routes/question"));
app.use("/users", require("./backend/routes/user"));
app.use("/results", require("./backend/routes/result"));
app.use("/auth", require("./backend/routes/auth"));
app.use("/cards", require("./backend/routes/card"));

//Warnings set false
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));