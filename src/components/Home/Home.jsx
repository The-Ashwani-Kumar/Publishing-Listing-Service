import React, { useState, useEffect } from "react";
import "./Home.css";
import "../Navbar/Navbar.css";
import bookImage from "../../assets/table.png";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfo,
  faInfoCircle,
  faSearchDollar,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import BookCard from "./BookCard";
import { useAuth } from "../../AuthContext";
import REACT_APP_API_KEY from "../../../API_KEY";
import { Link } from "react-router-dom";
import MyPublications from "../My Publications/MyPublications";

function Home() {
  const { isLogin, setIsLogin } = useAuth();
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [bookData, setBookData] = useState([]);
  const [searchActivated, setSearchActivated] = useState("");
  const { singleBookData, setSingleBookData } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const searchBooks = async (event) => {
    if (event.key === "Enter" || event.type == "click") {
      await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${searchText}&key=${REACT_APP_API_KEY}`
        )
        .then((response) => {
          console.log("Fetching Successfull...");
          setBookData(response.data.items);
          console.log(bookData);
        })
        .catch((error) => console.log(error));
    }
    setSearchActivated(searchText);
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
    if (isLogin == false) {
      setShowAlert(true);
    }
  };

  return (
    <>
      {showAlert && (
        <div className="alert-container flex">
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="p-2"
          ></FontAwesomeIcon>
          <div className="alert-content">
            <span>Please LogIn/SignUp first to Publish your Book</span>
          </div>
        </div>
      )}

      <div className="flex p-10">
        <div className="flex flex-col w-5/6">
          <h1>Welcome To</h1>
          <h1 className="myColor">Reading Arena</h1>
          <p>
            We are thrilled to have you join us in this vibrant community of
            writers, readers, and enthusiasts of the written word. Whether
            you're here to share your own literary creations, discover new
            voices, or engage in lively discussions about the latest books and
            trends, you've come to the right place. Our platform is a
            celebration of creativity and storytelling in all its forms, and
            we're dedicated to providing a welcoming space where ideas flourish
            and connections are made. So, dive in, explore, and let your
            imagination soar as we embark on this literary journey together.
            Welcome aboard!
          </p>
          <button
            className="button w-fit"
            onClick={() => {
              setShow(true);
            }}
            hidden={show}
          >
            Learn More...
          </button>
          <button
            className="button w-fit"
            onClick={() => {
              setShow(false);
            }}
            hidden={!show}
          >
            Read Less...
          </button>
        </div>

        <div>
          <div className="flex searchBar place-content-center">
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

          <img
            className=" flex p-10"
            src={bookImage}
            alt="Error Rendering Book Image"
          />
          <button className="button" onClick={clickToPopUp}>
            {isLogin ? (
              <Link to="/publish">Publish Your Book</Link>
            ) : (
              <>Log in first to Publish Your Book</>
            )}
          </button>
        </div>
      </div>
      {searchActivated.length > 0 && (
        <div className="text-3xl">
          Related to your Search ["{searchText}"]
          <div className="overflow-x-auto whitespace-nowrap">
            {bookData?.map((book, index) => {
              if (index === 1) {
                setSingleBookData(book);
              }
              return <BookCard key={index} bookInfo={book} />;
            })}
          </div>
        </div>
      )}
      <MyPublications callingFunction="getBooks" />
      <div hidden={!show}>
        <div className="text-3xl button">
          We offer a diverse range of publication types to cater to various
          interests and needs :-
        </div>
        <div className="flex-wrap flex place-content-evenly mb-10">
          <Card
            title="Journal Articles"
            description="Dive into the latest research and scholarly discussions with our
        collection of peer-reviewed journal articles covering a wide array of
        topics."
          />
          <Card
            title="Books"
            description="Explore our extensive library of books, spanning fiction, non-fiction, academic texts, and reference works. From timeless classics to contemporary bestsellers, there's something for every reader."
          />
          <Card
            title="Encyclopedias"
            description="Access comprehensive reference materials and expand your knowledge base with our encyclopedias, offering concise yet detailed information on a myriad of subjects."
          />
          <Card
            title="Handbooks"
            description="Find practical guidance and expert insights on specific subjects or industries through our collection of handbooks, designed to be valuable resources for professionals, researchers, and students alike."
          />
          <Card
            title="Dissertations and Student Theses"
            description="Discover groundbreaking research and scholarly contributions from emerging academics with our repository of dissertations and student theses."
          />
          <Card
            title="Research Reports"
            description="Stay informed with our curated selection of research reports, providing in-depth analysis and findings on a wide range of topics, from market trends to social issues."
          />
          <Card
            title="Conference Proceedings"
            description="Stay abreast of the latest developments and emerging trends within various fields through our collection of conference proceedings, showcasing cutting-edge research presented at academic conferences and symposiums."
          />
          <Card
            title="Official Publications"
            description="Access authoritative information on policies, regulations, and official matters with our collection of official publications from governments, international organizations, and regulatory bodies."
          />
        </div>
      </div>
    </>
  );
}

export default Home;
