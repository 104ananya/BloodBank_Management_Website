const testController = (req, res) => {
  res.status(200).send({
    message: "test route",
    success: true,
  });
};

module.exports = { testController };    // we are using ES 5 heance this module.export
