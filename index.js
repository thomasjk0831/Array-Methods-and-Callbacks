import { fifaData } from './fifa.js';
//console.log(fifaData);

console.log('its working');

// ⚽️ M  V P ⚽️ //

 //Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

//(a) Home Team name for 2014 world cup final
const Arr = fifaData.filter(value=> {return value["Year"] === 2014 && value["Stage"] === "Final"} )
console.log(Arr[0]["Home Team Name"])

//(b) Away Team name for 2014 world cup final
console.log(Arr[0]["Away Team Name"])
//(c) Home Team goals for 2014 world cup final
console.log(Arr[0]["Home Team Goals"])
//(d) Away Team goals for 2014 world cup final
console.log(Arr[0]["Away Team Goals"])
//(e) Winner of 2014 world cup final 
if(Arr[0]["Home Team Goals"] > Arr[0]["Away Team Goals"])
console.log(Arr[0]["Home Team Name"])
else
console.log(Arr[0]["Away Team Name"])


/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {

    /* code here */
    return data.filter(value=>{ return value.Stage === 'Final'});
    
};

//console.log(getFinals(fifaData))

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(getFinals, data) {

    /* code here */
    const FinalsArray = getFinals(data);
    const years = FinalsArray.map(value=>{
        return { "Year" : value.Year}
    });

    return years;
};

//console.log(getYears(getFinals, fifaData))



/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(getFinals, data) {

    /* code here */
    const tempArray = getFinals(data);
    const winners = tempArray.map(value => {
        //temp variable contains who won in case of draw
        const temp = value["Win conditions"].split(" ")

        if(value["Home Team Goals"] > value["Away Team Goals"])
        return { "Winner" : value["Home Team Name"]}
        else if(value["Away Team Goals"] > value["Home Team Goals"])
        return { "Winner" : value["Away Team Name"]}
        else
        return { "Winner": temp[0]}
        
    })
    return winners;
};

// console.log(getWinners(getFinals, fifaData))


/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(getWinners, getYears, data) {
        const tempWinners = getWinners(getFinals, data);
        const tempYears = getYears(getFinals, data);

        for(let i=0; i<tempYears.length; i++)
            console.log("In " + tempYears[i].Year + ", " +tempWinners[i].Winner + " won the World Cup")
        
};


//getWinnersByYear(getWinners, getYears, fifaData);

/* Task 7: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {

    /* code here */
    
    const Goals = data.reduce( (accumulator, item) => {
        return accumulator + item["Home Team Goals"] + item["Away Team Goals"]
    }, 0)
    
    return Goals/data.length;
    
};

//console.log(getAverageGoals(fifaData))

/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {

    /* code here */
    //filters out only homegames involving 'teamInitals'
    let wins = 0;
    const homeGames = data.filter(value=> 
        { return teamInitials === value["Home Team Initials"] } )
    //filters out only awaygames involving 'teamInitals'
    const awayGames = data.filter(value=> 
        { return teamInitials === value["Away Team Initials"] } )

    wins = homeGames.reduce( (accumulator, item) => {
        if(item["Home Team Goals"] > item["Away Team Goals"])
        return accumulator + 1;
        else 
        return accumulator
    },0)

    wins += awayGames.reduce( (accumulator, item) => {
        if(item["Home Team Goals"] < item["Away Team Goals"])
        return accumulator + 1;
        else 
        return accumulator
    },0)

    return wins;    
};

