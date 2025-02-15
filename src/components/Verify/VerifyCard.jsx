import React, { useState } from "react";
import bookCover from "../../assets/bookCover.jpeg";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

function VerifyCard({ props }) {
  const { singleBookData, setSingleBookData } = useAuth();
  const [acceptedMap, setAcceptedMap] = useState({}); // Maintain a map of accepted books

  const onAccepted = (id) => {
    axios
      .put(`http://localhost:3000/acceptBook/${id}`, { isValid: true }) // Send PUT request to update isValid field
      .then((response) => {
        console.log("Book accepted successfully");
        setAcceptedMap({ ...acceptedMap, [id]: true }); // Update the accepted status for this book
      })
      .catch((error) => console.error("Error accepting book: ", error));
  };

  return (
    <>
      {props.map((book, number) => {
        const isAccepted = acceptedMap[book._id]; // Check if this book is accepted
        return (
          <Link key={book._id} onClick={() => setSingleBookData(book)}>
            <div className="w-56 inline-flex flex-col m-3 myBookCard">
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
              {book.isValid == false && (
                <button
                  className="accept p-2 mb-1 text-white"
                  onClick={() => onAccepted(book._id)}
                  disabled={isAccepted} // Disable the button if book is already accepted
                >
                  {isAccepted ? "Accepted" : "Accept"}
                </button>
              )}
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default VerifyCard;
