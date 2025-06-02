exports.handlePathNotFound = (req, res, next) => {
  res.status(404).send({ msg: "Path not found." });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handlesBadRequests = (err, req, res, next) => {
  if (err.code === "42703" || err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request." });
  } else {
    next(err);
  }
};

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error." });
};
