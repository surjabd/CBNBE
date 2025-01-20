var express = require('express');
var router = express.Router();

/* GET content listing. */
const courses=[
  {
    'courseId':1,
    'title':"Chemistry by Navid",
    'subject':'fk-subject',
    'curriculem':"fk-curriculem",
    'unit':"fk-unt",
    'author':'fk-User',
    'status':'bool',
    'payment':false,
    'amount': 0

  },
  
]



router.get('/', function(req, res, next) {
  res.send(courses);
});

router.get('/:courseId', function(req, res, next) {
  res.send("Will get course details not yet designed");
})

module.exports = router;
