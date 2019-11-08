//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const mongoose = require("mongoose");
const app = express();
mongoose.connect('mongodb+srv://<user>:password@cluster0-0ns5n.mongodb.net/blogDB', {useNewUrlParser: true,useUnifiedTopology: true});
//mongodb://localhost:27017/blogDB
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




const postSchema={
  title:String,
  post:String
};

const Post = new mongoose.model("Post",postSchema);

// const firstPost = new Post({
//   title:"Day 1",
//   post:"will it work "
// });
//
// firstPost.save();


const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


app.get("/",function(req,res){
  Post.find({},function(err,foundPosts){
    if(err) console.log(err);
      res.render("home",{posts:foundPosts});
  });
});

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactContent:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});


app.get("/posts/:title",function(req,res){
  // let post=posts.find(function(post){
  //   return _.lowerCase(post.title)==_.lowerCase(req.params.title);
  // });
  Post.findOne({title:_.lowerCase(req.params.title)},function(err,foundPost){
    if(err) console.log(err);
    else {
      res.render("post",{post:foundPost});
    }
  });
});

app.post("/compose",function(req,res){
  const post= new Post({
    title:_.lowerCase(req.body.postTitle),
    post:req.body.postBody
  });
  post.save();
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
