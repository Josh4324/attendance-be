const BookService = require("../services/booking-service");
const cloudinary = require("cloudinary").v2;
const argon2 = require("argon2");
const { Response, Token } = require("../helpers");
const { v4: uuidv4 } = require("uuid");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const bookService = new BookService();

exports.createBook = async (req, res) => {
  try {
    const newBook = await bookService.createBook(req.body);

    const response = new Response(
      true,
      201,
      "Book created successfully",
      newBook
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

exports.getBooks = async (req, res) => {
  try {
    const allBooks = await bookService.findBookings();

    const response = new Response(true, 200, "Success", allBooks);
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
