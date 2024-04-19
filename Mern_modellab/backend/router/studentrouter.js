const { Router } = require("express");

const {
    getstudent,createstudent,deletestudent,updatestudent,getsinglestudent
}=require("../controller/controller");

const router=Router();
router.get("/",getstudent);
router.get("/:id",getsinglestudent);
router.post("/",createstudent);
router.delete("/",deletestudent);
router.put("/",updatestudent);

module.exports=router