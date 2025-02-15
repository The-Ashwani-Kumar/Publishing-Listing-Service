import express from "express";
import cors from "cors";
import { logincollection, publishcollection } from "./mongo.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(process.env.REACT_APP_ID);

// Routes
app.post("/", async (request, response) => {
  const { username, email, password, confirmPassword, isLogin } = request.body;
  const data = {
    username: username,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    isLogin: isLogin,
  };
  try {
    const checkData = await logincollection.findOne({ email: email });
    if (data.isLogin) {
      if (checkData) {
        if (checkData.email == email && checkData.password == password) {
          // console.log(import.meta.env.VITE_MY_USER_ID);
          // console.log(import.meta.env.VITE_MY_USER_ID);
          console.log("Successfull Login");
          response.json("successfullLogin");
        } else if (checkData.email != email) {
          response.json("wrongEmail");
        } else if (checkData.password != password) {
          response.json("wrongPassword");
        }
      } else {
        response.json("notPresent");
        console.log("Not Present");
      }
    } else {
      if (!checkData) {
        // import.meta.env.VITE_MY_USER_ID = email;
        console.log("Not Exist : new account");
        console.log(data);
        await logincollection.insertMany([data]);
        console.log(data, " inserted successfully...");
        response.json("notexist");
      } else if (checkData.email == email) {
        response.json("exist");
      }
    }
  } catch (error) {
    console.error("Error inserting values to database : ", error);
  }
});

app.post("/publish", async (request, response) => {
  const {
    bookname,
    authorname,
    genre,
    publisher,
    price,
    language,
    pagecount,
    isbn,
    publishdate,
    description,
    image,
    isValid,
    userID,
  } = request.body;
  const publish_data = {
    bookname: bookname,
    authorname: authorname,
    genre: genre,
    publisher: publisher,
    price: price,
    language: language,
    pagecount: pagecount,
    isbn: isbn,
    publishdate: publishdate,
    description: description,
    image: image,
    isValid: isValid,
    userID: userID,
  };
  try {
    console.log("Received publish data:", publish_data);
    await publishcollection.insertMany([publish_data]);
    console.log("Data inserted successfully");
    response.json("done");
  } catch (error) {
    console.error("Error inserting values to database:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/delete/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const deleteBook = await publishcollection.findByIdAndDelete(
      id
    );
    console.log(deleteBook);
    if (deleteBook) {
      response.json("Deleted");
    } else {
      console.log("Not Deleted");
    }
  } catch (error) {
    console.error("Error Deleting book:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/edit/:id", async (request, response) => {
  const {
    bookname,
    authorname,
    genre,
    publisher,
    price,
    language,
    pagecount,
    isbn,
    publishdate,
    description,
    image,
    isValid,
    userID,
  } = request.body;
  const publish_data = {
    bookname: bookname,
    authorname: authorname,
    genre: genre,
    publisher: publisher,
    price: price,
    language: language,
    pagecount: pagecount,
    isbn: isbn,
    publishdate: publishdate,
    description: description,
    image: image,
    isValid: isValid,
    userID: userID,
  };

  const { id } = request.params;
  try {
    const deleteBook = await publishcollection.findByIdAndDelete(
      id
    );
    console.log(deleteBook);
    if (deleteBook) {
      console.log("Deleted");
    } else {
      console.log("Not Deleted");
    }
    console.log("Received publish data:", publish_data);
    await publishcollection.insertMany([publish_data]);
    console.log("Data Updated successfully");
    response.json("Updated");
  } catch (error) {
    console.error("Error Editing book:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getBooks", (request, response) => {
  const { sortBy } = request.query;
  let sortCriteria = {};

  switch (sortBy) {
    case "bookname":
      sortCriteria = { bookname: 1 }; // Sort by bookname in ascending order
      break;
    case "authorname":
      sortCriteria = { authorname: 1 }; // Sort by authorname in ascending order
      break;
    case "genre":
      sortCriteria = { genre: 1 }; // Sort by genre in ascending order
      break;
    case "publisher":
      sortCriteria = { publisher: 1 }; // Sort by publisher in ascending order
      break;
    case "price":
      sortCriteria = { price: 1 }; // Sort by price in ascending order
      break;
    case "pagecount":
      sortCriteria = { pagecount: 1 }; // Sort by pagecount in ascending order
      break;
    case "publishdate":
      sortCriteria = { publishdate: 1 }; // Sort by publishdate in ascending order
      break;
    default:
      // Default sorting criteria (e.g., newest)
      sortCriteria = { publishdate: -1 }; // Sort by publishdate in descending order (newest first)
      break;
  }

  publishcollection
    .find({ isValid: true })
    .sort(sortCriteria)
    .then((books) => response.json(books))
    .catch((error) => console.log("Error Fetching Books : ", error));
});
app.get("/getVerification", (request, response) => {
  publishcollection
    ?.find({ isValid: false })
    .then((books) => response.json(books))
    .catch((error) => console.log("Error Fetching Books : ", error));
});
app.put("/acceptBook/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBook = await publishcollection.findByIdAndUpdate(
      id,
      { isValid: true }, // Update the isValid field to true
      { new: true } // Return the updated document
    );
    if (updatedBook) {
      res.status(200).json({ message: "Book accepted successfully", book: updatedBook });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error("Error accepting book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/getUserBooks", async (request, response) => {
  const { userID, sortBy } = request.query;
  console.log(request.query);
  console.log(userID);
  
  let sortCriteria = {};

  switch (sortBy) {
    case "bookname":
      sortCriteria = { bookname: 1 }; // Sort by bookname in ascending order
      break;
    case "authorname":
      sortCriteria = { authorname: 1 }; // Sort by authorname in ascending order
      break;
    case "genre":
      sortCriteria = { genre: 1 }; // Sort by genre in ascending order
      break;
    case "publisher":
      sortCriteria = { publisher: 1 }; // Sort by publisher in ascending order
      break;
    case "price":
      sortCriteria = { price: 1 }; // Sort by price in ascending order
      break;
    case "pagecount":
      sortCriteria = { pagecount: 1 }; // Sort by pagecount in ascending order
      break;
    case "publishdate":
      sortCriteria = { publishdate: 1 }; // Sort by publishdate in ascending order
      break;
    default:
      // Default sorting criteria (e.g., newest)
      sortCriteria = { publishdate: -1 }; // Sort by publishdate in descending order (newest first)
      break;
  }

  publishcollection
    .find({ userID: userID })
    .sort(sortCriteria)
    .then((books) => response.json(books))
    .catch((error) => console.log("Error Fetching Books : ", error));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
