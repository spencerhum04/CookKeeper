import express from 'express';

import * as recipeController from "../controllers/recipeController.js"

const router = express.Router();

router.get('/recipe', recipeController.getRecipe);
router.post('/recipe', recipeController.createRecipe);
router.put('/recipe/:id', recipeController.updateRecipe);
router.delete('/recipe/:id', recipeController.deleteRecipe);
router.get('/recipe/search', recipeController.searchRecipe);

export default router;