import express from 'express'

import { checkauth } from "../middlewear/auth.js"
import { AddComment, AddPost, AddReviewAndRating, ApplyToUniversity, CompareUniversity, GetBanner, GetComment, GetCountryByRegionId, GetCourseByCatId, GetMyAppliedApplication, GetPosts, GetRegion, GetReviewAndRatingByUniversityId, GetTopEngineering, GetTopMbbs, GetTopUniversity, GetUniversity, GetUniversityByCategory, GetUniversityByCountry, GetUniversityById, LikePost, OtpVerify, PopularCountry, RegisterUser, UserLogin, getCategories, temp } from '../controller/user.js'



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

user_route.get("/get_comment",checkauth,GetComment)


user_route.get("/get_course",checkauth,GetCourseByCatId)
user_route.get("/get_region",checkauth,GetRegion)
user_route.post("/add_like",checkauth,LikePost)
user_route.get("/temp",temp)

export default user_route