require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const router = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use("/", router);
app.use((err, req, res) =>
    {
        res.status(500).json(err);
    });

app.listen(process.env.PORT, console.log(`Success running on PORT ${process.env.PORT}`));
