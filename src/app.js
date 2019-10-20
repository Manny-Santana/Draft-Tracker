// @ts-nocheck
//accepts method to use ie: url for return data and callback function to pass as a data handler
const callAPI = (url, callback) => {
  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    headers: {
      "Ocp-Apim-Subscription-Key": key
    },
    success: function() {
      console.log("authentication successful");
    }
  }).done(data => {
    callback(data);
  });
};
const findPlayerID = (players, playerName) => {
  for (let i = 0; i < players.length; i++) {
    if (players[i].Name.toLowerCase() === playerName.toLowerCase()) {
      console.log("found player ID by name");
      console.log(`Name: ${players[i].Name} \n
        PlayerID: ${players[i].PlayerID}`);
      // return playerObjectArray[i].PlayerID;
      //return instead player object
      return players[i].PlayerID;
    }
  }
};
const findPlayerByName = (playerObjectArray, playerName) => {
  for (let i = 0; i < playerObjectArray.length; i++) {
    if (playerObjectArray[i].Name.toLowerCase() === playerName.toLowerCase()) {
      console.log("found player object by name");
      console.log(`Name: ${playerObjectArray[i].Name} \n
        PlayerID: ${playerObjectArray[i].PlayerID}`);
      // return playerObjectArray[i].PlayerID;
      //return instead player object
      return playerObjectArray[i];
    }
  }
};
const getImage = player => {
  return player.PhotoUrl;
};
const key = "6e2832ec52c340428b51f52b6ae367e0";
// const endpoint = "https://api.yelp.com/v3/businesses/search";
const isGameInProgress =
  "https://api.sportsdata.io/v3/nfl/scores/json/AreAnyGamesInProgress";
const getPlayerData = "https://api.sportsdata.io/v3/nfl/scores/json/Players";
const playerImage = "https://api.sportsdata.io/v3/nfl/headshots/json/Headshots";
const getTeams = "https://api.sportsdata.io/v3/nfl/scores/json/Teams/2019REG";
const playerWeek =
  "https://api.sportsdata.io/v3/nfl/projections/json/DfsSlatesByWeek/2019REG/1";
const getPlayerStatsByWeek = (playersArray, playername, week) => {
  const playerid = findPlayerID(playersArray, playername);
  const statsURL = `https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsByPlayerID/2019REG/${week}/${playerid}`;
};
const getSeasonStatsByPlayer = playerID => {
  const seasonStatsByPlayer = `https://api.sportsdata.io/v3/nfl/stats/json/PlayerSeasonStatsByPlayerID/2019REG/${playerID}`;
  return seasonStatsByPlayer;
};

//creates each player card by combining api call data
//player - should be each individual player object likely passed via looping the players array
//statsforgivenweek  - should be obtained from calling the api on the playerstats per week endpoint

const createPlayerComponent = (player, statsforseason) => {
  const $img = $("<img>");
  $img.attr("src", getImage(player)); //set the players image
  const $row = $("<tr>").addClass("player-data");
  //TODO
  const fantasypoints = statsforseason[0].FantasyPoints;
  const gamesPlayed = statsforseason[0].Played;
  //get fantasypoints somehow
  const targets = statsforseason[0].ReceivingTargets;
  const rushattempts = statsforseason[0].RushingAttempts;
  const ReceptionPercentage = statsforseason[0].ReceptionPercentage;

  // const tdPlayerCard = $("<td>").addClass("player-card");
  // const h4Name = $("<h4>").text(player.Name);
  $row.html(
    `
    
                  <td class='player-card'>
                  </h4>${player.Name}<h4>
  
                      <img src=${player.PhotoUrl} alt="player"></td>

                  <td>${player.Team}</td>
                  <td>${player.Position}</td>
                  <td><h4>Targets:${targets} </h4></td>
                  <td> <h4>Avg Fantasy PPG: ${fantasypoints /
                    gamesPlayed} </h4></td>
                    <td><h4>Total Fantasy Points: ${fantasypoints}</h4></td>
                    <td><h4>Reception Percentage: ${ReceptionPercentage}</h4></td>
                    <td><h4>Rushing Attemps (Season): ${rushattempts}</h4></td>
                    <td><h4>Rushing Attemps (Season): ${rushattempts}</h4></td>
                    <td><h4>Rushing Attemps (Season): ${rushattempts}</h4></td>
                    
                  
    `
  );
  $("tbody").append($row);
};

const openNav = () => {
  $("#mySidenav").css("width", "100%");
};
const closeNav = () => {
  $("#mySidenav").css("width", "0");
};

let playersObjectsArray; // variable to hold player array on page load

$(() => {
  //start of jquery on window load
  callAPI(getPlayerData, playersArray => {
    //start of getplayerdata call
    playersObjectsArray = playersArray;
    console.log("loaded all objects into the global players variable");

    //TODO its too slow! how can i get it to be faster?!
    //possible solution 1 - load all player objects into variable before button is clicked and use that to calculate numbers.
    ///TEST! THIS WILL THREORETICALLY WORK BUT IT WILL MOST LIKELY CHEW UP MY API REQUEST LIMIT OF 1000/MONTH DO NOT IMPLEMENT.... YET :)

    //I COULD ALSO LIMIT THE NUMBER OF REQUESTS BY FILTERING THE PLAYER OBJECT ARRAY FOR ONLY ACTIVE PLAYERS IN THE 2019 SEASON.
  }); //end of get player data api call...

  //--------------------------------------------
  //set click event for open nav
  $(".burger").on("click", openNav);
  $(".closebtn").on("click", closeNav);

  $("#search-btn").on("click", () => {
    const playerName = $("#search-text").val();
    console.log(`value of search = ${playerName}`);

    const playerID = findPlayerID(playersObjectsArray, playerName);

    callAPI(getSeasonStatsByPlayer(playerID), seasondata => {
      //start of seadon data call
      createPlayerComponent(
        findPlayerByName(playersObjectsArray, playerName),
        seasondata
      );
    }); //end of season data call
  });
}); //end of jquery
