const async = require("async");
const { path } = require("express/lib/application");
const menuModel = require("../models/menu");


// --------------------------------------------post data-----------------------------------------------------
function addMenu(req, res){
console.log("req.body",req.body);
console.log("req.file", req.files)
console.log("req.params",req.params);
console.log("req.query",req.query);
    
    async.waterfall([
        function(callback){

            let imageGallery = req.files.dishImageGallery.map((item,index,arr)=>{
                console.log("dishImageGallery",req.files.dishImageGallery);
                return item.path
            })

            let size = [
                {'type':'small','price':10, 'qty':10}, 
                {'type':'medium','price':20, 'qty':20}, 
                {'type':'large', 'price':30, 'qty':30}
        ]
            
            const object = {
                dishName : req.body.dishName,
                category :req.body.category,
                tags : req.body.tags,
                size : size,
                dishImage: req.files.dishImage[0].path,
                dishImageGallery :  imageGallery,
                
                
            };

            const menu = new menuModel(object);
            console.log("menu object = ", menu);
            menu.save().then(()=>{
                callback(null, menu);
            }).catch((e)=>{
                console.log(e);
                callback(true,[]);
            });
        },
    ],
    (err, menu)=>{
        console.log("menu", menu);


        if(err){

            res.status(400).json({sucess: false , err: err})
        }
        else {
            let data = {
              menus: menu
            };
            console.log("data", data);
            res.status(200).json({ success: true, data: data });
          }
    })
}
 //-------------------------------------------------------upload image--------------------------------------
 function uploadpictures(req,res){
  
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    console.log("response",response);
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    return res.send(response)  
  }


//--------------------------------------------get menu-----------------------------------------------------


function getMenus(req,res){
        console.log("req.params", req.params);   //get//properties attached to the url,prefix the parameter name with a colon(:) when writing routes.
        console.log("req.body", req.body); //Generally used in POST/PUT requests.
        console.log("req.query", req.query); //req.query is mostly used for searching,sorting, filtering, pagination........exm - GET  http://localhost:3000/animals?page=10
      
        async.waterfall([
            function(callback){
                menuModel.find({},(err,menu)=>{
                    if(err){
                        callback(true, menu);
                    }
                    callback(null, menu)
                    console.log("all menu", menu);                    
                });
            },
        ],
        (err, menu) => {

            if (err) {     
              res.status(400).json({ success: false, err: err });
            } else { 
                let data = {
                    menus: menu
                  };
                  console.log("getdata", data);
                  res.status(200).json({ success: true, data: data });
            }
          }
        )
}


//------------------------get--------------------api/v1/getMenus?category=breakfast&category=Lunch&tags=veg  - get menu item by search query with multiple filters-----------------------------------------------------


function getMenuitem(req,res){
    console.log("req.params", req.params);   //get//properties attached to the url,prefix the parameter name with a colon(:) when writing routes.
    console.log("req.body", req.body); //Generally used in POST/PUT requests.
    console.log("req.query", req.query); //req.query is mostly used for searching,sorting, filtering, pagination........exm - GET  http://localhost:3000/animals?page=10
  
    async.waterfall([
        function(callback){
            menuModel.find({category: {$in: ["breakfast", "lunch"]}, tags: req.query.tags},(err,menu)=>{
              
                if(err){
                    callback(true, menu);
                }
                callback(null, menu)
                                    
            });
        },
    ],
    (err, menu) => {

        if (err) {     
          res.status(400).json({ success: false, err: err });
        } else { 
            let data = {
                menus: menu
              };
              console.log("get-filter-data", data);
              res.status(200).json({ success: true, data: data });
        }
      }
    )
}


// //-------------------------------PUT API----------1. api/v1/updateMenu/:id - Update items in menu-----------------------------------------------


function updateMenu(req,res){
    console.log("req.params", req.params);   //get//properties attached to the url,prefix the parameter name with a colon(:) when writing routes.
    console.log("req.body", req.body); //Generally used in POST/PUT requests.
    console.log("req.query", req.query); //req.query is mostly used for searching,sorting, filtering, pagination........exm - GET  http://localhost:3000/animals?page=10
  
    async.waterfall([
        function(callback){
            
            menuModel.findOneAndUpdate({_id: req.params.id},{$set:{tags: ["veg","nonveg"]}},(err, menu)=>{ 
               
                if(err){
                    console.log("error", err);
                    callback(true, menu);
                }
                callback(null, menu)
                                    
            });
        },
    ],
    (err, menu) => {

        if (err) {     
          res.status(400).json({ success: false, err: err });
        } else { 
            let data = {
                menus: menu
              };
              console.log("get-updatedData", data);
              res.status(200).json({ success: true, data: data });
        }
      }
    )
}

//-------------------------------PaTCH API----------1.api/v1/addQty/:id - Add qty in menu-----------------------------------------------


function updateOneMenu(req,res){
    console.log("req.params", req.params);   //get//properties attached to the url,prefix the parameter name with a colon(:) when writing routes.
    console.log("req.body", req.body); //Generally used in POST/PUT requests.
    console.log("req.query", req.query); //req.query is mostly used for searching,sorting, filtering, pagination........exm - GET  http://localhost:3000/animals?page=10
  
    async.waterfall([
        function(callback){
            
            menuModel.findOneAndUpdate({_id: req.params.id, 'size.type': req.query.type},{$set:{'size.$.qty': 5 }},(err, menu)=>{ 
               
                               
                if(err){
                    console.log("error", err);
                    callback(true, menu);
                }
                console.log("menu",menu)
                callback(null, menu)
                                    
            });
        },
    ],
    (err, menu) => {

        if (err) {     
          res.status(400).json({ success: false, err: err });
        } else { 
            let data = {
                menus: menu
              };
              console.log("get-updatedData", data);
              res.status(200).json({ success: true, data: data });
        }
      }
    )
}
//-------------------------------DELETE API----------. api/v1/deletemenu/:id - Delete dish in menu -----------------------------------------------


function deleteMenu(req,res){
    console.log("req.params", req.params);   //get//properties attached to the url,prefix the parameter name with a colon(:) when writing routes.
    console.log("req.body", req.body); //Generally used in POST/PUT requests.
    console.log("req.query", req.query); //req.query is mostly used for searching,sorting, filtering, pagination........exm - GET  http://localhost:3000/animals?page=10
  
    async.waterfall([
        function(callback){
            
            menuModel.findOneAndDelete({_id: req.params.id},{$set:{'dishName':'japan'}},(err, menu)=>{ 
                
                               
                if(err){
                    console.log("error", err);
                    callback(true, menu);
                }
                console.log("menu",menu)
                callback(null, menu)
                                    
            });
        },
    ],
    (err, menu) => {

        if (err) {     
          res.status(400).json({ success: false, err: err });
        } else { 
            let data = {
                menus: menu
              };
              console.log("delete-Data", data);
              res.status(200).json({ success: true, data: data });
        }
      }
    )
}



    module.exports = {
        addMenu,
        uploadpictures,
        getMenus,
        getMenuitem,
        updateMenu,
        updateOneMenu ,
        deleteMenu 
    };

 
      