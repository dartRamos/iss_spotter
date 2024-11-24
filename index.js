const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

const ipAddress = '66.23.99.71';

const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

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

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log(`Didn't work!`, error);
    return;
  }

  console.log(`It worked! Returned flyover times:`, passTimes);
})