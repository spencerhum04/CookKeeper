import axios from 'axios';
import { useEffect, useState } from 'react';

type Recipe = {
    id: number;
    title: string;
    meal: string;
    time: string;
}

export default function TableList({ handleOpen, tableData, setTableData, searchTerm } : { handleOpen: (mode: 'add' | 'edit') => void, searchTerm: string }) {

    const filteredData = tableData.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.meal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.time.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async(id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
        if(confirmDelete) {
            try {
                await axios.delete(`http://localhost:3000/recipe/${id}`);
                setTableData((prevData) => prevData.filter(recipe => recipe.id !== id));
            } catch (err) {
                console.log('Error deleting recipe', err);
            }
        }
    }

    const headers = [
        { title: ""},
        { title: "Recipe Name" },
        { title: "Meal Type" },
        { title: "Total Time" },
    ]

    return (
        <>            
            <div className="px-4 py-2">
                <table className="w-full">
                    <thead className="border-b">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} className="text-left py-4">{header.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(recipe => (
                            <tr key={recipe.id} className="border-b">
                                <th className="py-2">{recipe.id}</th>
                                <td className="py-2">{recipe.title}</td>
                                <td className="py-2">{recipe.meal}</td>
                                <td className="py-2">{recipe.time}</td>
                                <td>
                                    <button onClick={() => handleOpen('edit', recipe)} className={`rounded-full bg-blue-200 hover:bg-blue-300 w-20`}>Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(recipe.id)} className={`rounded-full bg-red-200 hover:bg-red-300 w-20`}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}