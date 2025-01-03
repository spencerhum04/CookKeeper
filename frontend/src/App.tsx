import { useEffect, useState } from 'react'
import './App.css'
import ModalForm from './components/ModalForm.tsx'
import NavBar from './components/Navbar.tsx'
import TableList from './components/Tablelist.tsx'
import axios from 'axios'

type Recipe = {
  id: number;
  title: string;
  meal: string;
  time: string;
}

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [recipeData, setRecipeData] = useState(null);
  const [tableData, setTableData] = useState([]);

  const fetchRecipe = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/recipe');
        setTableData(response.data);
    } catch (err) {
        console.log('Error fetching data', err)
    }
  }

  useEffect(() => {
    fetchRecipe();
  }, []);

  const handleOpen = (mode: 'add' | 'edit', recipe) => {
    setRecipeData(recipe);
    setIsOpen(true);
    setModalMode(mode)
  }

  const handleSubmit = async(newRecipeData: Recipe) => {
    if(modalMode === 'add') {
      try {
        const response = await axios.post('http://localhost:3000/api/recipe', newRecipeData)
        console.log('Recipe added:', response.data)
        setTableData((prevData) => [...prevData, response.data]);
      } catch(err) {
        console.error('Error adding recipe', err)
      }
      console.log('modal mode add');
    } else {
      console.log('Updating recipe with ID:', recipeData.id);
        try {
          const response = await axios.put(`http://localhost:3000/api/recipe/${recipeData.id}`, newRecipeData);
          console.log('Recipe updated', response.data);
          setTableData((prevData) =>
            prevData.map((recipe) => (recipe.id === recipeData.id ? response.data : recipe))
        );
        } catch(err) {
          console.log('Error updating recipe', err);
        }
    }
  }

  return (
    <>
      <NavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />
      <TableList setTableData={setTableData} tableData={tableData} handleOpen={handleOpen} searchTerm={searchTerm} />
      <ModalForm isOpen={isOpen} onClose={() => setIsOpen(false)} mode={modalMode} onSubmit={handleSubmit} recipeData={recipeData} />
    </>
  )
}

export default App
