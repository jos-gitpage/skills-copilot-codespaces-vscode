Synthesizing 9/10 solutions (Duplicates Hidden)

   Accept solution
   =======
   Suggestion 1
   // create web server for comment
   //======================================
   
   //Import Module
   const express = require ('express');
   const router = express.Router();
   const commentControler= require ('../controllers/comment')

   //Handle Requests
   router.get('/', commentController.comment_list);
   router.get('/create' commentControler.comment_create);
   router.post('/create', commentControler.comment_create);
   



