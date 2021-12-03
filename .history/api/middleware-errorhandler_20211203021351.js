function errorHandling(err, req, res, next) {
    res.status(err.satus || 500).json({
      message: `unknown error occured: ${err.message}`,
      stack: err.stack,
    });
  }

module.exports = err