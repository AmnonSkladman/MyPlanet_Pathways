//listen to server port or port 3000 on localhost
module.exports = Object.freeze({
    port: parseInt(process.env.PORT || 3000, 10)
  });
  
