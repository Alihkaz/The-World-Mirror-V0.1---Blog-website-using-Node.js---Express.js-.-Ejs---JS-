// 

import express from "express"; // importing the express module to use it as a backend for our application ! 
import bodyParser from "body-parser"; //importing the body parser middle ware

const app = express(); //creating a blue print from express module 
const port = 3000; // specifying the local port we will work on ! 

app.use(express.static("public")); // specifying the location of our static folder so we can use it 


// getting the current year and passing it to the footer ejs ! 
const d = new Date();
let year = d.getFullYear();



// creating a new table to in it all the posts to gether so we can loop through them later
let postsTable=[]



// creating a start id to attach it and increase it everytime we add a new post
var id=0



// using the body parser middleware!
app.use(bodyParser.urlencoded({ extended: true }));


// home page
app.get("/", (req, res) => {
  res.render("index.ejs",{year:year,postsTable:postsTable})
});



// about page
app.get("/about", (req, res) => {
  res.render("about.ejs",{year:year})
});



// contact page
app.get("/contact", (req, res) => {
  res.render("contact.ejs",{year:year})
});


// Post creation page
app.get("/createpost", (req, res) => {
  
  res.render("createpost.ejs",{edit:false,year:year})
});




// redirecting to home page after submiting the post data
app.post("/submit", (req, res) => {

 let title=req.body.title;// or by req.body.title
 let subtitle=req.body["subtitle"];// or by req.body.subtitle
 let description=req.body["description"];// or by req.body.description
 let imageUrl=req.body["image"];// or by req.body.image
 id++ ; //increasing the id everytime we add a new post 
 let postid=id //attaching a new id to every post we create 
 let postcontent={postid:postid,title:title,subtitle:subtitle,description:description,image:imageUrl};//putting the data in one dictionary 
 postsTable.push(postcontent);
 res.render("index.ejs",{year:year,postsTable:postsTable})
});





// redirecting to home page after submiting the post data
app.get("/viewpost/:id", (req, res) => {
  let id=req.params.id;
  // console.log(id);
  let posttobeviewed=postsTable[id-1];
  // console.log(posttobeviewed);
   res.render("viewpost.ejs",{year:year,posttobeviewed:posttobeviewed})
 });




// redirecting to home page after submiting the post data
app.get("/editpost/:id", (req, res) => {
  let id=req.params.id;
  let posttobeedited=postsTable[id-1];

   res.render("editpost.ejs",{year:year,posttobeedited:posttobeedited,edit:true})
 });








// submiting the new edited post and replacing the old one by it ! 
app.post("/confirm/:id", (req, res) => {
  
  let id=req.params.id;
  let postEdited=postsTable[id-1]
  postEdited.title=req.body.title;
  postEdited.subtitle=req.body.subtitle;
  postEdited.description=req.body.description;
  postEdited.image=req.body.image;

   res.render("viewpost.ejs",{year:year,posttobeviewed:postEdited})
 });




 // deleting the requeested post ! 
app.get("/deletepost/:id", (req, res) => {
  

  

// Delete element at index 2


  let id=req.params.id;
  postsTable=delete postsTable[id];
  res.render("index.ejs",{year:year,postsTable:postsTable})
 });






// listening on the local port 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});