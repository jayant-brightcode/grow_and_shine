import express from 'express'

import { checkauth } from "../middlewear/auth.js"
import { AddComment, AddFavUniversity, AddPost, AddReviewAndRating, AddTestimonial, ApplyToUniversity, BookCounselling, CompareUniversity, GetBanner, GetBlog, GetBookedCounselling, GetComment, GetContactUs, GetCountryByRegionId, GetCourseByCatId, GetFavUniversity, GetMedia, GetMessages, GetMyAppliedApplication, GetMyCounselor, GetNotification, GetOperatingCity, GetPosts, GetProfile, GetRegion, GetReviewAndRatingByUniversityId, GetTestimonialByUniversityId, GetTopEngineering, GetTopMbbs, GetTopUniversity, GetUniversity, GetUniversityByCategory, GetUniversityByCountry, GetUniversityById, LikePost, OtpVerify, PopularCountry, RegisterUser, SendMessage, UpdateNotificationToken, UpdateProfilePhoto, UpdateUserProfile, UserLogin, getCategories, getFeeStructure, temp } from '../controller/user.js'



const user_route = express.Router()


user_route.post("/register",RegisterUser)
user_route.post("/login",UserLogin)
user_route.post("/verify-otp",OtpVerify)
user_route.get("/get_university",checkauth,GetUniversity)

user_route.post("/apply",checkauth,ApplyToUniversity)
user_route.get("/application",checkauth,GetMyAppliedApplication)

user_route.post("/compare",checkauth,CompareUniversity)

user_route.post("/addreviewandrating",checkauth,AddReviewAndRating)

user_route.get("/get_reviews",checkauth,GetReviewAndRatingByUniversityId)

user_route.post("/add_post",checkauth,AddPost)


user_route.post("/add_comment",checkauth,AddComment)

user_route.get("/get_banner",checkauth,GetBanner)

user_route.get("/get_top_university",checkauth,GetTopUniversity)

user_route.get("/get_top_mbbs",checkauth,GetTopMbbs)

user_route.get("/get_top_eng",checkauth,GetTopEngineering)
user_route.get("/get_categories",checkauth,getCategories)


user_route.get("/get_university_by_cat",checkauth,GetUniversityByCategory)

user_route.get("/get_university_by_country",checkauth,GetUniversityByCountry)

user_route.get("/get_country",checkauth,PopularCountry)

user_route.get("/get_country_by_region",checkauth,GetCountryByRegionId)

user_route.get("/get_university_by_id",checkauth,GetUniversityById)

user_route.get("/get_posts",checkauth,GetPosts)
user_route.get("/get_media",checkauth,GetMedia)
user_route.get("/get_blog",checkauth,GetBlog)

user_route.get("/get_comment",checkauth,GetComment)


user_route.get("/get_course",checkauth,GetCourseByCatId)
user_route.get("/get_region",checkauth,GetRegion)
user_route.post("/add_like",checkauth,LikePost)

user_route.post("/add_testimonial",checkauth,AddTestimonial)
user_route.get("/get_testimonial",checkauth,GetTestimonialByUniversityId)
user_route.get("/get_profile",checkauth,GetProfile)
user_route.post("/update_profile_photo",checkauth,UpdateProfilePhoto)
user_route.post("/update_profile",checkauth,UpdateUserProfile)

user_route.get("/get_my_counselor",checkauth,GetMyCounselor)
user_route.post("/send_message",checkauth,SendMessage)
user_route.get("/get_message",checkauth,GetMessages)
user_route.post("/update_notification_token",checkauth,UpdateNotificationToken)

user_route.get("/get_notification",checkauth,GetNotification)
user_route.post("/book_counselling",checkauth,BookCounselling)
user_route.get("/get_book_counselling",checkauth,GetBookedCounselling)
user_route.get("/get_operating_city",checkauth,GetOperatingCity)
user_route.get("/addtofav",checkauth,AddFavUniversity)
user_route.get("/getfav",checkauth,GetFavUniversity)
user_route.get("/get_fee_structure",checkauth,getFeeStructure)
user_route.get("/get_contact_us",checkauth,GetContactUs)
user_route.get("/temp",temp)

export default user_route