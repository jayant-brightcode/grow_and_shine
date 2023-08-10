import userModel from "../model/User.js";

import jwt from 'jsonwebtoken'

import universityModel from "../model/University.js";
import applicationModel from "../model/Application.js";
import ratingModel from "../model/Rating.js";
import communtityModel from "../model/Community.js";
import path from 'path'
import commentModel from "../model/Comments.js";
import BannerImageModel from "../model/BannerImage.js";
import topUniversityModel from "../model/TopUniversity.js";
import topMbbsModel from "../model/TopMbbs.js";
import topEngineerignModel from "../model/TopEngineering.js";
import categoryModel from "../model/Category.js";

import fs from 'fs'
import countryModel from "../model/Country.js";
import courseModel from "../model/Course.js";
import regionModel from "../model/Region.js";




export const RegisterUser = async(req,res)=>{

  try {

    const phone = req.body.phone
    const name = req.body.name
    const address = req.body.address
    const state = req.body.state
    const email = req.body.email
    const alternatePhone = req.body.alternatePhone
    const aadhar = req.body.aadhar
    const citizenShip = req.body.citizenShip
    const student_type = req.body.student_type
    const passport_number = req.body.passport_number
    const gender = req.body.gender
    const dob = req.body.dob
   
    const university_name = req.body.university_name
    const tweleve_per = req.body.tweleve_per
    const course_name = req.body.course_name


    if(!phone){
      return res.status(400).json({
        message:"phone is required"
      })
    }

    if(!address){
      return res.status(400).json({
        message:"address is required"
      })
    }

    if(!name){
      return res.status(400).json({
        message:"name is required"
      })
    }

    if(!state){
      return res.status(400).json({
        message:"state is required"
      })
    }

    if(!email){
      return res.status(400).json({
        message:"email is required"
      })
    }

    if(!aadhar){
      return res.status(400).json({
        message:"aadhar is required"
      })
    }

    if(!citizenShip){
      return res.status(400).json({
        message:"citizenShip is required"
      })
    }

    
    if(!student_type){
      return res.status(400).json({
        message:"student_type is required"
      })
    }

    if(!gender){
      return res.status(400).json({
        message:"gender is required"
      })
    }

    if(!dob){
      return res.status(400).json({
        message:"dob is required"
      })
    }



    //check if already exist

    const isRegistered = await userModel.findOne({phone:phone})

    if(isRegistered){
      return res.status(400).json({
        message:"Already registered"
      })
    }else{

      const newUser = new userModel({
        phone:phone,
        address:address,
        name:name,
        email:email,
        state:state,
        alternatePhone:alternatePhone,
        aadharNumber:aadhar,
        citizenShip:citizenShip,
        passport_number:passport_number,
        student_type:student_type,
        gender:gender,
        dob:dob,
        university_name:university_name,
        tweleve_percentage:tweleve_per,
        course_name:course_name,
        user_type:2

      })

      const data =  await newUser.save()

      //otp generation


      const min = 100000; // Minimum value (inclusive)
       const max = 999999; // Maximum value (inclusive)
  
  // Generate a random number within the specified range
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

      const reg = await userModel.findByIdAndUpdate({_id:data._id},{"otp":randomNum},{ new: true })


      return res.status(201).json({
        message:"user registered",
        otp:reg.otp
      })







    }
    

    
    
  } catch (error) {
    return res.status(500).json({
        message:"Internal server error"
    })
  }


}




