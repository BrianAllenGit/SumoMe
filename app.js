var express = require('express');
var app = express();
var path    = require("path");
var Sequelize = require("sequelize");

var connection = new Sequelize('sumome_schema', 'root','password');

var Question = connection.define('question',{
	questionId: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	questionText: {
		type: Sequelize.TEXT,
		allowNull: false
	}
});

var Answer = connection.define('answer',{
	answerId: {
		type: Sequelize.INTEGER,
		primaryKey: true
	}, 
	answerText: {
		type: Sequelize.TEXT,
		allowNull: false
	}
});
var User = connection.define('user',{
	userId: {
		type: Sequelize.STRING,
		primaryKey: true
	}
})
var UserAnswers = connection.define('user_answers');



Question.hasMany(Answer,{foreignKey: 'questionId'});
User.hasMany(UserAnswers,{foreignKey: 'userId'});
UserAnswers.belongsTo(Answer, {foreignKey: 'answerId'});

connection.sync({
	force: true
});

app.use(express.bodyParser());
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});
	
app.post('/', function (req, res) {
  console.log(req.body);
  res.send(200);
});
app.listen(3000, function () {
  console.log('Sumo Me Webserver listening on port 3000!');
});