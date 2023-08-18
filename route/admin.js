import express from "express"
import { AddBanner, AddBlog, AddContactUs, AddCountry, AddCourse, AddEducationCounselors, AddFacility, AddFaculty, AddNewsAndMedia, AddOperatingCity, AddRequireDocument, AddRequireLanguage, AddUniversity, AdminLogin, AdminRegister, GetAllAppliedApplication, GetApplicationById, GetChatRooms, GetCountry, GetCourse, GetFacility, GetFacilityByID, GetFaculty, GetLanguage, GetRequiredDocument, GetUniversity, GetUniversityById, SendMessage, SendNotificationToALL, addCategory, addRegion, assignTopEngineering, assignTopMbbs, assignTopUniversity, dummy, editCategory, editCountry, editCourse, editRegion, getCategories, getCountryById, getCourseById, getRegion, getRegion_by_id } from "../controller/admin.js"
import { checkauth } from "../middlewear/auth.js"
import { getCategoryById } from "../controller/user.js"


const admin_router = express.Router()



admin_router.post("/register",AdminRegister)
admin_router.post("/login",AdminLogin)
admin_router.post("/create_course",checkauth,AddCourse)
admin_router.post("/add_university",checkauth,AddUniversity)
admin_router.get("/get",checkauth,GetUniversity)
admin_router.get("/getbyid",checkauth,GetUniversityById)
admin_router.post("/add_category",checkauth,addCategory)
admin_router.get("/get_categories",checkauth,getCategories)
admin_router.get("/get_category_by_id",checkauth,getCategoryById)
admin_router.post("/edit_category",checkauth,editCategory)
admin_router.post("/add_region",checkauth,addRegion)
admin_router.get("/get_region",checkauth,getRegion)
admin_router.get("/get_region_by_id",checkauth,getRegion_by_id)
admin_router.post("/edit_region",checkauth,editRegion)
admin_router.post("/assign_top_university",checkauth,assignTopUniversity)
admin_router.post("/assign_top_mbbs_university",checkauth,assignTopMbbs)
admin_router.post("/assign_top_engineering_university",checkauth,assignTopEngineering)
admin_router.get("/getall_application",checkauth,GetAllAppliedApplication)
admin_router.get("/get_application_by_id",checkauth,GetApplicationById)
admin_router.post("/add_banner",checkauth,AddBanner)
admin_router.get("/getcourse",checkauth,GetCourse)
admin_router.get("/getcourse_by_id",checkauth,getCourseById)
admin_router.post("/edit_course",checkauth,editCourse)
admin_router.post("/add_faculty",checkauth,AddFaculty)
admin_router.get("/getfaculty",checkauth,GetFaculty)
admin_router.post("/add_facility",checkauth,AddFacility)
admin_router.get("/getfacility",checkauth,GetFacility)
admin_router.get("/getfacility_by_id",checkauth,GetFacilityByID)

admin_router.post("/add_document",checkauth,AddRequireDocument)
admin_router.get("/getdocument",checkauth,GetRequiredDocument)

admin_router.post("/add_language",checkauth,AddRequireLanguage)
admin_router.get("/getlanguage",checkauth,GetLanguage)

admin_router.post("/add_country",checkauth,AddCountry)
admin_router.post("/edit_country",checkauth,editCountry)
admin_router.get("/get_country_by_id",checkauth,getCountryById)
admin_router.get("/getcountry",checkauth,GetCountry)

admin_router.post("/add_counselor",checkauth,AddEducationCounselors)
admin_router.post("/send_message",checkauth,SendMessage)
admin_router.get("/getchatrooms",checkauth,GetChatRooms)
admin_router.post("/send_notification_to_all",checkauth,SendNotificationToALL)
admin_router.post("/addcity",checkauth,AddOperatingCity)
admin_router.post("/addmedia",checkauth,AddNewsAndMedia)
admin_router.post("/addblog",checkauth,AddBlog)
admin_router.post("/add_contact_us",checkauth,AddContactUs)
export default admin_router