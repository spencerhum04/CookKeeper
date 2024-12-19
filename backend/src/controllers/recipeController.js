import * as recipeService from "../services/recipeServices.js"

export const getRecipe = async (req, res) => {
    try {
        const recipes = await recipeService.getRecipe();
        res.status(200).json(recipes);
    } catch(err) {
        console.error('Error fetching recipe:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const createRecipe = async (req, res) => {
    try {
        const recipeData = req.body;
        const newRecipe = await recipeService.createRecipe(recipeData);
        res.status(200).json(newRecipe);
    } catch(err) {
        console.error('Error adding recipe:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipeData = req.body;
        const updatedRecipe = await recipeService.updateRecipe(recipeId, recipeData);
        if(!updatedRecipe) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json(updatedRecipe);
    } catch(err) {
        console.error('Error updating recipe:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const deleted = await recipeService.deleteRecipe(recipeId);
        if(!deleted) {
            return res.status(404).json({ message: 'Client not found' })
        }
        res.status(200).send();
    } catch(err) {
        console.error('Error deleting recipe:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const searchRecipe = async (req, res) => {
    try {
        const searchTerm = req.query.q;
        const recipes = await recipeService.searchRecipe(searchTerm);
        res.status(200).json(recipes);
    } catch(err) {
        console.error('Error searching recipe:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}