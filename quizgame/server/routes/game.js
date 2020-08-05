const router = require('express').Router();
let Game = require('../models/game.model');

router.route('/').get((req, res) => {
    Game.find()
      .then(users => res.json(users))
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


module.exports = router;