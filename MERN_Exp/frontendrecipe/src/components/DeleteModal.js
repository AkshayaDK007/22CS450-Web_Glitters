import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function DeleteModal({
  showDeleteModal,
  setShowDeleteModal,
  recipeName,
  recipeId,
  deleteRecipe
}) {
  const handleClose = () => setShowDeleteModal(false);

  return (
    <>
      <Modal
        show={showDeleteModal}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        centered
      >
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Delete Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-dark">Are you sure you want to delete the recipe "{recipeName}"?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='danger' onClick={() => deleteRecipe(recipeId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;