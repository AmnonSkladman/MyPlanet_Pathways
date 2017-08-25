var vcapServices;

// if running in Bluemix, use the environment variables
if (process.env.VCAP_SERVICES) {
  vcapServices = JSON.parse(process.env.VCAP_SERVICES);
// otherwise use local JSON file
} else {
  try {
    console.log('Using local file')
    vcapServices = require('../VCAP_SERVICES.json');
  } catch (e) {
    console.error(e);
    
  }
}
module.exports = vcapServices;