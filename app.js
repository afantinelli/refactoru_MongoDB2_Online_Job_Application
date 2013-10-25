
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/omegastudios');
var Applicant = mongoose.model('Applicant', { name: String, bio: String, skills: Array, years: Number, why: String });

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//renders the index page
app.get('/', function(req, res){
        res.render('index')
});

// displays a list of applicants
app.get('/applicants', function(req, res){
        Applicant.find({},function (err, applicants){
                if(err){console.log('ERROR')}
                else{
                    console.log('apps', applicants);
                    res.render('applicants', {applicants : applicants});
                }
        });
});


//app.post('/applicants' , function(req, res){
//});

// creates an applicant
app.post('/applicant', function(req, res){
        var submitInfo = req.body
        console.log('test');
        var applicant = new Applicant(submitInfo);
        applicant.save();
        res.send({success : 'Success!'});        
});
		
	 
        // Here is where you need to get the data
        // from the post body and store it
 

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
