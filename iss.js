const needle = require(`needle`);

const url = 'https://api.ipify.org?format=json';

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // Check if the response status code is not 200 (OK)
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = body.ip; // Access the IP address
    callback(null, ip); // Return IP via callback
  });
};

const fetchCoordsByIP = function(ip, callback) {
  const url = `https://ipwho.is/${ip}`; // Construct the URL with the provided IP

  // Make the API request
  needle.get(url, (error, response, body) => {
    // Check if there was an error with the request
    if (error) {
      callback(error, null);
      return;
    }


    // Check if the API response indicates success
    if (!body.success) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(message), null);
      return;
    }

    const latitude = body.latitude
    const longitude = body.longitude
    callback(null, { latitude, longitude }); // Pass the data back via callback
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  const url =  `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  // Make the API request
  needle.get(url, (error, response, body) => {
    // Check if there was an error with the request
    if (error) {
      callback(error, null);
      return;
    }

    // Check if the response status code is not 200 (OK)
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS flyover times.`;
      callback(Error(msg), null);
      return;
    }

    // Extract the array of upcoming flyover times from the API response
    const passes = body.response;

    // Call the callback function with no error and the extracted flyover times
    callback(null, passes);
  })
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, location) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(location, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
  
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };