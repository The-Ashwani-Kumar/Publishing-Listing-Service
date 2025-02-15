import React from "react";
import bookCover from "../../assets/bookCover.jpeg";
import "./Home.css";
import { Link } from "react-router-dom";
import { useAuth } from '../../AuthContext';

function BookCard({ bookInfo }) {
  // Perform nullish coalescing to provide default values
  
  const {singleBookData, setSingleBookData} = useAuth();
  const title = bookInfo?.volumeInfo?.title ?? "Unknown Title";
  const thumbnail = bookInfo?.volumeInfo?.imageLinks?.thumbnail ?? bookCover;
  const currencyCode = bookInfo?.saleInfo?.listPrice?.currencyCode ?? "";
  const amount = bookInfo?.saleInfo?.listPrice?.amount ?? "";
  // setBookData(bookInfo);
  

  return (
    <div className="w-56 inline-flex flex-col m-3 myBookCard">
      <Link onClick={()=>setSingleBookData(bookInfo)} to={"/bookPage"} >
        
        <div className="w-auto flex place-content-center">
          <img src={thumbnail} alt={bookCover} />
        </div>
        <div className="w-42 m-5">
          <span className="text-xl pt-4 whitespace-normal">{title}</span>
          <div className="">
            <span className="flex text-sm place-content-end">
              <b>
                {currencyCode} {amount}
              </b>
            </span>
            <span className="flex text-sm place-content-end">
              {bookInfo?.volumeInfo?.publishedDate ?? ""}
            </span>
          </div>
          {/* <span className='text-sm'>{bookInfo?.volumeInfo?.authors??"-"}</span> */}
          {/* <span className='text-sm description'>{bookInfo?.volumeInfo?.description??"-"}</span> */}
          {/* <span className='text-sm'>{bookInfo?.saleInfo?.listPrice?.amount??"-"}</span> */}
          {/* <span className='text-sm'>{bookInfo?.saleInfo?.listPrice?.amount??"-"}</span> */}
        </div>
      </Link>
    </div>
  );
}

export default BookCard;
