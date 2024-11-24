const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

// fetchMyIP()
//   .then((response) => console.log(response))

// fetchMyIP()
//   .then((ip) => fetchCoordsByIP(ip))
//   .then((body) => console.log(body));


// fetchMyIP()
//   .then((ip) => fetchCoordsByIP(ip))
//   .then((coords) => fetchISSFlyOverTimes(coords))
//   .then((body) => console.log(body));

  nextISSTimesForMyLocation()
    .then((passTimes) => {
      printPassTimes(passTimes);
    })
    .catch((error) => {
      console.log("It didn't work: ", error.message);
    });