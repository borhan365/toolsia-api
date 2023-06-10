import asyncHandler from 'express-async-handler';
import slugify from "slugify";
import JobModel from "../models/jobModel.js";

// create job
const createJobController = asyncHandler(async(req, res) => {
  const {basicInfo, comapny, location, user} = req.body; 

  let slug = slugify(basicInfo.name).toLowerCase()

  const checkIsJobIsExist = await JobModel.findOne({slug: req.body.slug})

  // if(checkIsJobIsExist) {
  //  return res.status(500).json("This job is already created!")
  // }

  const createNewJob = await JobModel.create({basicInfo, slug, comapny, location, user})

  if(createNewJob) {
    res.status(201).json({
      _id: createNewJob._id,
      basicInfo: createNewJob.basicInfo,
      slug: createNewJob.slug,
      comapny: createNewJob.comapny,
      location: createNewJob.location,
      user: createNewJob.user,
      slug: createNewJob.slug,
    })
  } else {
    res.status(500)
    throw new Error("New job create failed!")
  }
})


// get single job
const detailsJobController = asyncHandler(async(req, res) => {

  await JobModel.findOne({ slug: req.params.slug })
  .exec((err, data) => {
      if (err) {
          return res.json({
              error: err
          });
      }
      res.json(data);
  });
})

// update job
const updateJobController = asyncHandler(async(req, res) => {

  const checkIsExist = await JobModel.findOne({slug: req.body.slug})

  if(checkIsExist) {
    const updateJob = await JobModel.findOneAndUpdate(req.params.slug, {
      $set: req.body
    }, {new: true})
    res.status(200).json(updateJob)
  } else {
    res.status(500)
    throw new Error("Job update successfully!")
  }

})


// get all job
const allJobController = asyncHandler(async(req, res) => {
  const jobs = await JobModel.find({})
  if(jobs) {
    res.status(200).json(jobs)
  } else {
    res.status(400)
    throw new Error("All jobs not found!")
  }
})

// delete single 
const deleteJobController = asyncHandler(async(req, res) => {
  const Job = await JobModel.findById(req.params.slug)
  JobModel.findByIdAndDelete(req.params.slug, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Deleted : ", docs);
    }
});
})

export { createJobController, updateJobController, deleteJobController, detailsJobController, allJobController };

