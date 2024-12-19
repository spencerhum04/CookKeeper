import { query } from "../db.js";

export const getRecipe = async() => {
    const { rows } = await query('SELECT * FROM recipe_tb');
    return rows;
}

export const createRecipe = async(recipeData) => {
    const { title, meal, time } = recipeData;
    const { rows } = await query(`INSERT INTO recipe_tb (title, meal, time) VALUES ($1, $2, $3) RETURNING *`,
        [title, meal, time]
    );
    return rows[0];
}

export const updateRecipe = async(recipeId, recipeData) => {
    const { title, meal, time } = recipeData;
    const { rows } = await query(`UPDATE recipe_tb SET title = $1, meal = $2, time = $3 WHERE id = $4 RETURNING *`,
        [title, meal, time, recipeId]
    );
    return rows[0];
}

export const deleteRecipe = async(recipeId) => {
    const { rowCount } = await query(`DELETE FROM recipe_tb WHERE id = $1`,
        [recipeId]
    );
    return rowCount > 0;
}

export const searchRecipe = async(searchTerm) => {
    const { rows } = await query(`SELECT * FROM recipe_tb WHERE title ILIKE $1 OR meal ILIKE $1 OR TIME ILIKE $1`,
        [`%${searchTerm}%`]
    );
    return rows;
}