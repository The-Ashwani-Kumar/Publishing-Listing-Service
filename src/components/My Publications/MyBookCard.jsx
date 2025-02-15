import React, { useState } from "react";
import bookCover from "../../assets/bookCover.jpeg";
import "./index.css";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBatteryEmpty,
  faCheck,
  faDeleteLeft,
  faEraser,
  faFileCircleCheck,
  faFileEdit,
  faFileShield,
  faHourglass,
  faHourglassHalf,
  faRecycle,
  faRemove,
  faRemoveFormat,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";

function MyBookCard({ props }) {
  const { singleBookData, setSingleBookData } = useAuth();

  return (
    <>
      {props.map((book, number) => {
        return (
          <div className="w-56 inline-flex flex-col m-3 myBookCard">
            <Link onClick={() => setSingleBookData(book)}>
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
              <button>
                <FontAwesomeIcon
                  className="edit p-2 mb-1 text-white"
                  icon={faFileEdit}
                />
              </button>

              <button>
                <FontAwesomeIcon
                  className="waiting p-2 mb-1 text-white"
                  icon={faDeleteLeft}
                />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default MyBookCard;
