//listen to server port or port 3000 on localhost
module.exports = Object.freeze({
<<<<<<< Upstream, based on 65eaa01592cc6afebca4b8c7fa22d984f7bc0139
    port: parseInt(process.env.PORT || 3000, 10)
  });
  
=======
    port: parseInt(process.env.VCAP_APP_PORT || 3000, 10),
    connectionString : ''
  });
>>>>>>> 66618e0 Bluemix Update
