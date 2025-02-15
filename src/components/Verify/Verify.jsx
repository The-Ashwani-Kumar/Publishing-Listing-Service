import {React, useState, useEffect} from "react";

import MyBookCard from "../My Publications/MyBookCard";
import { useAuth } from "../../AuthContext";
import axios from "axios";
import VerifyCard from "./VerifyCard";



function Verify() {


  useEffect(() => {
    axios
      .get(`http://localhost:3000/getVerification`)
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error getting books : ", error));
  }, []);


  const [books, setBooks] = useState([]);
  const { singleBookData, setSingleBookData } = useAuth();
  const { userID, setUserID } = useAuth();
  if(books.length==0){
    setSingleBookData("");
  }

  return (
    <div className="p-5">
      {books.length>0 ? <><h1>Recent Publications</h1>
      <div className="overflow-x-auto whitespace-nowrap p-5 scroller">
        {console.log(books)}
        <VerifyCard props={books} />
      </div></> : <h1 className="bgColor text-white searchBar m-10">No Publications...</h1>}
      {singleBookData.bookname && (
        <>
          <div className="flex p-10">
            <div>
              <img className="w-80 h-auto" src={singleBookData.image} alt="" />
            </div>
            <div className="pl-10 w-full">
              <h1>
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

export default Verify;
