import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import "./Edit.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../AuthContext";

const Edit = (singleBookData) => {
    const [book, setBook] = useState(singleBookData.book);
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
    bookname: book.bookname,
    authorname: book.authorname,
    genre: book.authorname,
    publisher: book.publisher,
    price: book.price,
    language: book.language,
    pagecount: book.pagecount,
    isbn: book.isbn,
    publishdate: book.publishdate,
    description: book.description,
    image: book.image,
    isValid : false,
    userID : book.userID
  });

  useEffect(() => {
    setBook(singleBookData.book);
    setFormData({
      bookname: singleBookData.book.bookname,
      authorname: singleBookData.book.authorname,
      genre: singleBookData.book.authorname,
      publisher: singleBookData.book.publisher,
      price: singleBookData.book.price,
      language: singleBookData.book.language,
      pagecount: singleBookData.book.pagecount,
      isbn: singleBookData.book.isbn,
      publishdate: singleBookData.book.publishdate,
      description: singleBookData.book.description,
      image: singleBookData.book.image,
      isValid: false,
      userID: singleBookData.book.userID
    });
  }, [singleBookData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    console.log("Edit Button clicked", image);
    // Publish Page
    console.log(formData)
    try {
      await axios({
        method: "put",
        url: `http://localhost:3000/edit/${singleBookData.book._id}`,
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
          if (response.data == "Updated") {
            console.log("Book Updated Successfully...!");
            alert("Book Updated Successfully...!");
          }
        })
        .catch((e) => {
          alert("Error Updating Book : ");
        });
    } catch (error) {
      console.log("Error Updating Book : ");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handlePublish}>
          <div className="flex p-10">
            {formData.image ? (
              <div className="image-preview">
                <img src={formData.image} alt="Book Cover" />
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
                {console.log(book)}
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
            Save & Exit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
