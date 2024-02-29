import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const api = "b3d6da281c2d83668923482857dd049d";

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", async (req, res) => {
    const latitude = req.body.lat;
    const longitude = req.body.lon;
    try{
        const response = await axios.get("https://api.openweathermap.org/data/3.0/onecall", {
            params: {
                lat: latitude,
                lon: longitude,
                units: "metric",
                appid: api,
            }
        }
        );
        const result = response.data;
        res.render("index.ejs", {
            weather: result.daily[0].summary,
            rain: result.daily[0].rain,
        });
        console.log(result.daily);
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: error.message,
        })
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});