export const UserLogin = async(req,res)=>{

  try {

   const phone = req.body.phone

  


   if(!phone){
       return res.status(400).json({
           message:"Invalid phone number"
       })
   }
   

   //check user

   const find_user = await userModel.findOne({phone:phone})

   if(find_user){

 
         
        

        

         
      //otp generation


      const min = 100000; // Minimum value (inclusive)
      const max = 999999; // Maximum value (inclusive)
 
 // Generate a random number within the specified range
     const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

     const reg = await userModel.findByIdAndUpdate({_id:find_user._id},{"otp":randomNum},{ new: true })





         return res.status(200).json({
              message:"otp sent to phone number",
              otp:reg.otp
             }) 
      

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


export const OtpVerify = async(req,res)=>{

  try {

   const phone = req.body.phone
   const otp = req.body.otp

  


   if(!phone){
       return res.status(400).json({
           message:"Invalid phone number"
       })
   }
   

   //check user

   const find_user = await userModel.findOne({phone:phone})

   if(find_user){


      if(otp == find_user.otp){
        const token = await jwt.sign({credential:find_user},"hdkhkjfhdkjfhkjh")

          return res.status(200).json({
                message:"signed in",
                token:token,
                user:find_user
               
               }) 
      }else{
        return res.status(400).json({
          message:"Invalid otp"
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


export const GetUniversity = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){




        const category = req.query.category
        const region = req.query.region
        const course = req.query.course
        const country = req.query.country
        const fee = req.query.fees
        const searchquery = req.query.searchquery


        if(searchquery){

           let userpattern = RegExp("^"+req.query.searchquery);

           if(searchquery==""){
            const university = await universityModel.find()
            return res.status(200).json({
              university:university
            })
           }

          const university = await universityModel.find({name:{$regex:userpattern,$options:'i'}})
          return res.status(200).json({
            university:university
          })

        }else{
          if(!category || !region || !course || !country ||!fee){
            const university = await universityModel.find()
  
            return res.status(200).json({
              university:university
            })
          }else{
  
            console.log(fee)
            
  
             if(fee=="lessthan10lakh"){
              const minFee = 0;
              const maxFee = 1000000;
  
              
  
  
  
              
  
              const university = await universityModel.find({$and:[{category:category},{region:region},{country:country},{ total_fee: { $gte: minFee, $lte: maxFee } },{
                course: { $in: course }
              }]})
    
              return res.status(200).json({
                university:university
              })
             }
  
  
             if(fee=="10to15lakh"){
              const minFee = 1000000;
              const maxFee = 1500000;
  
              
  
              const university = await universityModel.find({$and:[{category:category},{region:region},{country:country},{ total_fee: { $gte: minFee, $lte: maxFee } },{
                course: { $in: course }
              }]})
    
              return res.status(200).json({
                university:university
              })
             }
  
             if(fee=="15to20lakh"){
              const minFee = 1500000;
              const maxFee = 2000000;
  
              
  
              const university = await universityModel.find({$and:[{category:category},{region:region},{country:country},{ total_fee: { $gte: minFee, $lte: maxFee } },{
                course: { $in: course }
              }]})
    
              return res.status(200).json({
                university:university
              })
             }
  
             if(fee=="20to25lakh"){
              const minFee = 2000000;
              const maxFee = 2500000;
  
              
  
              const university = await universityModel.find({$and:[{category:category},{region:region},{country:country},{ total_fee: { $gte: minFee, $lte: maxFee } },{
                course: { $in: course }
              }]})
    
              return res.status(200).json({
                university:university
              })
             }
  
             if(fee=="morethan25lakh"){
              const minFee = 2500000;
              const maxFee = 90000000;
  
              
  
              const university = await universityModel.find({$and:[{category:category},{region:region},{country:country},{ total_fee: { $gte: minFee, $lte: maxFee } },{
                course: { $in: course }
              }]})
    
              return res.status(200).json({
                university:university
              })
             }
  
  
  
           
  
  
          }
          
        }




        




        









         
       


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
      if(token.user_type == 2){




        const id = req.query.id
      
       if(!id){
           return res.status(400).json({
            message:"Invalid id"
           })
        }

          const university = await universityModel.findById({_id:id}).populate('course').populate('faculty').populate('facility').populate('required_document').populate('language_require').populate("galary").populate("category")

          return res.status(200).json({
            single_university:university
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


export const ApplyToUniversity = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){




        const university_id = req.body.university_id
        const course_id = req.body.course_id
        
        




        if(!university_id || !course_id ){
                   return res.status(400).json({
                    message:"Invalid request"
                  })

        }else{


          const apply = new applicationModel({
              user:req.userinfo,
              university:university_id,
              course:course_id
          })


          await apply.save()

          return res.status(201).json({
            message:"application applied"
          })


        


        }




        









         
       


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


export const GetMyAppliedApplication = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){


    


          const apply = await applicationModel.find({user:req.userinfo._id}).populate('user').populate('course').populate('university')




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

export const CompareUniversity = async(req,res)=>{
  try {


      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){

          const empty_object = {}
         

         const university_one = req.body.university_id_one
         const university_two = req.body.university_id_two
         const university_three = req.body.university_id_three
         const university_four = req.body.university_id_four








         if(university_one && university_two && university_three=="" &&university_four==""){

          const find_one = await universityModel.findById({_id:university_one}).populate('country')
          const find_two = await universityModel.findById({_id:university_two}).populate('country')


          return res.status(200).json({
              university_one:find_one,
              university_two:find_two,
              university_three:empty_object,
              university_four:empty_object
          })
             
         }


         if(university_one && university_two && university_three &&university_four==""){

          const find_one = await universityModel.findById({_id:university_one}).populate('country')
          const find_two = await universityModel.findById({_id:university_two}).populate('country')
          const find_three = await universityModel.findById({_id:university_three}).populate('country')


          return res.status(200).json({
              university_one:find_one,
              university_two:find_two,
              university_three:find_three,
              university_four:empty_object
          })

         }


         if(university_one && university_two && university_three &&university_four){

          const find_one = await universityModel.findById({_id:university_one}).populate('country')
          const find_two = await universityModel.findById({_id:university_two}).populate('country')
          const find_three = await universityModel.findById({_id:university_three}).populate('country')
          const find_four = await universityModel.findById({_id:university_four}).populate('country')


          return res.status(200).json({
              university_one:find_one,
              university_two:find_two,
              university_three:find_three,
              university_four:find_four
          })

         }

         return res.status(400).json({
          message:"choose correctly"
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


export const AddReviewAndRating = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){




        const university_id = req.body.university_id
        const rating = req.body.rating
        const review = req.body.review

     if(!university_id ){
                   return res.status(400).json({
                    message:"Invalid request"
                  })

        }else{


          const apply = new ratingModel({
              user:req.userinfo,
              university:university_id,
              rating:rating,
              review:review
          })


          await apply.save()

          return res.status(201).json({
            message:"review added"
          })


        


        }




        









         
       


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




export const GetReviewAndRatingByUniversityId = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){




        const university_id = req.query.university_id
      
       if(!university_id ){
                   return res.status(400).json({
                    message:"Invalid request"
                  })

        }else{


          const rating = await ratingModel.find({university:university_id}).populate('university').populate('user')

          return res.status(201).json({
            reviews:rating
          })


        


        }




        









         
       


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



export const AddPost = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){




        const image = req.files.image
        const caption = req.body.caption
      

        const randomname = Date.now() + '-'+image.name
        const newpath =  path.join(process.cwd(),'post_images',randomname)
        await image.mv(newpath)



          const apply = new communtityModel({
             posted_by:req.userinfo,
              post_image:randomname,
              post_caption:caption,
              post_likes:0,
              comments:[]
          })


          await apply.save()

          return res.status(201).json({
            message:"post added"
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


export const AddComment = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){


        const post_id = req.body.post_id
        const comment = req.body.comment

       
      

     


          const apply = new commentModel({
              post_id:post_id,
              comment:comment,
              comment_by:req.userinfo,
          
          })


         const newcomment =  await apply.save()

         await communtityModel.findByIdAndUpdate( post_id, { $push: { comments: newcomment._id } })

          return res.status(201).json({
            message:"comment added"
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

export const GetComment = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){


        const post_id = req.query.post_id

        if(!post_id){
          return res.status(400).json({
            message:"Invalid request"
          })
        }

        const findcomment = await commentModel.find({post_id:post_id}).populate("comment_by")

        return res.status(200).json({
          comment:findcomment
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




export const GetBanner = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){


    


          const banner = await BannerImageModel.find()






          return res.status(201).json({
            banners:banner
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


export const GetTopUniversity = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){


    


          const top = await topUniversityModel.find().populate('university')






          return res.status(201).json({
            top_University:top
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

export const GetTopMbbs = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){


    


          const top = await topMbbsModel.find().populate('university')






          return res.status(201).json({
            top_University:top
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


export const GetTopEngineering = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){


    


          const top = await topEngineerignModel.find().populate('university')






          return res.status(201).json({
            top_University:top
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

export const getCategories = async(req,res)=>{
  try {


      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){
          

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


export const temp = async(req,res)=>{


   const data = req.body.data

  
   const imageBuffer = Buffer.from(data, 'base64');

   const imageName = `course_${Date.now()}.jpg`; // Generate a unique name for each image
   const imagePath = path.join(process.cwd(), 'nn', imageName);

   // Save the image to the directory
  fs.writeFileSync(imagePath, imageBuffer);

   return res.status(200).json({
    message:"hello"
   })



}


export const GetUniversityByCategory = async(req,res)=>{
 
  try {

     let token = req.userinfo
  
     if(token.user_type == 2){

          const c_id = req.query.category_id

          if(!c_id){
            return res.status(400).json({
              message:"invalid category id"
            })
          }
         
       const s =  await universityModel.find({ category: { $in: [c_id] } });
        return res.status(200).json({
          university:s
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


export const GetUniversityByCountry = async(req,res)=>{
 
  try {

     let token = req.userinfo
  
     if(token.user_type == 2){

          const c_id = req.query.country_id

          if(!c_id){
            return res.status(400).json({
              message:"invalid country id"
            })
          }
         
       const s =  await universityModel.find({ country: c_id});
        return res.status(200).json({
          university:s
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


export const PopularCountry = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){

        
         
       const s =  await countryModel.find();
        return res.status(200).json({
          country:s
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


export const GetPosts = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){

        
      let page = req.query.page
      let size =req.query.size
      

      

      if(!page){
          page=1;
      }
      if(!size){
          size=10;
      }
  
      const limit = parseInt(size);
      const skip = (page-1)*size;
  

      const post  = await communtityModel.find().sort('-updatedAt').limit(limit).skip(skip).populate('posted_by')
      
      res.status(200).json({
          posts:post
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


export const GetCourseByCatId = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){


      const cat_id = req.query.cat_id

      if(!cat_id){
        return res.status(400).json({
          message:"cat id is required"
        })
      }

     
  

      const course  = await courseModel.find({cat_id:cat_id})
      
      res.status(200).json({
          course:course
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


export const GetRegion = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){

     
  

      const region  = await regionModel.find()
      
      res.status(200).json({
          region:region
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


export const GetCountryByRegionId = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){


      const region = req.query.region_id

      if(!region){
        return res.status(200).json({
          message:"region is required"
        })
      }

        
         
       const s =  await countryModel.find({region:region});
        return res.status(200).json({
          country:s
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




export const LikePost = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){


      const post_id = req.body.post_id

      if(!post_id){
        return res.status(200).json({
          message:"post id is required"
        })
      }

      const checkifalreadylike = await communtityModel.findOne({ _id: post_id, liked_by: { $in: [req.userinfo._id] } })

      if(checkifalreadylike){
        return res.status(400).json({
          message:"already liked"
        })
      }else{
        const data = await communtityModel.findByIdAndUpdate(post_id, { $push: { liked_by: req.userinfo._id }})
        console.log(data)
        let like = data.post_likes
        like++
        await communtityModel.findByIdAndUpdate({_id:post_id},{post_likes:like})

        return res.status(200).json({
          message:"like added"
        })
      }


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