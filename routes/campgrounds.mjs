import express from 'express';
import { isLoggedIn, validateCampground, isAuthor } from '../utils/middleware.mjs'; 
import campgrounds from '../controllers/campgrounds.mjs'; 
import multer from 'multer';
import { storage } from '../cloudinary/main.mjs'; 

const router = express.Router();
const upload = multer({ storage });

router.route('/')
    .get(campgrounds.renderIndex)
    .post(isLoggedIn, upload.array('image'), campgrounds.createNewCampground);

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route("/:id")
    .get(isLoggedIn, campgrounds.showCampground)
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, campgrounds.editCampground)
    .delete(isLoggedIn, isAuthor, campgrounds.deleteCampground);

router.get('/:id/edit', isLoggedIn, isAuthor, campgrounds.renderEditForm);

export default router;
