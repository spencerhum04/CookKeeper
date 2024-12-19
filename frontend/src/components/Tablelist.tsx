export default function TableList({ handleOpen } : { handleOpen: (mode: 'add' | 'edit') => void }) {

    const headers = [
        { title: ""},
        { title: "Recipe Name" },
        { title: "Meal Type" },
        { title: "Total Time" },
    ]

    const recipes = [
        { id: 1, recipe: "Burger", meal: "Lunch", time: "10 minutes"  },
        { id: 2, recipe: "Sandwich", meal: "Lunch", time: "10 minutes"  },
        { id: 3, recipe: "Cereal", meal: "Breakfast", time: "2 minutes"  },
    ]

    return (
        <>
            <div className="px-4 py-2">
                <table className="w-full">
                    <thead className="border-b">
                        <tr>
                            {headers.map(header => (
                                <th className="text-left py-4">{header.title}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map(recipe => (
                            <tr className="border-b">
                                <th className="py-2">{recipe.id}</th>
                                <td className="py-2">{recipe.recipe}</td>
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