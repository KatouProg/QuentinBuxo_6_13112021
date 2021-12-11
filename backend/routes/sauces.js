const express = require("express");
const router = express.Router();

// Verifier le token a chaque requete
const auth = require("../middleware/auth");

// Permet de gerer l' upload d'images lors de l' ajout ou la modification d' une sauce
const multer = require("../middleware/multer-config");

// Import du controller (logique metier) CRUD
const saucesCtrl = require("../controllers/sauces");

router.post("/", auth, multer, saucesCtrl.createSauce);
router.post("/:id/like", auth, saucesCtrl.likeDislikeSauce);
router.put("/:id", auth, multer, saucesCtrl.modifySauce);
router.delete("/:id", auth, saucesCtrl.deleteSauce);
router.get("/:id", auth, saucesCtrl.getOneSauce);
router.get("/", auth, saucesCtrl.getAllSauces);

module.exports = router;
