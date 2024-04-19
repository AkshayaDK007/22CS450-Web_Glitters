const Student=require("../model/attendanceschema");
const getstudent=async (req,res)=>{
    Student.find({})
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

const getsinglestudent=async(req,res)=>{
  Student.find({ _id: req.params.id })
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


const createstudent = async (req, res) => {
    const { Name, Staff, PresentStatus, ClassHour } = req.body;
    Student.create({ Name, Staff, PresentStatus, ClassHour })
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


const deletestudent=async(req,res)=>{
    Student.deleteOne({ _id: req.params.id })
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

const updatestudent=async(req,res)=>{
    const id = req.params.id;
  const { Name, Author, Description, Rating, MaxTime } = req.body;
  Student.updateOne({ _id: id }, { Name, Author, Description, Rating, MaxTime })
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
    getstudent,createstudent,deletestudent,updatestudent,getsinglestudent
}