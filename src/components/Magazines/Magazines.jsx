import { React, useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchDollar,
  faStar,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Magazines.css";
import BookCard from "../Home/BookCard";
import REACT_APP_API_KEY from "../../../API_KEY";


function Magazines() {
  
  const { singleBookData, setSingleBookData } = useAuth();
const [searchData, setSearchData] = useState([]);
const [searchText, setSearchText] = useState("");
const [searchActivated, setSearchActivated] = useState("");

const [categoryData, setCategoryData] = useState({});


  const magazineCategories = [
    "Fashion",
    "Lifestyle",
    "Health",
    "Technology",
    "Science",
    "Travel",
    "Business",
    "Cooking",
    "Sports",
    "Entertainment"
  ];
 
useEffect(() => {
  const fetchData = async () => {
    const categoryPromises = magazineCategories.map(async (category) => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${category}&printType=books&key=${REACT_APP_API_KEY}`
        );
        return {
          category,
          data: response.data.items,
        };
      } catch (error) {
        console.error("Error fetching data for category", category, error);
        return {
          category,
          data: [],
        };
      }
    });

    const resolvedData = await Promise.all(categoryPromises);
    const categoryDataObject = resolvedData.reduce((acc, { category, data }) => {
      acc[category] = data;
      return acc;
    }, {});
    setCategoryData(categoryDataObject);
  };

  fetchData();
}, []);

const searchBooks = async (event) => {
  if (event.key === "Enter" || event.type === "click") {
    if (searchText.length > 0) {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchText}&printType=books&key=${REACT_APP_API_KEY}`
        );
        setSearchData(response.data.items);
        setSearchActivated(searchText);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

return (
  <>
    <div className="flex place-content-center pt-10">
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
    <div>
      {magazineCategories.map((category, index) => (
        <div key={index} className="text-3xl">
          <p className="p-3 m-0 place-content-center flex heading">
          {category}
          </p>
            
          <div className="overflow-x-auto whitespace-nowrap cardBackground">
            {categoryData[category]?.map((book, index) => (
              <BookCard key={index} bookInfo={book} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </>
);
}

export default Magazines;
