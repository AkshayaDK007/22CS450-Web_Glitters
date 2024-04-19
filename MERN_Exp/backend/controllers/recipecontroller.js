const Recipe=require("../models/recipeschema");
const getrecipes=async (req,res)=>{
    Recipe.find({})
    .then((data) => {
      res.status(200).send({
        success: true,
        payload: data
      });
    })
    .catch(() => {
      res.status(200).send({
        success: true,
        payload: []
      });
    });
}

const searchRecipeByName = (req, res) => {
  const name = req.params.name;
  Recipe.find({ Name: name })
      .then((data) => {
          res.status(200).send({
              success: true,
              payload: data
          });
      })
      .catch(() => {
          res.status(200).send({
              success: true,
              payload: []
          });
      });
};


const getsinglerecipe=async(req,res)=>{
    Recipe.find({ _id: req.params.id })
    .then((data) => {
      res.status(200).send({
        success: true,
        payload: data
      });
    })
    .catch(() => {
      res.status(200).send({
        success: true,
        payload: []
      });
    });
}

const createrecipe = async (req, res) => {
    const { Name, Author, Description, Rating, MaxTime } = req.body;
    Recipe.create({ Name, Author, Description, Rating, MaxTime })
    .then((data) => {
      res.status(201).send({
        success: true,
        payload: data
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: false,
        error: {
          message: err
        }
      });
    });
};


const deleterecipe=async(req,res)=>{
  Recipe.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).send({
        success: true,
        payload: data
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: false,
        error: {
          message: err
        }
      });
    });
}

const updaterecipe=async(req,res)=>{
    const id = req.params.id;
  const { Name, Author, Description, Rating, MaxTime } = req.body;
  Recipe.updateOne({ _id: id }, { Name, Author, Description, Rating, MaxTime })
    .then((dbData) => {
      res.status(200).send({
        success: true,
        payload: dbData
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: false,
        error: {
          message: err
        }
      });
    });
}




module.exports={
    createrecipe,getrecipes,getsinglerecipe,deleterecipe,updaterecipe,searchRecipeByName
}