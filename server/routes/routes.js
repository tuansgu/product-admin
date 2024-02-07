const express = require("express");
const router = new express.Router();
const conn = require("../db/conn")
const multer = require("multer");

var imgConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, `image-${Date.now()}.${file.originalname}`);
    }
});

const isImage = (req,file,callback) => {
    if(file.mimetype.startsWith("image"))
    {
        callback(null, true)
    }
    else
    {
        callback(null, Error("only image is allowed"))
    }
}

var upload = multer({
    storage:imgConfig,
    fileFilter:isImage
})

router.post("/register",upload.single("photo"), (req,res) =>{
    const {fname, fdescription} = req.body;
    const {filename} = req.file;
    if(!fname || !fdescription || !filename)
    {
        res.status(422).json({status:422, message:"fill all the details"})
    }
    try{
        conn.query("INSERT INTO product SET?", {name:fname, description:fdescription,image:filename},(err,result) => {
            if(err) {
                console.log("error")
            }
            else
            {
                console.log("data added")
                res.status(201).json({status:201, data:req.body})
            }
        })
    }
    catch(error)
    {
        res.status(422).json({status:422, message:"error"})
    }
})

//get product data
router.get("/getdata", (req,res) => {
    try {
        conn.query("SELECT * FROM product", (err, result) => {
            if(err) {
                console.log("error")
            }
            else
            {
                console.log("data get")
                res.status(201).json({status:201, data:result})
            }
        })
    }
    catch(error)
    {
        res.status(422).json({status:422, error})
    }
})

// delete product
router.delete("/:id",(req,res) => {
    const {id} = req.params; // Lỗi chính tả, nên sửa thành req.params

    try {
        conn.query(`DELETE FROM product WHERE id ='${id}'`, (err, result) => {
            if(err) {
                console.log("error")
            }
            else
            {
                console.log("data delete")
                res.status(201).json({status:201, data:result})
            }
        })
    } catch (error) {
        res.status(422).json({status:422, error})
    }
})

module.exports = router;