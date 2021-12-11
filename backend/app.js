// Install d'express --> deploiement de l'API
const express = require("express");

const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config();

// Import des routes user et sauce
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

mongoose
  .connect(
    process.env.SECRET_DB,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Creation de l'application
const app = express();

// Ajout des headers permettant d'acceder a l'API depuis n'importe quelle  origine - d' ajouter les headers aux requetes envoyees vers l' API - d' envoyer des requetes avec les methodes mentionnees
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(bodyParser.json()); //   ---> app.use(express.json()); ???

app.use(helmet());

app.use("/images", express.static(path.join(__dirname, "images")));

// Enregistrement du router pour toutes les demandes effectuees vers l' API
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
