import asyncHandler from 'express-async-handler';
import slugify from 'slugify';
import CompanyModel from '../models/companyModel.js';

// CREATE POST
const createCompanyController = asyncHandler(async(req, res) => {
  const {en, bn, common, user} = req.body;
  
  let enSlug = slugify(en?.basicInfo?.name).toLowerCase()
  let bnSlug = slugify(en?.basicInfo?.name).toLowerCase() + "-bn"
  // const slug = basicInfo.name.replace(/[&\/\\#,+()$~%.'":*?<>{}!@^_=-]/g, "").replace(/^\s+|\s+$/gm,'').replace(/\s/g, '-').toLowerCase()

    const companyCreate = await CompanyModel.create({en, bn, common, enSlug, bnSlug, user})

    // await LocationModel.updateMany({
    //   _id: Companys
    // }, {
    //   $push: {
    //     Companys: companyCreate._id
    //   }
    // }, {"multi": true})

    // await User.updateOne({
    //   _id: req.user._id
    // }, {
    //   $push: {
    //     Companys: companyCreate._id
    //   }
    // })
    
    if(companyCreate) {
      res.status(201).json({
        _id: companyCreate._id,
        en: companyCreate.en,
        bn: companyCreate.bn,
        common: companyCreate.common, 
        user: companyCreate.user,
        enSlug: companyCreate.enSlug,
        bnSlug: companyCreate.bnSlug,
      })
      
    } else {
      res.status(400).json({msg: "Company created faield"})
    }

})

// EDIT Company
const updateCompanyController = asyncHandler(async(req, res) => {
  try {
    const Company = await CompanyModel.findOne({slug: req.params.slug})

    if (Company) {
      const updateCompany = await CompanyModel.findOneAndUpdate(req.params.slug, {
        $set: req.body
      }, {new: true})
      res.status(200).json(updateCompany)
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (error) {
    res.status(404)
      throw new Error('company not found')
  }
})

// GET SINGLE Company
const detailsCompanyController = asyncHandler(async(req, res) => {

  // const Company = await CompanyModel.findOne({slug: req.body.slug}).populate('user')

  // if(Company) {
  //   res.status(200).json(Company)
  // } else {
  //   res.status(400).json({msg: "Company not found!"})
  // }

    await CompanyModel.findOne({ enSlug: req.params.enSlug })
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: {msg: "Company not found!"}
                });
            }
            res.json(data);
        });
})

// ALL Company LIST
const allCompanyController = asyncHandler( async( req, res) => {
  const users = await CompanyModel.find({}).populate('user').sort({createdAt: 'desc'})
  if(users) {
    res.status(200).json(users)
  } else {
    res.status(404).json({msg: "Company not found"})
  }
})

// DELETE POST
const deleteCompanyController = asyncHandler(async(req, res) => {
  const Company = await CompanyModel.findById(req.params.id)
  if(!Company) {
    res.status(404)
    throw new Error("Company not found")
  } else {
    const deleteCompany = await Company.remove()
    if(deleteCompany) {
      res.status(200).json({message: "Company deleted!"})
    } else {
      res.status(500)
      throw new Error("Server side error!")
    }
  }
})

export {
  createCompanyController,
  deleteCompanyController,
  updateCompanyController,
  detailsCompanyController,
  allCompanyController
};

