import axios from 'axios';
import { useEffect, useState } from 'react';

type Recipe = {
    id: number;
    title: string;
    meal: string;
    time: string;
}

export default function TableList({ handleOpen, searchTerm } : { handleOpen: (mode: 'add' | 'edit') => void, searchTerm: string }) {

    const [tableData, setTableData] = useState<Recipe[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/recipe');
                setTableData(response.data);
            } catch (err) {
                console.log('Error fetching data', err)
            }
        }
        fetchData();
    }, []);

    const filteredData = tableData.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.meal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.time.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                    <button onClick={() => handleOpen('edit')} className={`rounded-full bg-slate-200 hover:bg-slate-300 w-20`}>Edit</button>
                                </td>
                                <td>
                                    <button className={`rounded-full bg-slate-200 hover:bg-slate-300 w-20`}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}