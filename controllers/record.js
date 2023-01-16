const RecordService = require("../services/record");
const { Response, Token } = require("../helpers");
const { v4: uuidv4 } = require("uuid");

const recordService = new RecordService();

exports.createRecord = async (req, res) => {
  try {
    const newRecord = await recordService.createRecord(req.body);

    const response = new Response(
      true,
      201,
      "Record created successfully",
      newRecord
    );
    return res.status(response.code).json(response);
  } catch (err) {
    console.log(err);
    const response = new Response(
      false,
      500,
      "An error ocurred, please try again",
      err
    );
    return res.status(response.code).json(response);
  }
};

exports.getRecords = async (req, res) => {
  try {
    const allRecords = await recordService.findRecords();

    const response = new Response(true, 200, "Success", allRecords);
    res.status(response.code).json(response);
  } catch (err) {
    console.log(err);
    const response = new Response(
      false,
      500,
      "An error ocurred, please try again",
      err
    );
    res.status(response.code).json(response);
  }
};
