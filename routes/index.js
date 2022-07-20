var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('inicial', { title: 'Express' });
});
/*get home page.*/
router.get('/index', function (req, res) {
  global.db.findAll((err, docs)=> {
    if (err) { return console.log(err); }
    res.render('index', { docs });
  });
});

/* GET new page.*/
router.get('/novo', function (req, res, next) {
  res.render('novo', { title: 'Novo cadastro de Cliente', doc:{"nome":"","idade":"", "uf":""}, action:'/novo'});
});
/*post new page.*/
router.post('/novo', function (req, res, next) {
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
  global.db.insert({ nome, idade, uf }, (err, result) =>{
    if (err) { return console.log(err); }
    res.redirect('/');
  });
});

/*get delete page.*/
router.get('/delete/:id', function (req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (err, r)=> {
    if (err) { return console.log(err); }
    res.redirect('/index');
  });
});

/* GET edit page.*/
router.get('/edit/:id', function(req, res, next){
  var id = req.params.id;
  global.db.findOne(id, (err, docs)=> {
    if(err) { return console.log(err); }
    res.render('novo', {title: 'Alterar Cliente', doc: docs[0], action: '/edit/' + docs[0]._id});
  });
});

/*POST edit page. */
router.post('/edit/:id', function(req, res, next){
  const id = req.params.id;
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
  global.db.update(id, {nome, idade, uf}, (err, result)=>{
     if(err){ return console.log(err); }
     res.redirect('/index');
  });
});
module.exports = router;
