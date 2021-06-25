let express = require("express");
let app =  express()
var jwt = require("jsonwebtoken");
let cookieParser = require('cookie-parser');
app.use(cookieParser())

let port = 9000;

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'Navgurukul123#@!',
      database : 'turing'
    }
});

knex.connection((err) => {
  if (!err)
      console.log("db connected");
  else
      console.log("not connected");
});

// departments....... section................
app.get("/departments" , (req,res) => {
  knex()
    .select("*")
    .from("department")
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})

app.get("/departments/:department_id" , (req,res) => {
  knex()
    .select("*")
    .from("department")
    .where("department_id" , req.params.department_id)
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})

// categories .......section......
app.get("/categories" , (req,res) => {
  knex()
    .select("*")
    .from("category")
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})


app.get("/categories/:category_id" , (req,res) => {
  knex()
    .select("*")
    .from("category")
    .where("category_id" , req.params.category_id)
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})


app.get("/categories/inProduct/:product_id", (req,res) => {
  var product_id = req.params.product_id
  knex("category")
    .select('product_category.category_id','category.department_id','name') 
    .join("product_category", "category.category_id", "=", "product_category.category_id")
    .where('product_category.product_id',product_id)
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})


app.get('/categories/inDepartment/:department_id', (req, res) => {
  knex('category')
  .select('category.category_id', 'category.name', 'category.description')
  .join('department', 'category.department_id', '=', 'department.department_id')
  .where('department.department_id', req.params.department_id)
  .then((data) => {
      res.send(data)
  })
  .catch((err) => {
      res.send(err)
  })
})


// attributies........ section......
app.get("/attributes" , (req,res) => {
  knex()
    .select("*")
    .from("attribute")
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})


app.get("/attributes/:attribute_id" , (req,res) => {
  knex()
    .select("*")
    .from("attribute")
    .where("attribute_id" , req.params.attribute_id)
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})


app.get("/attributes/values/:attribute_id", (req,res) => {
  var attribute_id = req.params.attribute_id 
  knex('attribute')
    .select('attribute_value.attribute_value_id', 'value')
    .join("attribute_value" , "attribute.attribute_id", "attribute_value.attribute_id")
    .where('attribute_value.attribute_value_id', attribute_id)
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})


app.get("/attributes/inProduct/:product_id" , (req,res) => {
  var products = req.params.product_id
  knex("attribute")
    .select("attribute_value.attribute_value_id","name","value")
    .join("attribute_value","attribute.attribute_id",'=',"attribute_value.attribute_id")
    .join("product_attribute","attribute_value.attribute_value_id",'=', "product_attribute.attribute_value_id")
    .where("product_attribute.product_id", products)
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})


