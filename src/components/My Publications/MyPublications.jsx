import axios from "axios";
import React, { useEffect, useState } from "react";
import MyBookCard from "./MyBookCard";
import { useAuth } from "../../AuthContext";

import bookCover from "../../assets/bookCover.jpeg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCheckDouble,
  faCheckSquare,
  faCheckToSlot,
  faDeleteLeft,
  faFileCircleCheck,
  faFileEdit,
  faHourglassHalf,
  faIdBadge,
  faInfoCircle,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import Edit from "../Edit/Edit";

function MyPublications({ callingFunction }) {
  const [books, setBooks] = useState([]);
  const [showBook, setShowBook] = useState(false);
  const [singleBookData, setSingleBookData] = useState({});
  const { userID, setUserID } = useAuth();
  const [sortBy, setSortBy] = useState("relevance"); // Default sorting option

  useEffect(() => {
    if (callingFunction === "getBooks") {
      console.log("getBooks", callingFunction);
      axios
        .get(`http://localhost:3000/${callingFunction}`, {
          params: {
            sortBy: sortBy,
          },
        })
        .then((response) => setBooks(response.data))
        .catch((error) => console.error("Error getting books : ", error));
    } else {
      console.log("getUserBooks", callingFunction);
      axios
        .get(`http://localhost:3000/${callingFunction}`, {
          params: {
            userID: userID,
            sortBy: sortBy, // Pass sortBy parameter here
          },
        })
        .then((response) => setBooks(response.data))
        .catch((error) => console.error("Error getting books : ", error));
    }
  }, [singleBookData, sortBy]); // Watch for changes in sortBy state

  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
    setShowBook(false);
  };
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // 3000 milliseconds = 3 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAlert]);

  const clickToPopUp = () => {
    setShowAlert(true);
  };

  const handleDelete = async (book) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete the Book?"
    );
    if (confirmed) {
      try {
        console.log("Deleting", book);
        await axios({
          method: "put",
          url: `http://localhost:3000/delete/${book._id}`,
        })
          .then((response) => {
            if (response.data == "Deleted") {
              console.log("Book Deleted Successfully...!");
              clickToPopUp();
            }
          })
          .catch((e) => {
            alert("Error Deleting Book : ");
          });
      } catch (error) {
        console.log("Error Deleting Book : ");
      }
    } else {
      console.log("User Don't want to delete the Book...!!!");
    }
  };
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="p-5">
      {showAlert && (
        <div className="alert-container flex">
          <div className="alert-content">
            <span>Book Deleted Successfully</span>
          </div>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 p-2"
          ></FontAwesomeIcon>
        </div>
      )}
      {books.length > 0 ? (
        <>
          <h1>Recent Publications</h1>
          <div className="mb-5">
            <label
              htmlFor="sort"
              className="text-lg font-semibold text-gray-800 mr-2 p-3"
            >
              Sort by :
            </label>
            <div className="relative inline-block">
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="sortSelection block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="relevance">Relevance</option>
                <option value="bookname">Book Name</option>
                <option value="authorname">Author Name</option>
                <option value="genre">Genre</option>
                <option value="publisher">Publisher</option>
                <option value="price">Price</option>
                <option value="pagecount">Page Count</option>
                <option value="publishdate">Publish Date</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6l-6 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto whitespace-nowrap cardBackground">
            {books.map((book, number) => {
              return (
                <div className="w-56 inline-flex flex-col m-3 myBookCard">
                  <Link
                    onClick={() => {
                      setShowBook(true);
                      setEditing(false);
                      setSingleBookData(book);
                    }}
                  >
                    <div>
                      <div className="w-auto flex place-content-center">
                        <img src={book?.image} alt={bookCover} />
                      </div>
                      <div className="w-42 m-5">
                        <span className="text-xl pt-4 whitespace-normal">
                          {book?.bookname ?? "Unknown"}
                        </span>
                        <div className="">
                          <span className="flex text-sm place-content-end">
                            <b> &#x20B9; {book?.price ?? 0}</b>
                          </span>
                          <span className="flex text-sm place-content-end">
                            {book?.publishdate ?? ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="flex place-content-evenly">
                    {callingFunction == "getUserBooks" && (
                      <>
                        {book.isValid == true ? (
                          <FontAwesomeIcon
                            className="accept p-2 mb-1 text-white"
                            icon={faFileCircleCheck}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="waiting p-2 mb-1 text-white"
                            icon={faHourglassHalf}
                          />
                        )}
                        <button onClick={handleEdit}>
                          <FontAwesomeIcon
                            onClick={() => setSingleBookData(book)}
                            className="edit p-2 mb-1 text-white"
                            icon={faFileEdit}
                          />
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(book);
                          }}
                        >
                          <FontAwesomeIcon
                            className="waiting p-2 mb-1 text-white"
                            icon={faDeleteLeft}
                          />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h1 className="bgColor text-white searchBar m-10">
          No Publications...
        </h1>
      )}
      {editing && !showBook && <Edit book={singleBookData}></Edit>}
      {showBook && !editing && (
        <>
          <div className="flex p-10">
            <div>
              <img className="w-80 h-auto" src={singleBookData.image} alt="" />
            </div>
            <div className="pl-10 w-full">
              <h1>
                {singleBookData.isValid ? (
                  <FontAwesomeIcon
                    className="text-green-500"
                    icon={faCheckCircle}
                  />
                ) : (
                  <FontAwesomeIcon
                    className="text-red-500"
                    icon={faHourglassHalf}
                  />
                )}{" "}
                {singleBookData.bookname} by <br />
                <p className="text-gray-500 text-4xl m-0">
                  {singleBookData.authorname}
                </p>
              </h1>
              <span
                className="text-2xl font-bold flex m-3"
                style={{ color: "#FF7F50" }}
              >
                {" "}
                &#x20B9;{singleBookData.price}
              </span>
              <div className="book-details">
                <table className="border-collapse w-full">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Title:</strong>
                      </td>
                      <td>{singleBookData.bookname}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Author</strong>
                      </td>
                      <td>{singleBookData.authorname}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Genre</strong>
                      </td>
                      <td>{singleBookData.genre}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Publisher</strong>
                      </td>
                      <td>{singleBookData.publisher}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Language</strong>
                      </td>
                      <td>{singleBookData.language}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Page Count</strong>
                      </td>
                      <td>{singleBookData.pagecount}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ISBN</strong>
                      </td>
                      <td>{singleBookData.isbn}</td>
                    </tr>
                    <tr>
                      <td className="border-none">
                        <strong>Published</strong>
                      </td>
                      <td className="border-none">
                        {singleBookData.publishdate}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="p-10">
            <h1 style={{ color: "#FF7F50" }}>Description</h1>
            <p className="m-1 text-justify">{singleBookData.description}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default MyPublications;
