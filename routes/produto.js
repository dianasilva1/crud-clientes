var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
 // res.render('index', { title: 'Express' });
//});
/*get home page.*/
router.get('/produto', function (req, res) {
  global.db.findAll((err, docs)=> {
    if (err) { return console.log(err); }
    res.render('produto', { docs });
  });
});

/* GET new page.*/
router.get('/novoproduto', function (req, res, next) {
  res.render('novoproduto', { title: 'Novo cadastro de Produto', doc:{"nomeProduto":"","descProduto":"", "compraProduto":"", "vendaProduto":""}, action:'/novoproduto'});
});
/*post new page.*/
router.post('/novoproduto', function (req, res, next) {
  const nomeProduto = req.body.nomeProduto;
  const descProduto = req.body.descProduto;
  const compraProduto = parseInt(req.body.compraProduto);
  const vendaProduto = parseInt(req.body.vendaProduto);
  
  global.db.insert({ nomeProduto, descProduto, compraProduto, vendaProduto }, (err, result) =>{
    if (err) { return console.log(err); }
    res.redirect('/');
  });
});

/*get delete page.*/
router.get('/produto/delete/:id', function (req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (err, r)=> {
    if (err) { return console.log(err); }
    res.redirect('/produto');
  });
});

/* GET edit page.*/
router.get('/produto/edit/:id', function(req, res, next){
  var id = req.params.id;
  global.db.findOne(id, (err, docs)=> {
    if(err) { return console.log(err); }
    res.render('novoproduto', {title: 'Alterar Produto', doc: docs[0], action: '/produto/edit/' + docs[0]._id});
  });
});

/*POST edit page. */
router.post('/produto/edit/:id', function(req, res, next){
  const id = req.params.id;
  const nomeProduto = req.body.nomeProduto;
  const descProduto = req.body.descProduto;
  const compraProduto = parseInt(req.body.compraProduto);
  const vendaProduto = parseInt(req.body.vendaProduto);
  
  global.db.update(id, {nomeProduto, descProduto, compraProduto, vendaProduto}, (err, result)=>{
     if(err){ return console.log(err); }
     res.redirect('/produto');
  });
});
module.exports = router;
