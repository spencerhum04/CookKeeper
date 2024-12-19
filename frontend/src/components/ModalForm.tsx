import { useState } from "react"

export default function ModalForm({ isOpen, onClose, mode, onSubmit } : {isOpen: boolean, onClose: () => void, mode: string, onSubmit: () => void}) {

    const [title, setTitle ] = useState('');
    const [time, setTime ] = useState('');
    const [meal, setMeal ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
    }

    if (!isOpen) return null;
    
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                <div className="bg-white rounded-sm shadow-lg w-96 p-6 relative">
                    <h3 className="font-bold text-xl mb-10">{mode === 'edit' ? 'Edit Recipe' : 'New Recipe'}</h3>
                    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
                        <label className="border px-4 py-2 flex items-center gap-2">
                            Recipe Name
                            <input type="text" className="grow focus:outline-none" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </label>
                        <label className="border px-4 py-2 flex items-center gap-2">
                            Meal Type
                            <input type="text" className="grow focus:outline-none" value={meal} onChange={(e) => setMeal(e.target.value)} />
                        </label>
                        <label className="border px-4 py-2 flex items-center gap-2">
                            Total Time
                            <input type="text" className="grow focus:outline-none" value={time} onChange={(e) => setTime(e.target.value)} />
                        </label>
                        <button type="button" className="absolute right-2 top-2" onClick={onClose}>
                            ✕
                        </button>
                        <button type="submit" className="px-4 py-2 bg-slate-200 hover:bg-slate-300">
                            {mode === 'edit' ? 'Save Changes' : 'Add Recipe'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}