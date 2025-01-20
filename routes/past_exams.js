var express = require('express');
var router = express.Router();


const data =  [
  {
    "paperid":'1',
    "subject":'Chemistry',
    "year":"2024",
    "unit":'Unit 1',
    'curriculam':"A-Levels",
    'session':'Fall',
  
  },
  {
    "paperid":'2',
    "subject":'Chemistry',
    "year":"2024",
    "unit":'Unit 2',
    'curriculam':"A-Levels",
    'session':'Fall',
   
  },
  
]

router.get('/check_answer/', function(req, res, next) {
  res.send("Will be available on next update");
});


router.get('/', function(req, res, next) {
  if (Object.keys(req.query).length===0) {
    res.send(data);  
  }
  else{
    const subject = req.query.subject
    const curriculam = req.query.curriculam
    const session = req.query.session
    const year = req.query.year
    const unit = req.query.unit
    // TODO
    res.send("NEXT vERSION"); 
  }
  
});

router.get('/:paperId', function(req, res, next) {

  const paperId = req.params.paperId;
  const output = data.filter((paper) => paper.paperid == paperId);
  res.send(output);
});



const questions=[
  {
    'questionId':1,
    'paperId':1,
    'question':"What is symbol of Water",
    'options':[{'key':'O2','value':'A'},{'key':'HO','value':'B'},{'key':'HO2','value':'C'},{'key':'H20','value':'D'}],
    'mark_scheme':'D',
    'mark':1
  
  },
  {
    'questionId':2,
    'paperId':1,
    'question':"What is symbol of Water",
    'options':[{'key':'O2','value':'A'},{'key':'HO','value':'B'},{'key':'HO2','value':'C'},{'key':'H20','value':'D'}],
    'mark_scheme':'D',
    'mark':1
  
  },
  {
    'questionId':3,
    'paperId':3,
    'question':"What is symbol of Water",
    'options':[{'key':'O2','value':'A'},{'key':'HO','value':'B'},{'key':'HO2','value':'C'},{'key':'H20','value':'D'}],
    'mark_scheme':'D',
    'mark':1
  
  },
  {
    'questionId':4,
    'paperId':2,
    'question':"What is symbol of Water",
    'options':[{'key':'O2','value':'A'},{'key':'HO','value':'B'},{'key':'HO2','value':'C'},{'key':'H20','value':'D'}],
    'mark_scheme':'D',
    'mark':1
  
  }
]

router.get('/:paperId/questions', function(req, res, next) {
  const paperId = req.params.paperId;
  const output = questions.filter((question) => question.paperId == paperId);
  res.send(output);
});





module.exports = router;