// products........ section......
app.get("/products" , (req,res) => {
  knex()
    .select("*")
    .from("product")
    .then((data) => {
      var wholeData = {
        count: data.length,
        rows: data
    }
    res.send(wholeData)
    console.log(wholeData)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})


app.get("/products/:product_id" , (req,res) => {
  knex()
    .select("*")
    .from("product")
    .where("product_id" , req.params.product_id)
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})


app.get("/products/search" , (req,res) => {
  knex("product")
    .select("product.product_id","name","description","price","discounted_price","thumbnail")
    .where('product.name',req.params.search)
    .then((data) => {
      for (var i=0; i<data.length; i++){
        if (data[i]["name"] === data[i]["name"]){
          var wholeData = {
            count: data[i]["name"].length,
            rows: data
          }
        }
      }
      res.send(wholeData)
      console.log(wholeData)
    }).catch((err) => {
      console.log(err)
      res.send(err)
    })
})


// app.get('/:search',(req,res)=>{
//   knex('product')
//   .select('product_id','name','description','price','discounted_price','thumbnail')
//   .where('product.name',req.params.search)
//   .then((data) => {
//     for (var i=0; i<data.length; i++){
//       if (data[i]["name"] === data[i]["name"]){
//         var wholeData = {
//           count: data[i]["name"].length,
//           rows: data
//         }
//       }
//     }
//     res.send(wholeData)
//     console.log(wholeData)
//   })
//   .catch((err)=>{
//       console.log(err);
//       res.send(err)
//   })
// })


app.get("/products/inCategory/:category_id" , (req,res) => {
  var products = req.params.category_id
  knex("product")
    .select("product.product_id","name","description","price","discounted_price","thumbnail")
    .join("product_category" , "product.product_id" , "product_category.product_id")
    .where("product_category.category_id",products)
    .then((data) => {
      for (var i=0; i<data.length; i++){
        if (data[i]["name"] === data[i]["name"]){
          var wholeData = {
            count: data[i]["name"].length,
            rows: data
          }
        }
      }
      console.log(wholeData)
      res.send(wholeData)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})


app.get("/products/inDepartment/:department_id", (req,res) => {
  var departments = req.params.department_id
  knex("product")
    .select("product.product_id","name","description","price","discounted_price","thumbnail")
    .join("department" , "products.product_id" , "department.department_id")
    .where("department.department_id" , departments)
    .then((data) => {
      for (var i=0; i<data.length; i++){
        if (data[i]["name"] === data[i]["name"]){
          var wholeData = {
            count: data[i]["name"].length,
            rows: data
          }
        }
      }
      console.log(wholeData)
      res.send(wholeData)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})


app.get("/products/:product_id/details" , (req,res) => {
  knex("product")
    .select("product.product_id", "product.name" , "product.description", "product.price" , "product.discounted_price","product.image" , "product.image_2")
    .from("product")
    .where("product_id" , req.params.product_id)
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})


app.get("/products/:product_id/locations" , (req,res) => {
  var products = req.params.product_id
  knex("product")
    .select("category.category_id" , "category.name" , "department.department_id" , "department.name")
    .join("category" , "product.product_id" , "=" ,  "category.department_id")
    .join("department" , "category.department_id" , "=" ,  "department.department_id")
    .where("product.product_id" , products)
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((error) => {
      console.timeLog(error)
      res.send(error)
    })
})


app.post("/products/:product_id/reviews" , (req,res) => {
  knex("review")
    .select("*")
    .join("review" , "product.product_id" , "review.product_id")
    .insert ({
      // customer_id : req.body.customer_id,
      // product_id  : req.body.product_id,
      // name : req.body.name,
      review : req.body.review,
      rating : req.body.rating,
      created_on : req.body.created_on
    })
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})



app.get("/products/:product_id/reviews" , (req,res) => {
  var products = req.params.product_id
  knex("product")
    .select("product.name" , "review.review" , "rating" , "created_on")
    .join("review" , "product.product_id" , "review.product_id")
    .where("product.product_id" , products)
    .then((data) => {
      console.log("no data")
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})

// customers...... section.....
app.get("/customers" , (req,res) => {
  knex()
    .select("*")
    .from("customer")
    .where("customer_id" , req.params.customer_id)
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((error) => {
      console.log(error)
    })
})


app.post("/customers" , (req,res) => {
  knex("customer")
    .insert ({
      customer_id  : req.body.customer_id,
      name : req.body.name,
      email : req.body.email,       
      password  : req.body.password,
      credit_card  : req.body.credit_card,
      address_1 : req.body.address_1,
      address_2  : req.body.address_2 ,    
      city  : req.body.city,                 
      region  : req.body. region,        
      postal_code : req.body.postal_code,     
      country  : req.body.country,      
      shipping_region_id : req.body.shipping_region_id,
      day_phone : req.body.day_phone, 
      eve_phone  : req.body.eve_phone,    
      mob_phone  : req.body.mob_phone
    })
      .then((data) => {
        var whole_data = {
          customer : {
            schema : data ,
          }
        }
        console.log(whole_data)
        res.send(whole_data)
       })
      .catch((err) => {
        console.log(err)
        res.send(err)
      })
})


app.put("/costomer_update" , (req,res) => {
  knex.update({
    "customer_id" : req.body.customer_id,
    "name" : req.body.name,
    "email" : req.body.email,       
    "password"  : req.body.password,
    "credit_card"  : req.body.credit_card,
    "address_1"  : req.body.address_1,
    "address_2"  : req.body.address_2 ,    
    "city"  : req.body.city,                 
    "region"  : req.body. region,        
    "postal_code" : req.body.postal_code,     
    "country"  : req.body.country,      
    "shipping_region_id" : req.body.shipping_region_id,
    "day_phone" : req.body.day_phone, 
    "eve_phone"  : req.body.eve_phone,    
    "mob_phone"  : req.body.mob_phone,
  })
    .Table("customer").where("customer_id",req.params.customer_id)
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})


app.post("/customers/facebook" , (req,res) => {
  knex.select("email").from("customer")
  .then((data) => {
    if (data.length>0){
      for (var i=0; i<data.length; i++){
        if (data[i]["email"] === req.body.email){
          jwt.sign({ user: data }, "secret_key", (err, tok) => {
            if (err){
              res.sendStatus(err)
            }else{
              res.cookie("accessToken" ,tok)
              knex("customer")
                  .select("*")
                  .then((data) => {
                    var whole_data = {
                      customer : {
                        schema : data , accessToken : res.send(tok) ,
                        expires_in: "24h"
                      }
                    }
                    console.log(whole_data)
                    res.send(whole_data)
                  })
                  .catch((err) => {
                    console.log(err)
                    res.send(err)
                  })
            }
          })
        }
      }
    }else{
      if (data.length === 0){
        knex("customer")
          .insert({
            customer_id  : req.body.customer_id,
            name : req.body.name,
            email : req.body.email,       
            password  : req.body.password,
            credit_card  : req.body.credit_card,
            address_1 : req.body.address_1,
            address_2  : req.body.address_2 ,    
            city  : req.body.city,                 
            region  : req.body. region,        
            postal_code : req.body.postal_code,     
            country  : req.body.country,      
            shipping_region_id : req.body.shipping_region_id,
            day_phone : req.body.day_phone, 
            eve_phone  : req.body.eve_phone,    
            mob_phone  : req.body.mob_phone
          })
            .then((data) => {
              console.log(data , "new user detail")
              res.send(data, "new user detail")
            })
            .catch((error) => {
              console.log(error)
              res.send(error)
            })
      }
    }
  })
  .catch((err) => {
    console.log(err)
    res.send(err)
  })

})


app.listen(port , () => {
  console.log(`your server is running on this port ${port}`)
})