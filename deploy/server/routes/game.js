const router = require('express').Router();
let Game = require('../models/game.model');
router.route('/getGame').get((req, res) => {
    req.session.userAction = true;
    req.session.save();
    req.session.cookie.expires = false;
    req.session.cookie.maxAge = 5000000000*60*10000;
      
    Game.find()
            .then(games => {
                res.json({games, sessionID:req.sessionID});
            })
            .catch(err => res.status(400).json('Error: ' + err));

    });

router.route('/add').post((req,res)=>{
    const gameName = req.body.gameName;
    const gameImage= req.body.gameImage;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const questions = req.body.questions;
    const steps = req.body.steps;
    const gameBgColor = req.body.gameBgColor;
    const gameCreator = req.body.gameCreator;

    const newGame = new Game({
        gameName,
        gameImage,
        startTime,
        endTime,
        questions,
        steps,
        gameBgColor,
        gameCreator
    });

    newGame.save()
        .then(() => res.json('Game added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/winner').post((req,res) => {
    if(req.cookies['connect.sid']){
        const email = req.body.email;
        var flag = 0;
        const gameDetails = req.body.gameDetails;
        req.session.email = email;
        if(req.session.gameDetails){
            req.session.gameDetails.forEach(obj => {
                if(obj.gameName === gameDetails.gameName){
                    obj.count = gameDetails.count;
                    flag = 1;
                }
            });
            if(flag == 0){
                req.session.gameDetails.push(gameDetails);
            }
        }
        else{
            req.session.gameDetails = new Array;
            req.session.gameDetails.push(gameDetails);
        }
        req.session.save();
        Game.find({'gameName':gameDetails.gameName})
        .then((data) => {
            var winnersUpdate = new Array;
            // console.log(data);
            if(data[0].winners){
                // console.log('if');
                winnersUpdate = data[0].winners;
                // console.log(winnersUpdate);
                if(winnersUpdate.includes(email)){
                    // console.log('true');
                }
                else{
                winnersUpdate.push(email);
                Game.updateOne({'gameName':gameDetails.gameName},{$set:{winners:winnersUpdate}})
                    .then((data) =>{
                       // console.log('success');
                    })
                    .catch(err => res.status(400).json('Error: ' + err));
                }
                // console.log(winnersUpdate);
            }
            else{
               // console.log('else');
                winnersUpdate.push(email);
                // console.log(winnersUpdate);
                Game.updateOne({'gameName':gameDetails.gameName},{$set:{winners:winnersUpdate}})
                .then((data) =>{
                    // console.log('success');
                })
                .catch(err => res.status(400).json('Error: ' + err));
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));

        res.status(200).json('success');
    }
    else{
        res.status(400).json('un-authorize');
    }
});

router.route('/adminGames').post((req, res) => {
    const username = req.body.username;
    Game.find({'gameCreator': username})
    .then((data) => {
        res.json(data);        
    })
    .catch((err) =>{
      console.log(err);
    })
  })

module.exports = router;