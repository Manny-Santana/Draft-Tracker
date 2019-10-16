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
const findPlayerbyName = (playerObjectArray, playerName) => {
  for (let i = 0; i < playerObjectArray.length; i++) {
    if (playerObjectArray[i].Name.toLowerCase() === playerName.toLowerCase()) {
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

//creates each
const createPlayerComponent = player => {
  const $img = $("<img>");
  $img.attr("src", getImage(player)); //set the players image
  const $row = $("<tr>").addClass("player-data");
  const tdPlayerCard = $("<td>").addClass("player-card");
  const h4Name = $("<h4>").text(player.Name);
  // <tr class="player-data">
  //               <td class='player-card'>
  //               </h4>Antonio Allison
  //                   <h4>

  //                   <img src="images/nfl-arizona-cardinals-team-logo-2-768x768.png" alt=""></td>
  //               <td>Green Bay Packers</td>
  //               <td>WR</td>
  //               <td>stat1</td>
  //               <td>stat1</td>

  //           </tr>
};

$(() => {
  // callAPI(getPlayerData, players => {
  //   const img = $("<img>").attr(
  //     "src",//findPlayerID was changed to findPlayerByName
  //     findPlayerID(players, "David Johnson").PhotoUrl
  //   );
  //   $(".results").append(img);
  //   // console.log(findPlayerID(players, "David Johnson").PhotoUrl);
  // });
});
