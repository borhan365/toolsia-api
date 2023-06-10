import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { json } from "express"
import path from 'path'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import logoRouters from './routes/LogoRoutes.js'
import menuRouters from './routes/MenuRoutes.js'
import ambulanceRoutes from './routes/ambulanceRoutes.js'
import articleRoutes from './routes/articleRouters.js'
import bloodBankRoutes from './routes/bloodBankRoutes.js'
import bloodDonnerRoutes from './routes/bloodDonnerRoutes.js'
import locationRoutes from './routes/locationRoutes.js'
import oxygenRoutes from './routes/oxygenRoutes.js'
import pharmacyRoutes from './routes/pharmacyRoutes.js'
import softwareCategoryRoutes from './routes/softwareCategoryRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import userRouters from './routes/userRoutes.js'
import connectDB from './utils/connectDB.js'

// doctor
import degreeRoutes from './routes/degreeRoutes.js'
import doctorTypeRoutes from './routes/doctorTypeRoutes.js'
import jobDesignation from './routes/jobDesignationRoutes.js'
import softwareRoutes from './routes/softwareRoutes.js'
import specialistRoutes from './routes/specialistRoutes.js'

// hospital
import featuresRoutes from './routes/featuresRoutes.js'
import hospitalRoutes from './routes/hospitalRoutes.js'
import servicesRoutes from './routes/servicesRoutes.js'

import hospitalDirectorTypeRoutes from './routes/directorTypeRoutes.js'
import hospitalDirectorRoutes from './routes/hospitalDirectorRoutes.js'
import hospitalSpecialistRoutes from './routes/hospitalSpecialistRoutes.js'
import hospitalTypeRoutes from './routes/hospitalTypeRoutes.js'

import companyRoutes from './routes/companyRoutes.js'
import jobRoutes from './routes/jobRoutes.js'

// medicine

import pageRouters from './routes/pageRoutes.js'

// commons
import categoryRoutes from './routes/categories/categoryRoutes.js'
import childCategoryRoutes from './routes/categories/childCategoryRoutes.js'
import subCategoryRoutes from './routes/categories/subCategoryRoutes.js'
import commonRoutes from './routes/commons/commonRoutes.js'

const app = express()

app.use(cors());

dotenv.config()
app.use(express.json())
app.use(json()) // use json parser to convert the body to json for upcoming method to consume
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
connectDB()

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Commons
app.use('/api/common', commonRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/sub-category', subCategoryRoutes);
app.use('/api/child-category', childCategoryRoutes);


// ROUTERS
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRouters);
app.use('/api/pages', pageRouters);


app.use('/api/location', locationRoutes);

app.use('/api/upload', uploadRoutes);
app.use('/api/logo', logoRouters);
app.use('/api/menu', menuRouters);
app.use('/api/article', articleRoutes);

// doctor
app.use('/api/doctor/specialist', specialistRoutes)
app.use('/api/doctor/job-designation', jobDesignation)
app.use('/api/doctor/degree', degreeRoutes)
app.use('/api/doctor/type', doctorTypeRoutes)

// software
app.use('/api/software', softwareRoutes);
app.use('/api/software/category', softwareCategoryRoutes);

// hospital
app.use('/api/hospital/director/type', hospitalDirectorTypeRoutes)
app.use('/api/hospital/service', servicesRoutes)
app.use('/api/hospital/feature', featuresRoutes)
app.use('/api/hospital/type', hospitalTypeRoutes)
app.use('/api/hospital/specialist', hospitalSpecialistRoutes)
app.use('/api/hospital/director', hospitalDirectorRoutes)
app.use('/api/hospital', hospitalRoutes)

// 
//  Director will be separetely where you can filter by hospital or comapny whatever. 
// 


app.use('/api/ambulance', ambulanceRoutes)
app.use('/api/blood-bank', bloodBankRoutes)
app.use('/api/blood-donner', bloodDonnerRoutes)
app.use('/api/oxygen', oxygenRoutes)
app.use('/api/pharmacy', pharmacyRoutes)
app.use('/api/company', companyRoutes)

// app.use('/api/doctor/degree', )


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running ${PORT}`))
