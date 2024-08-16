const port=4000;
const express =require("express");
const app=express();
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const multer=require("multer");
const path=require("path");
const cors =require("cors");
// const pdf=require("html-pdf");
const { type } = require("os");
app.use(express.json());//request are passed to be json
app.use(cors());//connect to port by express
//Databasse Connection with mongo db
// app.use(express.urlencoded({extented:true}));

mongoose.connect("mongodb+srv://gousikram10:Z8jdUH1FWXPv1n48@cluster0.9npt2wm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
//API CREATION
app.get("/",(req,res)=>{
    res.send("Express is running");
})

app.listen(port,(error)=>{
if(!error){
console.log("server runing "+port);
}
else
{
console.log("Error"+error);
}
})

//Image Storage Engine
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})
const upload=multer({storage:storage});
//Upload endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('company'),(req,res)=>
{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})
//Scheme for creating products'
const Company=mongoose.model("Company",{
    id:{
        type:Number,
        required:true,
    },
    companyName: {
        type:String,
        required:true,
    },
    role: {
        type:String,
        required:true,
    },
    city: {
        type:String,
        required:true,
    },
    image: {
        type:String,
        required:true,
    },
    address: {
        type:String,
        required:true,
    },
    applyBy: {
        type:Date,
        default:Date.now,
    },
    Salary: {
        type:String,
        required:true,
    },
    experience: {
        type:String,
        required:true,
    },
    startDate:{
        type:Date,
        default:Date.now,
    },
    skills:[{
        type:String,
        required:true,
    }],
    eligibility: {
        type:String,
        required:true,
    },
    aboutCompany: {
        type:String,
        required:true,
    },
    jobType: {
        type:String,
        required:true,
    },
    aboutjob:{
        type:String,
        required:true
    },
    vacancies:{
        type:Number,
        required:true,
    }
})

app.post('/addjobs',async(req,res)=>{
    let products=await Company.find({});
    let id;
    if(products.length>0)
    {
        let last_array=products.slice(-1);
        let last_job=last_array[0];
        id=last_job.id+1;
    }
    else
    id=1;
    const product=new Company({
        id:id,
        companyName:req.body.companyName,
        role:req.body.role,
        city:req.body.city,
        image:req.body.image,
        address:req.body.address,
        applyBy:req.body.applyBy,
        Salary:req.body.Salary,
        experience:req.body.experience,
        eligibility:req.body.eligibility,
        aboutCompany:req.body.aboutCompany,
        jobType:req.body.jobType,
        startDate:req.body.startDate,
        skills:req.body.skills,
        aboutjob:req.body.aboutjob,
        vacancies:req.body.vacancies
    });
    await product.save();
    console.log(product);
    console.log("saved");
    res.json({
        success:true,
        companyName:req.body.companyName,
    })
     
})
app.post('/removejob',async(req,res)=>{
    await Company.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
        succes:true,  
    })
})

// app.put('/updatejob/:id', async (req, res) => {
//     try {
//       const updatedJob = await Company.findOneAndUpdate(
//         { id: req.params.id }, // Filter object
//         req.body, 
//         { new: true }
//       );
//       res.status(200).json(updatedJob);
//       console.log("updated");
//       alert("updated successfully");
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
app.put('/updatejob/:id', async (req, res) => {
    try {
      console.log('Starting update job request');
      const updatedJob = await Company.findOneAndUpdate(
        { id: req.params.id }, // Filter object
        req.body, 
        { new: true }
      );
    //   alert("updated successfully");
      console.log('Job updated successfully');
      res.status(200).json(updatedJob);
    } catch (error) {
      console.error('Error updating job:', error);
      res.status(500).json({ message: error.message });
    }
  });
  

app.get('/jobs/:id', async (req, res) => {
    try {
      let job = await Company.findOne({id:req.params.id});
      if (!job) {
        return res.status(404).send({ message: 'Job not found' });
      }
      console.log("running");
      res.send(job);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching job' });
    }
  });



//get all jobs
app.get('/getalljobs',async(req,res)=>{
    let jobs=await Company.find({});
    console.log("all jobs fetched");
    res.send(jobs);
})