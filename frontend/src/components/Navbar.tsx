export default function NavBar({ onOpen, onSearch } : { onOpen: () => void, onSearch: (query: string) => void }) {

    const handleSearchChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <>
            <div className="flex px-4 py-2 border-b justify-between">
                <a className="text-2xl font-bold">CookKeeper</a>
                <input type="text" placeholder="Search" className="px-4 py-2 border rounded-sm w-96 focus:outline-none" onChange={handleSearchChange} />
                <button className="bg-slate-200 hover:bg-slate-300 px-4 py-2" onClick={onOpen}>New Recipe</button>
            </div>
        </>
    )
}