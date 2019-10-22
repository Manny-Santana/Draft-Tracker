# Fantasy Player Tracker

### Description: 
The Fantasy player tracker is a project created to aid in decision making with fantasy football teams by presenting vital stats that indicate player performace. Stats that I found most useful to indicate performance for skill positions were Targets by the QB, Rush Attempts and Reception Percentage. 

### Usage: 
To use the application, just click on the link below and begin by inputing the full name of the player you'd like to track, click search (***Note:*** As of this build, simply pressing enter will not search for the player due to the configuration of the buttons used. Please use the search button for now) and it should display the image and stat card of the player you selected. 
    
### Try it: https://manny-santana.github.io/Draft-Tracker/


   ### Technologies Used: 
  	- SportsDataIO NFL API
	- HTML 
	- CSS 
	- Javascript
	- Jquery

### Known Issues / Change log: 
* Player tracking board does not save players as of yet. Future upgades would include a database on the backend to store individual user draft boards and player tracking. 
* The draftboard button on the top right as of right now is solely asthetic. The draftboard is a work in progress at the moment and would be implemented once there is a database on the back end to save individual draft boards to. 
* Load Times of player cards - This issue was addressed in the initial prototyping stage by reducing API requests which improved performance significantly (each player took 4-6 seconds to render, now takes milliseconds when the API response time is ideal). API requests were reduced largely by preloading all players into memory when the page loads and then accessing that data to make other requests. This can be further improved by adding a database that updates both individual player objects and seasondata each week to avoid the possible lengthy response times even further.  
