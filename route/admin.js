import express from "express"
import { AddBanner, AddCountry, AddCourse, AddFacility, AddFaculty, AddRequireDocument, AddRequireLanguage, AddUniversity, AdminLogin, AdminRegister, GetAllAppliedApplication, GetApplicationById, GetCountry, GetCourse, GetFacility, GetFaculty, GetLanguage, GetRequiredDocument, GetUniversity, GetUniversityById, addCategory, addRegion, assignTopEngineering, assignTopMbbs, assignTopUniversity, dummy, getCategories, getRegion } from "../controller/admin.js"
import { checkauth } from "../middlewear/auth.js"


const admin_router = express.Router()



admin_router.post("/register",AdminRegister)
admin_router.post("/login",AdminLogin)
admin_router.post("/create_course",checkauth,AddCourse)
admin_router.post("/add_university",checkauth,AddUniversity)
admin_router.get("/get",checkauth,GetUniversity)
admin_router.get("/getbyid",checkauth,GetUniversityById)
admin_router.post("/add_category",checkauth,addCategory)
admin_router.get("/get_categories",checkauth,getCategories)
admin_router.post("/add_region",checkauth,addRegion)
admin_router.get("/get_region",checkauth,getRegion)
admin_router.post("/assign_top_university",checkauth,assignTopUniversity)
admin_router.post("/assign_top_mbbs_university",checkauth,assignTopMbbs)
admin_router.post("/assign_top_engineering_university",checkauth,assignTopEngineering)
admin_router.get("/getall_application",checkauth,GetAllAppliedApplication)
admin_router.get("/get_application_by_id",checkauth,GetApplicationById)
admin_router.post("/add_banner",checkauth,AddBanner)
admin_router.get("/getcourse",checkauth,GetCourse)
admin_router.post("/add_faculty",checkauth,AddFaculty)
admin_router.get("/getfaculty",checkauth,GetFaculty)
admin_router.post("/add_facility",checkauth,AddFacility)
admin_router.get("/getfacility",checkauth,GetFacility)

admin_router.post("/add_document",checkauth,AddRequireDocument)
admin_router.get("/getdocument",checkauth,GetRequiredDocument)

admin_router.post("/add_language",checkauth,AddRequireLanguage)
admin_router.get("/getlanguage",checkauth,GetLanguage)

admin_router.post("/add_country",checkauth,AddCountry)
admin_router.get("/getcountry",checkauth,GetCountry)

admin_router.post("/dummy",dummy)
export default admin_router