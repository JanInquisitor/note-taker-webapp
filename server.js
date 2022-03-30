const dotenv = require("dotenv");
const app = require("./app");

dotenv.config({path: "./config.env"});

const server = app.listen(process.env.PORT || 3001, () => {
    console.log(`App running at port ${process.env.PORT}`);
});


