import adminModel from "../model/Admin.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import courseModel from "../model/Course.js"
import path from 'path'
import universityModel from "../model/University.js"
import universityImageModel from "../model/University_image.js"

import requiredDocumentmodel from "../model/RequiredDocument.js"
import FacultyModel from "../model/Faculty.js"
import galaryModel from "../model/Galary.js"
import FacilityModel from "../model/Facility.js"
import languageModel from "../model/RequiredLanguage.js"
import bannerModel from "../model/Banner.js"
import bodyParser from "body-parser"
import categoryModel from "../model/Category.js"
import regionModel from "../model/Region.js"
import topUniversityModel from "../model/TopUniversity.js"
import topMbbsModel from "../model/TopMbbs.js"
import topEngineerignModel from "../model/TopEngineering.js"
import applicationModel from "../model/Application.js"
import BannerImageModel from "../model/BannerImage.js"
import countryModel from "../model/Country.js"




export const AdminRegister = async(req,res)=>{

   try {

    const email = req.body.email
    const password = req.body.password
    const confirm_password = req.body.confirm_password


    if(!email){
        return res.status(400).json({
            message:"Invalid email address"
        })
    }
    if(!password){
        return res.status(400).json({
            message:"Invalid password"
        })
    }

    if(!confirm_password){
        return res.status(400).json({
            message:"Invalid Confirm password"
        })
    }

    if(password !=confirm_password){
        return res.status(400).json({
            message:"Password do not match"
        })
    }


    //check for user

    const isadminexist = await adminModel.findOne({user_email:email})

    if(isadminexist){
        return res.status(400).json({
            message:"user already exist"
        })
    }

    const hash_password =  await bcrypt.hash(password,12)

    const createAdmin  = new adminModel({
        user_email:email,
        password:hash_password,
        admin_type:1

    })

    await createAdmin.save()

    return res.status(201).json({
        status:true,
        message:"admin registered"
    })


      
    
   } catch (error) {
       return res.status(500).json({
          message:"Internal server error "+error
       })
   }
 

}


export const AdminLogin = async(req,res)=>{

    try {
 
     const email = req.body.email
     const password = req.body.password
    
 
 
     if(!email){
         return res.status(400).json({
             message:"Invalid email address"
         })
     }
     if(!password){
         return res.status(400).json({
             message:"Invalid password"
         })
     }

     //check user

     const find_admin = await adminModel.findOne({user_email:email})

     if(find_admin){

        const match = await bcrypt.compare(password, find_admin.password)
        if(match){
           
           const token = await jwt.sign({credential:find_admin},"hdkhkjfhdkjfhkjh")

          

           return res.status(200).json({
                message:"signed in",
                token:token,
                user_email : find_admin.user_email
               }) 
        }else{
            res.status(400).json({
                message:"Invalid Credential"
                
            })
        }

     }else{
        return res.status(400).json({
            message:"Invalid user"
        })
     }
 
   
 
 
 
       
     
    } catch (error) {
        return res.status(500).json({
           message:"Internal server error "+error
        })
    }
  
 
}


