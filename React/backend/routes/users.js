const router = require('express').Router();
let User = require('../models/user.model');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        const now = new Date().toISOString(); const date = now.replace(/:/g, '-'); cb(null, date + file.originalname);
    }
});
const upload = multer({storage: storage}).single('pimage');

router.route('/').get((req, res) => {
    // eslint-disable-next-line       
    User.find()                            
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});


router.route('/add').post((req, res) => {  
    
//router.post("/add", upload.single('pimage'), (req, res) => {
  
    
    const username = req.body.username;
    const fullname = req.body.fullname;
    const birthdate = Date.parse(req.body.birthdate);
    const email     = req.body.email;
    const password  =  req.body.password;
    const pimage    = req.body.pimage;

    const newUser = new User({
        username,
        fullname,
        birthdate,
        email,
        password,
        pimage,
    });
    console.log(newUser);
    newUser.save()
        .then (() => res.json('User added sucessfully!'))
        .catch(err => res.status(400).json('Error please try again: ' +err));

});

router.route('/:id').get((req, res) => {
        User.findById(req.params.id)
            .then(users => res.json(users))
            .catch(err => res.status(400).json('Error: That Id not valid ' + err));
    });

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted'))
        .catch(err => res.status(400).json('Error: That Id not valid ' + err));
});

router.route('/update/:id').post((req,res) => {
    User.findById(req.params.id)
        .then( users => {
           // users.username = req.body.username;
            users.fullname = req.body.fullname;
            users.birthdate = Date.parse(req.body.birthdate);
            users.email     = req.body.email;
            users.password  = req.body.password;
            users.pimage     = req.body.pimage;

            users.save()
                .then(() => res.json('User Updated!'))
                .catch(err => res.status(400).json("Error: Couldnt update the user " + err));
        })
        .catch(err => res.status(400).json('Error: That Id not valid ' + err));
});




module.exports = router;