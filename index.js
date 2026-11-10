import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import routes from "./routes/route.js";
import materialRoutes from "./routes/MaterialRoutes.js";
import catequistaRoutes from "./routes/CatequistaRoutes.js";
import gruposRoutes from "./routes/GruposRoutes.js";

const PORT = 3000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.set("views", join(__dirname, "views"));

app.use(express.static(join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("catequista/login");
});

app.use(materialRoutes);
app.use(catequistaRoutes);
app.use(gruposRoutes);
app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export default app;