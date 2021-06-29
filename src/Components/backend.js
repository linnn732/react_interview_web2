const Sequelize = require('sequelize');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//將request進來的 data 轉成 json()
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));*/
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 監聽於 8080 端口
const port = 8080
app.listen(port, () => {
        console.log(`server listen to http://localhost:${port}`)
      })

// 連線 DB
const sequelize = new Sequelize('interview_db', 'liting', 'C107118122', {
        host: '163.18.26.236',
        port: 3306,
        dialect: 'mysql'
    });
    
//定義Model
const build_data = sequelize.define('build_data', {
        build_name: {     　　　
          type: Sequelize.STRING,  
          allowNull: false,　　　
          primaryKey: true
        },
        build_interviewee:{
          type: Sequelize.STRING, 
          allowNull: false,　　
          primaryKey: true
        }}, 
        {
        timestamps: false,
        freezeTableName: true,
        tableName: 'build_data'
      });

// insert  
app.post('/savebuild', function (request, response) {
        return build_data.create({
          build_name: request.body["name"],
          build_interviewee:JSON.stringify(request.body["email"])
            
        }).then(function (users) {
            if (users) {
                response.send(users);
            } else {
                response.status(400).send('Error in insert new record');
            }
        });
    });

// search  
app.post('/getDBdata', function (request, response) {
  console.log(request.body)
  build_data.findOne({
    where: {
        'build_name': request.body["build_name"]
    } // 查詢條件
  }).then(result => {
    console.log(JSON.stringify(result))
    response.json(result) 
  }).catch(err => {
    console.log(err)
  })
});




  