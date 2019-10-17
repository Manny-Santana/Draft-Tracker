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
      alert("authentication successful");
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

  // const tdPlayerCard = $("<td>").addClass("player-card");
  // const h4Name = $("<h4>").text(player.Name);
  $row.html(
    `
    
                  <td class='player-card'>
                  </h4>${player.Name}<h4>
  
                      <img src=${player.PhotoUrl} alt="player"></td>

                  <td>${player.Team}</td>
                  <td>${player.Position}</td>
                  <td> <h4>AVERGAE Fantasy Points PER GAME: ${fantasypoints /
                    gamesPlayed} </h4></td>
                  <td><h4>Targets: ${targets + rushattempts} </h4></td>
    `
  );
  $("tbody").append($row);
};

$(() => {
  //GET PLAYER STATS BY SEASON!!!
  // callAPI(seasonStatsByPlayer, player => {
  //   console.log(player);
  // });
  // console.log("connected");
  //GET PLAYER OBJECT BY NAME AND GET PLAYER ID BY NAME
  //WORKS!!!
  callAPI(getPlayerData, players => {
    const player = findPlayerByName(players, "James Conner");
    callAPI(getSeasonStatsByPlayer(player.PlayerID), seasondata => {
      createPlayerComponent(player, seasondata);
    });
  });
  // callAPI(playerGameStatsByPlayer, player => {});
  // $.ajax({
  //   type: "GET",
  //   url: `https://api.sportsdata.io/v3/nfl/stats/json/PlayerGameStatsByPlayerID/2019REG/1/${findPlayerID(
  //     players,
  //     "James Conner"
  //   )}`,
  //   dataType: "json",
  //   headers: {
  //     "Ocp-Apim-Subscription-Key": key
  //   },
  //   success: function() {
  //     alert("authentication successful");
  //   }
  // }).done(data => {
  //   console.log(data);
  // });
  // let players = $.ajax({
  //   type: "GET",
  //   url: getPlayerData,
  //   dataType: "json",
  //   headers: {
  //     "Ocp-Apim-Subscription-Key": key
  //   },
  //   success: function() {
  //     alert("authentication successful");
  //   }
  // }).done(data => {
  //   console.log(data);
  // });
  // console.log(`all players: ${players}`);
});
