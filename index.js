// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// const ipAddress = '66.23.99.71';

// const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, nextPasses) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(nextPasses);
});


// fetchCoordsByIP(ipAddress, (error, coordinates) => {
//   if (error) {
//     console.log("Didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned Coords:', coordinates);
// });

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   if (error) {
//     console.log(`Didn't work!`, error);
//     return;
//   }

//   console.log(`It worked! Returned flyover times:`, passTimes);
// });