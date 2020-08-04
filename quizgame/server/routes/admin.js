const router = require('express').Router();
let Admin = require('../models/admin.model');

router.route('/').get((req, res) => {
  Admin.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/signup').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new Admin({username,email,password});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  Admin.findOne({'email': email})
  .then((data) => {
      if (data.password === password){
        res.json("login authorized");
      }
      else{
          res.json("please check the credentials");
      }
      
  })
  .catch((err) =>{
    console.log(err);
  })
})

module.exports = router;