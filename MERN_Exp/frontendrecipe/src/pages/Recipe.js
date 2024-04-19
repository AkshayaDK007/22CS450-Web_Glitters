import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Recipe.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DeleteModal from '../components/DeleteModal';
import { Link } from 'react-router-dom';

const url = '/api/recipes'; // Adjust the API endpoint for vintage recipes

const RecipeTile = ({ recipe, onDeleteClick }) => (
  <Card className="recipe-tile mb-3">
    <Card.Body>
      <Card.Title>{recipe.Name}</Card.Title>
      <Card.Text>
        <p>Author: {recipe.Author}</p>
        <p>Description: {recipe.Description}</p>
        <p>Rating: {recipe.Rating}</p>
        <p>MaxTime: {recipe.MaxTime}</p>
      </Card.Text>
      
      <Link to={`/save/${recipe._id}`}>
        <FaEdit className="ml-2" />
      </Link>
      
      <FaTrash className="ml-2" onClick={() => onDeleteClick(recipe._id)} />
    </Card.Body>
  </Card>
);

function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRecipes = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.payload);
      })
      .catch(() => {
        setRecipes([]);
      });
  };

  const searchRecipeByName = () => {
    fetch(`${url}/search/${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
            setRecipes(data.payload);
        })
        .catch(() => {
            setRecipes([]);
        });
};

  const deleteRecipe = (id) => {
    fetch(`${url}/${id}`, { method: 'DELETE' })
      .then(() => {
        fetchRecipes();
        setShowDeleteModal(false);
      })
      .catch(() => {});
  };

  const handleDeleteRecipeClick = (id) => {
    setShowDeleteModal(true);
    setSelectedRecipe({ _id: id });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className='container'>
      <div className='header-container'>
        <h1 className='mb-3 mt-5'>Recipe List</h1>
        <Link to='/save'>
          <Button variant='primary'>Create Recipe</Button>
        </Link>
      </div>

      <div className="search-container">
        <Form.Control
        className="search-input"
          type="text"
          placeholder="Search recipe by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="primary" onClick={searchRecipeByName}>Search</Button>
      </div>

      <div className="recipe-list">
  {recipes.length > 0 ? (
    recipes.map((recipe) => (
      <RecipeTile key={recipe._id} recipe={recipe} onDeleteClick={handleDeleteRecipeClick} />
    ))
  ) : (
    <p id="no">No such recipe found. Please recheck !!</p>
  )}
</div>

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        {...selectedRecipe}
        deleteRecipe={() => deleteRecipe(selectedRecipe._id)}
      />
    </div>
  );
}

export default Recipe;
