const express = require('express');
const recipesRouter = express.Router()
const Recipes = require("../models/recipes.js");
// const recipesData=require('../models/seed')

// I        N       D       U       C       E       S    // INDUCES
// INDEX    NEW     DELETE  UPDATE  CREATE  EDIT    SHOW

// INDEX
recipesRouter.get("/", (req, res) => {
    Recipes.find({}, (error, allrecipes) => {
      res.render("index.ejs", {
        recipes: allrecipes,
      });
    });
  });
  
  // NEW
  recipesRouter.get("/new", (req, res) => {
    res.render("new.ejs");
    // res.send('New works')
  });
  
  // DELETE
  recipesRouter.delete("/:id", (req, res) => {
    // res.send("Delete works")
    Recipes.findByIdAndRemove(req.params.id, (error, deletedrecipes) => {
      console.log(deletedrecipes);
      res.redirect("/recipes");
    });
  });
  
  // UPDATE
  recipesRouter.put('/:id', (req, res)=>{
      // console.log(req.body)
      Recipes.findByIdAndUpdate(
          req.params.id, 
          req.body,
          {new:true},
          (error,updatedRecipes)=>{
          // console.log(error)
          // console.log(updatedRecipes)
          res.redirect(`/recipes/${req.params.id}`)
      })
      
  })
  
  // CREATE ROUTE
  recipesRouter.post("/", (req, res) => {
    Recipes.create(req.body, (error, CreatedRecipes) => {
      res.redirect("/recipes");
    });
  });
  
  // Edit
  recipesRouter.get("/:id/edit",(req, res)=>{
      Recipes.findById(req.params.id,(error, foundRecipes)=>{
          // res.send(foundRecipes)
          res.render('edit.ejs',{
              recipes: foundRecipes
          })
      })
  })
  
  // SHOW
  recipesRouter.get("/:id", (req, res) => {
    Recipes.findById(req.params.id, (error, foundRecipes) => {
      //   res.send(foundRecipes);
      res.render("show.ejs", { recipes: foundRecipes });
    });
    // res.send("Works, SHOW")
  });

// SEED
// recipesRouter.get("/seed",(req, res)=>{
//     Recipes.deleteMany({},(error,allrecipes)=>{})

//     Recipes.create(recipesData, (error,data)=> {
//         res.redirect("/recipes");
//     })
// })

module.exports = recipesRouter