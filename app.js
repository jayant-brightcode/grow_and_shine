import express from 'express'
import dotenv from 'dotenv'
import Connection from './db/db.js'
import admin_router from './route/admin.js'
import fileupload from 'express-fileupload'
import bodyParser from 'body-parser'
import user_route from './route/user.js'


const app = express()

dotenv.config()
app.use(express.json({ limit: '10mb' })); 

app.use('/banner-image',express.static('banner'));
app.use('/university-image',express.static('universityPhotos'));
app.use('/category-image',express.static('category_image'));
app.use('/faculty-image',express.static('faculty_image'));
app.use('/facility-image',express.static('facility_image'));

app.use('/document-image',express.static('document_image'));
app.use('/language-image',express.static('language_image'));

app.use('/country-image',express.static('country_image'));
app.use('/post-image',express.static('post_images'));
app.use('/user-image',express.static('user_photo'));
app.use('/news-image',express.static('news_image'));
app.use('/blog-image',express.static('blog_image'));


app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'public/'
}))
Connection()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(2000,()=>{
    console.log("app is running")
})



app.use('/admin',admin_router)
app.use('/user',user_route)



