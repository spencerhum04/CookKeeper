import { useState } from 'react'
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
      } catch(err) {
        console.error('Error adding recipe', err)
      }
      console.log('modal mode add');
    } else {
      console.log('modal mode edit')
    }
  }

  return (
    <>
      <NavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />
      <TableList handleOpen={handleOpen} searchTerm={searchTerm} />
      <ModalForm isOpen={isOpen} onClose={() => setIsOpen(false)} mode={modalMode} onSubmit={handleSubmit} recipeData={recipeData} />
    </>
  )
}

export default App