console.log(getCountryWins(fifaData, "BRA"));


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data, getFinals,getTeamsFinal) {

    /* code here */
    //create an array of objects that contain all world cup finals game
    const finalArray = getFinals(data)
    
    //create an array of objects that contain teams that appeared in the final. 
    // i.e [{"Team Name": Uruguay}, {Team Name: "Argentina"}...]
    let arrayTeams = getTeamsFinal(finalArray);
    
    //add to arrayTeams objects #of appearances by team 
    for(let i=0; i<arrayTeams.length; i++){
       let appearances = finalArray.reduce( (accumulator, value)=> {
            if( value["Home Team Name"] === arrayTeams[i]["Team Name"] || value["Away Team Name"] === arrayTeams[i]["Team Name"] )
            return accumulator + 1;
            else
            return accumulator;

        },0)

        arrayTeams[i]["Appearances"] = appearances;
    }
    
    //add to arrayTeams objects #of goals by team 
    for(let i=0; i<arrayTeams.length; i++){
        let goals = finalArray.reduce( (accumulator, value)=> {
             if( value["Home Team Name"] === arrayTeams[i]["Team Name"]) 
             return accumulator + value["Home Team Goals"];
             else if( value["Away Team Name"] === arrayTeams[i]["Team Name"] )
             return accumulator + value["Away Team Goals"];
             else
             return accumulator;
             
 
         },0)
 
         arrayTeams[i]["Goals"] = goals;
     }

    //determine the team with the biggest goals per apperances
    let biggest = 0;
    let index;
    for(let i=0; i < arrayTeams.length; i++){
        if(arrayTeams[i]["Goals"]/ arrayTeams[i]["Appearances"] > biggest){
        biggest = arrayTeams[i]["Goals"]/ arrayTeams[i]["Appearances"]
        index = i;

    }
    
    return arrayTeams[i]["Team Name"]
}

}


console.log(getGoals(fifaData, getFinals, getTeamsFinal))

//Return an array of objects that contain teams that appeared in the final. 
//i.e [{"Team Name": Uruguay}, {Team Name: "Argentina"}...]
function getTeamsFinal(finalArray){
    let arrayTeams = [];

    let homeTeamExists = false;
    let awayTeamExists = false;
    for(let i=0; i<finalArray.length; i++){
        homeTeamExists = false;
        awayTeamExists = false;
        for(let j =0; j<arrayTeams.length; j++){
            if(arrayTeams[j]["Team Name"] === finalArray[i]["Home Team Name"]){
                homeTeamExists = true;
            }
            if(arrayTeams[j]["Team Name"] === finalArray[i]["Away Team Name"]){
                awayTeamExists = true;
            }

        }
        
        if(!homeTeamExists){
        arrayTeams.push( { "Team Name" : finalArray[i]["Home Team Name"]} );
        
        }
        if(!awayTeamExists){
        arrayTeams.push( { "Team Name" : finalArray[i]["Away Team Name"]} );
        
        }
    }
    
    return arrayTeams;
}


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data, getFinals, getTeamsFinal) {

    /* code here */
    //create an array of objects that contain all finals matches
    const aFinalsArray = getFinals(data)
    
    //create an array of objects that contain all teams that have been to the finals
    //i.e [{"Team Name": Uruguay}, {Team Name: "Argentina"}...]
    const teamsFinal = getTeamsFinal(aFinalsArray)
    
    
    //add to teamsFinal objects #apperances per team
    for(let i=0; i<teamsFinal.length; i++){
        let appearances = aFinalsArray.reduce( (accumulator, value)=> {
             if( value["Home Team Name"] === teamsFinal[i]["Team Name"] || value["Away Team Name"] === teamsFinal[i]["Team Name"] )
             return accumulator + 1;
             else
             return accumulator;
 
         },0)
 
         teamsFinal[i]["Appearances"] = appearances;
     }

     //add to teamsFinal objects #goalsAgainst per team
     for(let i=0; i<teamsFinal.length;i++){
         let goalsAgainst = aFinalsArray.reduce( (accumulator, value)=> {
             if( value["Home Team Name"] === teamsFinal[i]["Team Name"])
             return accumulator + aFinalsArray[i]["Away Team Goals"];
             else if ( value["Away Team Name"] === teamsFinal[i]["Team Name"])
             return accumulator + aFinalsArray[i]["Home Team Goals"];
             else
             return accumulator;
         },0)
         teamsFinal[i]["Goals Against"] = goalsAgainst; 
     }

     console.log(teamsFinal)

     //find the team with the biggest goals against in teamsFinal array
     let biggest = 0;
    let index;
    for(let i=0; i < teamsFinal.length; i++){
        if(teamsFinal[i]["Goals Against"]/ teamsFinal[i]["Appearances"] > biggest){
        biggest = teamsFinal[i]["Goals Against"]/ teamsFinal[i]["Appearances"]
        index = i;

    }
}
    
    return teamsFinal[index]["Team Name"]
    
};

console.log(badDefense(fifaData, getFinals, getTeamsFinal));

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
