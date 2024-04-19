import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import './Recipelist.css'

const initialRecipe = {
    Name: '',
    Author: '',
    Description: '',
    Rating: '',
    MaxTime: ''
};

const url = '/api/recipes'; // Adjust the API endpoint for vintage recipes

const defaultRecipeTexts = {
  header: 'Create Recipe',
  alert: 'Recipe created successfully',
  showAlert: false,
  variant: 'success'
};

const updateRecipeTexts = {
  header: 'Update Recipe',
  alert: 'Recipe updated successfully',
  showAlert: false,
  variant: 'success'
};

function Recipelist() {
  const { id } = useParams();
  const [recipeInfo, setRecipeInfo] = useState(initialRecipe);
  const [recipeText, setRecipeText] = useState(defaultRecipeTexts);
  const navigate = useNavigate();

  const fetchRecipe = () => {
    if (id) {
      setRecipeText(updateRecipeTexts);
      fetch(`${url}/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setRecipeInfo(data.payload[0] || initialRecipe);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let methodName = 'POST';
    let recipeData = JSON.stringify({
        Name: recipeInfo.Name,
        Author: recipeInfo.Author,
        Description: recipeInfo.Description,
        Rating: recipeInfo.Rating,
        MaxTime: recipeInfo.MaxTime
    });
    let methodUrl = url;
    if (id) {
      methodName = 'PUT';
      methodUrl = `${methodUrl}/${id}`;
    }
    const options = {
      method: methodName,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: recipeData
    };
    fetch(methodUrl, options)
      .then((doc) => {
        setRecipeText({
          ...recipeText,
          showAlert: true,
          variant: 'success'
        });
        setTimeout(() => {
          navigate('/');
        }, 1000);
      })
      .catch((e) => {
        setRecipeText({
          ...recipeText,
          showAlert: true,
          variant: 'danger'
        });
      });
  };

  useEffect(() => {
    fetchRecipe();
}, [id, fetchRecipe]);

const setValueForm = (newValue, propName) => {
  setRecipeInfo((prevRecipe) => ({
    ...prevRecipe,
    [propName]: newValue
  }));
};


  return (
    <div className='container'>
      <div className='header-container'>
        <h1 className='mb-3 mt-5 text-center'>{recipeText.header}</h1>
        <Link to='/'>
          <Button variant='primary'>Back</Button>
        </Link>
      </div>
      <div className='container form-container'>
        {recipeText.showAlert && (
          <Alert variant={recipeText.variant}>{recipeText.alert}</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='recipeForm.Name'>
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Chocolate Cake'
              value={recipeInfo.Name}
              onChange={(e) => setValueForm(e.target.value,"Name")}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='recipeForm.Author'>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type='text'
              placeholder='French'
              value={recipeInfo.Author}
              onChange={(e) => setValueForm(e.target.value, 'Author')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='recipeForm.Description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='30 minutes'
              value={recipeInfo.Description}
              onChange={(e) => setValueForm(e.target.value, 'Description')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='recipeForm.Rating'>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type='text'
              placeholder='1 hour'
              value={recipeInfo.Rating}
              onChange={(e) => setValueForm(e.target.value, 'Rating')}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='recipeForm.MaxTime'>
            <Form.Label>MaxTime</Form.Label>
            <Form.Control
              type='text'
              placeholder='4'
              value={recipeInfo.MaxTime}
              onChange={(e) => setValueForm(e.target.value, 'MaxTime')}
            />
          </Form.Group>
          <Button type='submit' variant='primary' className='text-right'>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Recipelist;