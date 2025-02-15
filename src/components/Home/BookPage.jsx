import { React, useEffect, useState } from "react";
import bookCover from "../../assets/bookCover.jpeg";
import { useAuth } from "../../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchDollar,
  faStar,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import BookCard from "./BookCard";
import "./Home.css";
import REACT_APP_API_KEY from "../../../API_KEY";

function BookPage() {
  const { singleBookData, setSingleBookData } = useAuth();
  const [searchData, setSearchData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchActivated, setSearchActivated] = useState("");

  const title = singleBookData?.volumeInfo?.title ?? "Unknown";
  const thumbnail =
    singleBookData?.volumeInfo?.imageLinks?.thumbnail ?? bookCover;
  const currencyCode = singleBookData?.saleInfo?.listPrice?.currencyCode ?? "";
  const amount = singleBookData?.saleInfo?.listPrice?.amount ?? "0";
  const averageRating = singleBookData?.volumeInfo?.averageRating ?? "0";
  const ratingsCount = singleBookData?.volumeInfo?.ratingsCount ?? "0";
  const author = singleBookData?.volumeInfo?.authors ?? [];
  const authors = author.join(", ");
  const description = singleBookData?.volumeInfo?.description ?? "Unavailable";
  const publisher = singleBookData?.volumeInfo?.publisher ?? "Unknown";
  const publishedDate = singleBookData?.volumeInfo?.publishedDate ?? "Unknown";
  const genre = singleBookData?.volumeInfo?.genre ?? "Unknown";
  const pageCount = singleBookData?.volumeInfo?.pageCount ?? "Unavailable";
  const buyLink = singleBookData?.saleInfo?.buyLink ?? "";
  const isBookAvailable = singleBookData?.accessInfo?.pdf?.isAvailable ?? false;
  const previewLink = singleBookData?.volumeInfo?.previewLink ?? "";
  const language = singleBookData?.volumeInfo?.language ?? "English";
  const isbn_number = singleBookData?.volumeInfo?.industryIdentifiers?.[1]?.identifier ?? "English";

  const searchBooks = async (event) => {
    if (event.key === "Enter" || event.type == "click") {
      if (searchText.length > 0) {
        await axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=${searchText}&key=${REACT_APP_API_KEY}`
          )
          .then((response) => {
            console.log("Fetching Successfull...");
            setSearchData(response.data.items);
          })
          .catch((error) => console.log(error));
      }
    }
    setSearchActivated(searchText);
  };

  const stars = [];
  for (let i = 0; i < averageRating; i++) {
    stars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className="text-yellow-400"
      ></FontAwesomeIcon>
    );
  }

  return (
    <div className="pt-10">
      <div className="flex place-content-center">
        <div className="flex searchBar place-content-center w-1/2">
          <FontAwesomeIcon
            onClick={searchBooks}
            className="cursor-pointer place-content-center flex m-2"
            icon={faSearchDollar}
          />
          <input
            className="border-none"
            type="text"
            placeholder="Search Book of your Choice..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={searchBooks}
          />
        </div>
      </div>

        <>
          <div className="flex p-10">
            <div>
              <img className="w-80 h-auto" src={thumbnail} alt="" />
              <div className="m-10 flex flex-col">
                <a href={buyLink} target="_blank" hidden={!buyLink} className="button">
                  Buy
                </a>
                <a href={previewLink} target="_blank" hidden={!buyLink} className="button">Preview</a>
              </div>
            </div>
            <div className="pl-10 w-full">
              <h1>
                {title} by <br />
                <p className="text-gray-500 text-4xl m-0">{authors}</p>
              </h1>
              <p className="m-0 p-0 flex place-content-center">
                {stars} ({ratingsCount} reviews)
              </p>
              <span className="text-2xl font-bold flex m-3" style={{color:"#FF7F50"}} >
                {" "}
                &#x20B9;{amount}
              </span>
              <div className="book-details">
                <table className="border-collapse w-full">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Title:</strong>
                      </td>
                      <td>{title}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Author</strong>
                      </td>
                      <td>{authors}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Genre</strong>
                      </td>
                      <td>{genre}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Publisher</strong>
                      </td>
                      <td>{publisher}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Language</strong>
                      </td>
                      <td>{language}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Page Count</strong>
                      </td>
                      <td>{pageCount}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ISBN</strong>
                      </td>
                      <td>{isbn_number}</td>
                    </tr>
                    <tr>
                      <td className="border-none">
                        <strong>Published</strong>
                      </td>
                      <td className="border-none">{publishedDate}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="p-10">
            <h1 style={{color:"#FF7F50"}}>Description</h1>
            <p className="m-1 text-justify">
            {description}
            </p>
          </div>
        </>

      <div className="pt-10">
        {searchActivated.length > 0 && (
          <div className="text-3xl">
            Related to your Search ["{searchText}"]
            <div className="overflow-x-auto whitespace-nowrap">
              {searchData?.map((book, index) => (
                <BookCard key={index} bookInfo={book} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookPage;
