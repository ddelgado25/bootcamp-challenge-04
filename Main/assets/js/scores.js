// if (localStorage.getItem("playerdata")) {
//     var highScoreData = JSON.parse(localStorage.getItem("playerdata"));
    
//   }
//   else{
//     highScoreData = [];
//   }
var highScores = document.querySelector("#highscores")

function playerRank(){

    if (localStorage.getItem("playerdata")){
      highScoreData = JSON.parse(localStorage.getItem("playerdata"));
  
      highScoreData.sort(function scoreOrder(a,b){
        if (a.playerScore > b.playerScore){
          return -1;
          
        }
        if (a.playerScore < b.playerScore) {
          return 1;
  
        }
        if (a.playerScore == b.playerScore) {
          return 0;
          
        }
      });
    }
      else{
        highScoreData = [];
      }
    console.log(highScoreData)
  
  
  
    // localStorage.setItem("playerdata" , JSON.stringify(highScoreData))
    for (var i = 0; i < highScoreData.length; i++) {
    var userRank = highScoreData[i].playerInitials;
    var userScore = highScoreData[i].playerScore;
  
    var li = document.createElement("li");
    li.textContent = userRank + " " + userScore;
    li.setAttribute("playerdata" , i);
    highScores.appendChild(li);
    
    }
  }  
  
  playerRank();