export const AddCourse = async(req,res)=>{
 
    try {

        let token = req.userinfo
    
        if(token.admin_type == 1){
            const name = req.body.course_name
            const cat_id = req.body.cat_id
            const course_image = req.files.course_image
       
            if(!name ){
                return res.status(400).json({
                    message:"Invalid course name"
                })
            }
            if(!course_image){
                return res.status(400).json({
                    message:"course image required"
                })
            }
            if(!cat_id){
                return res.status(400).json({
                    message:"category is required"
                })
            }

            const randomname_university = Date.now() + '-'+course_image.name
            const newpath =  path.join(process.cwd(),'universityPhotos',randomname_university)
            await course_image.mv(newpath)
    
            const newCourse = new courseModel({
                name:name,
                course_image:randomname_university
            })
    
            await newCourse.save()
    
            return res.status(201).json({
                message:"new course created"
            })
        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

      

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}
 
export const GetCourse = async(req,res)=>{
 
    try {

        let token = req.userinfo
    
        if(token.admin_type == 1){
         
       
           

            const course = await courseModel.find()
    
            return res.status(201).json({
                courses:course
            })
        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

      

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}


export const AddFaculty = async(req,res)=>{
 
    try {

        let token = req.userinfo
    
        if(token.admin_type == 1){
            const name = req.body.faculty_name
            const faculty_image = req.files.faculty_image
       
            if(!name ){
                return res.status(400).json({
                    message:"Invalid faculty name"
                })
            }
            if(!faculty_image){
                return res.status(400).json({
                    message:"faculty image is required"
                })
            }

            const randomname_university = Date.now() + '-'+faculty_image.name
            const newpath =  path.join(process.cwd(),'faculty_image',randomname_university)
            await faculty_image.mv(newpath)
    
            const newFaculty = new FacultyModel({
                name:name,
                faculty_image:randomname_university
            })
    
            await newFaculty.save()
    
            return res.status(201).json({
                message:"new faculty created"
            })
        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

      

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"+error
        })
    }

}
 
export const GetFaculty = async(req,res)=>{
 
    try {

        let token = req.userinfo
    
        if(token.admin_type == 1){
         
       
           

            const faculty = await FacultyModel.find()
    
            return res.status(201).json({
                faculties:faculty
            })
        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

      

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}


export const AddFacility = async(req,res)=>{
 
    try {

        let token = req.userinfo
    
        if(token.admin_type == 1){
            const name = req.body.name
            const docs = req.files
            let desc = req.body.desc

            if(desc==null || desc ==undefined){
                desc = ""
            }

           if(!name ){
                return res.status(400).json({
                    message:"facility name is required"
                })
            }
            

            if(docs!=null){

              //  const image = req.files.facility_image

                const randomname_university = Date.now() + '-'+req.files.facility_image.name
                const newpath =  path.join(process.cwd(),'facility_image',randomname_university)
                await req.files.facility_image.mv(newpath)

                const facility = new FacilityModel({
                    name:name,
                    desc:desc,
                    photo:randomname_university
             
                })

                await facility.save()


            }else{
                const facility = new FacilityModel({
                    name:name,
                    desc:desc,
                    photo:""
                })

                await facility.save()
            }

      
    
           
    
            return res.status(201).json({
                message:"new facility created"
            })
        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

      

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}

export const GetFacility = async(req,res)=>{
 
    try {

        let token = req.userinfo
    
        if(token.admin_type == 1){
         
       
           

            const fac = await FacilityModel.find()
    
            return res.status(201).json({
                facilities:fac
            })
        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

      

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}

export const AddRequireDocument = async(req,res)=>{
 
    try {

        let token = req.userinfo
    
        if(token.admin_type == 1){
            const name = req.body.name
            const docs = req.files
            let desc = req.body.desc

            if(desc==null || desc ==undefined){
                desc = ""
            }

           if(!name ){
                return res.status(400).json({
                    message:"doc name is required"
                })
            }
            

            if(docs!=null){

              //  const image = req.files.facility_image

                const randomname_university = Date.now() + '-'+req.files.doc_image.name
                const newpath =  path.join(process.cwd(),'document_image',randomname_university)
                await req.files.doc_image.mv(newpath)

                const doc = new requiredDocumentmodel({
                    document_name:name,
                    document_desc:desc,
                    document_img:randomname_university
             
                })

                await doc.save()


            }else{
                const doc = new requiredDocumentmodel({
                    document_name:name,
                    document_desc:desc,
                    document_img:""
                })

                await doc.save()
            }

      
    
           
    
            return res.status(201).json({
                message:"new required document created"
            })
        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

      

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"+error
        })
    }

}

export const GetRequiredDocument = async(req,res)=>{
 
    try {

        let token = req.userinfo
    
        if(token.admin_type == 1){
         
       
           

            const doc = await requiredDocumentmodel.find()
    
            return res.status(201).json({
                document:doc
            })
        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

      

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}


export const AddRequireLanguage = async(req,res)=>{
 
    try {

        let token = req.userinfo
    
        if(token.admin_type == 1){
            const name = req.body.name
            const docs = req.files
            let desc = req.body.desc

            if(desc==null || desc ==undefined){
                desc = ""
            }

           if(!name ){
                return res.status(400).json({
                    message:"language name is required"
                })
            }
            

            if(docs!=null){

              //  const image = req.files.facility_image

                const randomname_university = Date.now() + '-'+req.files.lang_image.name
                const newpath =  path.join(process.cwd(),'language_image',randomname_university)
                await req.files.lang_image.mv(newpath)

                const doc = new languageModel({
                    lang_name:name,
                    lang_desc:desc,
                    lang_img:randomname_university
             
                })

                await doc.save()


            }else{
                const doc = new languageModel({
                    lang_name:name,
                    lang_desc:desc,
                    lang_img:""
             
                })

                await doc.save()
            }

      
    
           
    
            return res.status(201).json({
                message:"new language  created"
            })
        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

      

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}


export const GetLanguage = async(req,res)=>{
 
    try {

        let token = req.userinfo
    
        if(token.admin_type == 1){
         
       
           

            const doc = await languageModel.find()
    
            return res.status(201).json({
                languages:doc
            })
        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

      

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}


export const AddCountry = async(req,res)=>{
 
    try {

        let token = req.userinfo
    
        if(token.admin_type == 1){
            const name = req.body.name
            const country_image = req.files.image
            const region = req.body.region_id
            

            

           if(!name ){
                return res.status(400).json({
                    message:"language name is required"
                })
            }

            if(!country_image){
                return res.status(400).json({
                    message:"country image is required"
                })
            }

            
            if(!region){
                return res.status(400).json({
                    message:"region is required"
                })
            }




            

           

                const randomname_university = Date.now() + '-'+country_image.name
                const newpath =  path.join(process.cwd(),'country_image',randomname_university)
                await country_image.mv(newpath)

                const doc = new countryModel({
                    name:name,
                    country_image:randomname_university
                  
             
                })

                await doc.save()


            

      
    
           
    
            return res.status(201).json({
                message:"new country added"
            })
        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

      

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}


export const GetCountry = async(req,res)=>{
 
    try {

        let token = req.userinfo
    
        if(token.admin_type == 1){
         
       
           

            const doc = await countryModel.find()
    
            return res.status(201).json({
                countries:doc
            })
        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

      

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}



export const AddUniversity = async(req,res)=>{
 
    try {

        let token = req.userinfo
        if(token.admin_type == 1){
           

            const name = req.body.university_name
            const address = req.body.university_address
            const introduction = req.body.introduction
            const course_uni =req.body.courses
            const course = JSON.parse(course_uni)
            const faculty = JSON.parse(req.body.faculties)
            const facilty = JSON.parse(req.body.facilities)
            const required_documents = JSON.parse(req.body.required_documents)
            const application_guidance = req.body.application_guidance
            const language_required = JSON.parse(req.body.language_required)
            const country = req.body.country
            const accreditation = req.body.accreditation
            const university_type = req.body.university_type
            const year_of_est = req.body.year_of_est
            const course_duration = req.body.course_duration
            const mci_passing_rate = req.body.mci_passing_rate
            const who_listed = req.body.who_listed
            const fee_per_year = req.body.fee_per_year
            const total_fee = req.body.total_fee
            const medium = req.body.medium
            const world_rank = req.body.world_rank
            const city_population = req.body.city_population
            const indian_food = req.body.indian_food
            const safty_index = req.body.safty_index
            const hostel = req.body.hostel
            const living_cost = req.body.living_cost
            const flight_time = req.body.flight_time
            const category = JSON.parse(req.body.category)
            const region = req.body.region
            const eligibility = req.body.eligibility


            const university_photo = req.files.university_photo
            const virtual_tour_video = req.files.virtual_tour_video
            const galary = req.files.galary


            
            let galary_images = []
            let virtual_tour_url = ""
            let facultyModel = []
            let facModel = []
            let DocModel = []
            let LangModel = []
            let CourseModel = []
            
           // let CourseMod = []
            



         if(!name){
                return res.status(400).json({
                    message:"university name is required"
                })
            }
            if(!address){
                return res.status(400).json({
                    message:"university address is required"
                })
            }
            if(!country){
                return res.status(400).json({
                    message:"university country is required"
                })
            }
            
            if(!accreditation){
                return res.status(400).json({
                    message:"university accreditation is required"
                })
            }

            if(!university_photo){
                return res.status(400).json({
                    message:"atleast 1 university image is required"
                })
            }

            if(!category){
                return res.status(400).json({
                    message:"category is required"
                })
            }

            if(!region){
                return res.status(400).json({
                    message:"region is required"
                })
            }

            if(!introduction){
                return res.status(400).json({
                    message:"introduction  is required"
                })
            }



     



            //check list

         
             const randomname_university = Date.now() + '-'+university_photo.name
             const newpath =  path.join(process.cwd(),'universityPhotos',randomname_university)
             await university_photo.mv(newpath)
                
            


            if(galary.length > 1){

                for (let index = 0; index < galary.length; index++) {
                    const randomname_galary = Date.now() + '-'+galary[index].name
                    const newpath =  path.join(process.cwd(),'universityPhotos',randomname_galary)
                    await galary[index].mv(newpath)

                    const galarymoedl = new galaryModel({
                        photos:randomname_galary
                    })
                   const newgalary =  await galarymoedl.save()
        


                    galary_images.push(newgalary._id)
                }

               
            }else{
                    const randomname_galary = Date.now() + '-'+galary.name
                    const newpath =  path.join(process.cwd(),'universityPhotos',randomname_galary)
                    await galary.mv(newpath)
                    const galarymoedl = new galaryModel({
                        photos:randomname_galary
                    })
                   const newgalary =  await galarymoedl.save()
        


                    galary_images.push(newgalary._id)

                
            }


            if(virtual_tour_video){

                const randomname_virtual_video = Date.now() + '-'+virtual_tour_video.name
                const newpath =  path.join(process.cwd(),'virtualVideos',randomname_virtual_video)
                await virtual_tour_video.mv(newpath)
                virtual_tour_url = randomname_virtual_video
                 

            }


            for (let index = 0; index < faculty.length; index++) {
                

                const fac = faculty[index]
                 
                facultyModel.push(fac)
                
            }

            for (let index = 0; index < facilty.length; index++) {
                

                const fac = facilty[index]
                 facModel.push(fac)
                
            }

            for (let index = 0; index < required_documents.length; index++) {
                

                const fac = required_documents[index]
                 DocModel.push(fac)
                
            }

            for (let index = 0; index < language_required.length; index++) {
                

                const fac = language_required[index]
                

                 LangModel.push(fac)
                
            }
         
            for (let index = 0; index < course.length; index++) {
                

                   const fac = course[index]

                   CourseModel.push(fac)
                
           }




        

          


           




          
           








            const newUniversity = new universityModel({
                name:name,
                address:address,
                introduction:introduction,
                university_image:randomname_university,
                course:CourseModel,
                faculty:facultyModel,
                facility:facModel,
                required_document:DocModel,
                application_guidance:application_guidance,
                language_require:LangModel,
                university_video:virtual_tour_url,
                galary:galary_images,
                country:country,
                accreditation:accreditation,
                university_type:university_type,
                year_of_establishment:year_of_est,
                course_duration:course_duration,
                mci_passing_rate:mci_passing_rate,
                who_listed:who_listed,
                fee_per_year:fee_per_year,
                total_fee:total_fee,
                world_rank:world_rank,
                city_population:city_population,
                indian_food:indian_food,
                safty_index:safty_index,
                hostel:hostel,
                medium:medium,
                living_cost:living_cost,
                flight_time:flight_time,
                category:category,
                region:region,
                eligibilty:eligibility


            })

            await newUniversity.save()

            return res.status(201).json({
                message:"University added"
            })



        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

      

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"+error
        })
    }

}
 

export const GetUniversity = async(req,res)=>{
 
    try {

        let token = req.userinfo
        console.log(token)
        if(token.admin_type == 1){
           
          const university = await universityModel.find().populate('course').populate('faculty').populate('facility').populate('required_document').populate('language_require').populate("galary").populate("category")

          return res.status(200).json({
            university:university
          })


        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

      

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}

export const GetUniversityById = async(req,res)=>{
 
    try {

        let token = req.userinfo
        console.log(token)
        if(token.admin_type == 1){

            const u_id = req.query.university_id
           
          const university = await universityModel.findById({_id:u_id}).populate('course').populate('faculty').populate('facility').populate('required_document').populate('language_require')

          return res.status(200).json({
            university:university
          })


        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

      

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}


export const addCategory = async(req,res)=>{
    try {


        let token = req.userinfo
        console.log(token)
        if(token.admin_type == 1){
            const name = req.body.name
            const cat_image = req.files

            if(!name){
               return res.status(400).json({
                   message:"name is required"
               })
            }


            if(cat_image!=null){

                const randomname = Date.now() + '-'+cat_image.cat_image.name
            const newpath =  path.join(process.cwd(),'category_image',randomname)
            await cat_image.cat_image.mv(newpath)
         
       
       
            const newCat = new categoryModel({
               name:name,
               category_image:randomname

            })
       
       
            await newCat.save()

            }else{

                const newCat = new categoryModel({
                    name:name,
                    category_image:""
     
                 })

                 await newCat.save()

            }


            
            return res.status(201).json({
               message:"category added"
            })
       

        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

   

        
    } catch (error) {



        
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
 


export const getCategories = async(req,res)=>{
    try {


        let token = req.userinfo
        console.log(token)
        if(token.admin_type == 1){
            

          const f_category = await categoryModel.find()
       
       
          
            return res.status(201).json({
               categories:f_category
            })
       

        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

   

        
    } catch (error) {



        
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const addRegion = async(req,res)=>{
    try {


        let token = req.userinfo
        console.log(token)
        if(token.admin_type == 1){
            const name = req.body.name

            if(!name){
               return res.status(400).json({
                   message:"region name is required"
               })
            }
       
       
            const newRegion = new regionModel({
               name:name
            })
       
       
            await newRegion.save()
            return res.status(201).json({
               message:"region added"
            })
       

        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

   

        
    } catch (error) {



        
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}


export const getRegion = async(req,res)=>{
    try {


        let token = req.userinfo
        console.log(token)
        if(token.admin_type == 1){
            

          const f_region = await regionModel.find()
       
       
          
            return res.status(201).json({
               regions:f_region
            })
       

        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

   

        
    } catch (error) {



        
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}


export const assignTopUniversity = async(req,res)=>{
    try {


        let token = req.userinfo
        console.log(token)
        if(token.admin_type == 1){
           

           const university = req.body.university_ids

           if(!university){
             return res.status(400).json({
                message:"Invalid id"
             })
           }


           const update = {
            $push: { university: { $each: university } }
          };
          
          const options = { new: true }; // Return the updated document
          
          await topUniversityModel.findByIdAndUpdate("64d31c10f99484de5d88d15f", update, options);


           return res.status(200).json({
            message:"added to top University"
           })



       

        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

   

        
    } catch (error) {



        
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}



export const assignTopMbbs = async(req,res)=>{
    try {


        let token = req.userinfo
        console.log(token)
        if(token.admin_type == 1){
           

           const university = req.body.university_ids

 


           if(!university){
             return res.status(400).json({
                message:"Invalid id"
             })
           }


          const update = {
           $push: { university: { $each: university } }
         };
          
         const options = { new: true }; // Return the updated document
          
         await topMbbsModel.findByIdAndUpdate("64d31c10f99484de5d88d161", update, options);


           return res.status(200).json({
            message:"added to top mbbs University"
           })



       

        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

   

        
    } catch (error) {



        
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}


export const assignTopEngineering = async(req,res)=>{
    try {


        let token = req.userinfo
        console.log(token)
        if(token.admin_type == 1){
           

           const university = req.body.university_ids

 


           if(!university){
             return res.status(400).json({
                message:"Invalid id"
             })
           }


          const update = {
           $push: { university: { $each: university } }
         };
          
         const options = { new: true }; // Return the updated document
          
         await topEngineerignModel.findByIdAndUpdate("64d31c10f99484de5d88d163", update, options);


           return res.status(200).json({
            message:"added to top engineering University"
           })



       

        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

   

        
    } catch (error) {



        
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}


export const GetAllAppliedApplication = async(req,res)=>{
 
    try {
  
        let token = req.userinfo
        console.log(token)
        if(token.admin_type == 1){
  
  
      
  
  
            const apply = await applicationModel.find().populate('user').populate('course').populate('university')
  
  
  
  
            return res.status(201).json({
              application:apply
            })
  
  
          
  
  
          
  
  
  
  
          
  
  
  
  
  
  
  
  
  
           
         
  
  
        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }
  
      
  
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"+error
        })
    }
  
  }


export const GetApplicationById = async(req,res)=>{
 
    try {
  
        let token = req.userinfo
        console.log(token)
        if(token.admin_type == 1){

            const application_id = req.query.application_id

            if(!application_id){
                return res.status(400).json({
                    message:"Invalid request"
                })
            }



  
  
      
  
  
            const apply = await applicationModel.findOne({_id:application_id}).populate('user').populate('course').populate('university')
  
  
  
  
            return res.status(201).json({
              application:apply
            })
  
  
          
  
  
          
  
  
  
  
          
  
  
  
  
  
  
  
  
  
           
         
  
  
        }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }
  
      
  
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"+error
        })
    }
  
  }

export const AddBanner = async(req,res)=>{
 
    try {

        let token = req.userinfo
        if(token.admin_type == 1){

            let  banner_list = []


            const banner_images = req.files.banner

            if(!banner_images){
                return res.status(400).json({
                    message:"Invalid data"
                })
            }

            if(banner_images.length==1){
                return res.status(400).json({
                    message:"atleast add 2 banners"
                })
            }


           
                for (let index = 0; index < banner_images.length; index++) {
                    const randomname = Date.now() + '-'+banner_images[index].name
                    const newpath =  path.join(process.cwd(),'banner',randomname)
                    await banner_images[index].mv(newpath)


                    const bannerimageModel = new BannerImageModel({
                        banner_image:randomname
                    })

                   const newbanner =  await bannerimageModel.save()
                   banner_list.push(newbanner._id)

                    


                }
           

          


                const b = new bannerModel({
                    banner:banner_list
                })

               await  b.save()


          

            return res.status(201).json({
                message:"banner added"
            })






   }else{
            return res.status(401).json({
                message:"Anauthorize request"
            })
        }

      

        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"+error
        })
    }

}




 




export const dummy =async(req,res)=>{


  const top = topUniversityModel({
    university:[]
  })
  await top.save()

  const top1 = topMbbsModel({
    university:[]
  })
  await top1.save()

  const top2 = topEngineerignModel({
    university:[]
  })
  await top2.save()

}