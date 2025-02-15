import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "./Publish.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../AuthContext";

const Publish = () => {
  const [image, setImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
      formData.image = reader.result;
    };
    reader.onerror = (error) => {
      console.log("Error : ", error);
    };
    console.log(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
  const {userID, setUserID} = useAuth();

  const [formData, setFormData] = useState({
    bookname: "",
    authorname: "",
    genre: "",
    publisher: "",
    price: "",
    language: "",
    pagecount: "",
    isbn: "",
    publishdate: "",
    description: "",
    image: "",
    isValid : false,
    userID : "None"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    console.log("Publish Button clicked", image);
    // Publish Page
    try {
      await axios({
        method: "post",
        url: "http://localhost:3000/publish",
        data: {
          bookname: formData.bookname,
          authorname: formData.authorname,
          genre: formData.genre,
          publisher: formData.publisher,
          price : formData.price,
          language: formData.language,
          pagecount: formData.pagecount,
          isbn: formData.isbn,
          publishdate: formData.publishdate,
          description: formData.description,
          image: formData.image,
          isValid: false,
          userID : userID
        },
      })
        .then((response) => {
          if (response.data == "done") {
            console.log("Book Added Successfully...!");
            alert("Book Added Successfully...!");
            setFormData({
              bookname: "",
              authorname: "",
              genre: "",
              publisher: "",
              price: "",
              language: "",
              pagecount: "",
              isbn: "",
              publishdate: "",
              description: "",
              image: "",
              isValid: false,
              userID: "None"
            });
          }
        })
        .catch((e) => {
          alert("Error Adding Book : ");
        });
    } catch (error) {
      console.log("Error Adding Book : ");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handlePublish}>
          <div className="flex p-10">
            {formData.image ? (
              <div className="image-preview">
                <img src={image} alt="Book Cover" />
                <div {...getRootProps()} className="dropzone">
                  <input {...getInputProps()} />
                  <FontAwesomeIcon
                    className="text-5xl"
                    icon={faFileCirclePlus}
                  ></FontAwesomeIcon>
                  <p>Choose another book cover image here</p>
                </div>
              </div>
            ) : (
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <FontAwesomeIcon
                  className="text-5xl"
                  icon={faFileCirclePlus}
                ></FontAwesomeIcon>
                <p>
                  Drag 'n' drop book cover image here, or click to select image
                </p>
              </div>
            )}

            <div className="pl-10 w-full">
              <h1>
                <input
                  className="p-2"
                  placeholder="Enter Book Name"
                  type="text"
                  id="bookname"
                  name="bookname"
                  value={formData.bookname}
                  onChange={handleChange}
                />
                by <br />
                <p className="text-gray-500 text-4xl m-0">
                  <input
                    className="p-2"
                    placeholder="Enter Author's Name (,)"
                    type="text"
                    id="authorname"
                    name="authorname"
                    value={formData.authorname}
                    onChange={handleChange}
                  />
                </p>
              </h1>
              <div className="book-details mt-10">
                <table className="border-collapse w-full">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Genre</strong>
                      </td>
                      <td>
                        <input
                          className="p-2"
                          placeholder="Enter Genre of the Book"
                          type="text"
                          id="genre"
                          name="genre"
                          value={formData.genre}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Publisher</strong>
                      </td>
                      <td>
                        <input
                          className="p-2"
                          placeholder="Enter Publisher"
                          type="text"
                          id="publisher"
                          name="publisher"
                          value={formData.publisher}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Price</strong>
                      </td>
                      <td>
                        <input
                          className="p-2"
                          placeholder="Enter Price of the Book"
                          type="text"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Language</strong>
                      </td>
                      <td>
                        <input
                          className="p-2"
                          placeholder="Enter Language in which Book is Written"
                          type="text"
                          id="language"
                          name="language"
                          value={formData.language}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Page Count</strong>
                      </td>
                      <td>
                        <input
                          className="p-2"
                          placeholder="Enter Total Number of Pages in the Book"
                          type="text"
                          id="pagecount"
                          name="pagecount"
                          value={formData.pagecount}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ISBN</strong>
                      </td>
                      <td>
                        <input
                          className="p-2"
                          placeholder="Enter ISBN"
                          type="text"
                          id="isbn"
                          name="isbn"
                          value={formData.isbn}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border-none">
                        <strong>Published</strong>
                      </td>
                      <td className="border-none">
                        <input
                          className="p-2"
                          placeholder="Enter Date of Publishing"
                          type="text"
                          id="publishdate"
                          name="publishdate"
                          value={formData.publishdate}
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="p-10 pt-0">
            <h1 style={{ color: "#FF7F50" }}>Description</h1>
            <p className="m-1 text-justify">
              <div className="flex justify-center">
                <textarea
                  className="p-2 w-11/12 h-96"
                  placeholder="Write the Description of the Book"
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </p>
          </div>
          <button type="submit" className="button" style={{width:"300px", marginBottom:"100px"}}>
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Publish;
