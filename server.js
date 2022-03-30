const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({path: "./config.env"});

const server = app.listen(process.env.PORT, () => {
    console.log(`App running at port ${process.env.PORT}`);
});


