import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Books from "./components/Books/Books.jsx";
import Magazines from "./components/Magazines/Magazines.jsx";
import Contact from "./components/Contact/Contact.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import BookPage from "./components/Home/BookPage.jsx";
import Publish from "./components/Publish/Publish.jsx";
import MyPublications from "./components/My Publications/MyPublications.jsx";
import Admin from "./components/Admin/Admin.jsx";
import Verify from "./components/Verify/Verify.jsx";

// const router = createBrowserRouter([
//   {
//     path : '/',
//     element : <App/>,
//     children : [
//       {
//         path : '',
//         element : <Home/>
//       },
//       {
//         path : 'journal',
//         element : <Journal/>
//       },
//       {
//         path : 'books',
//         element : <Books/>
//       },
//       {
//         path : 'encyclopedias',
//         element : <Encyclopedias/>
//       },
//       {
//         path : 'handbooks',
//         element : <Handbooks/>
//       },
//       {
//         path : 'dissertations',
//         element : <Dissertations/>
//       },
//       {
//         path : 'research',
//         element : <Research/>
//       },
//       {
//         path : 'contact',
//         element : <Contact/>
//       }
//     ]
//   }
// ])

// console.log(process.env.REACT_APP_USER_ID);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />}></Route>
      <Route path="books" element={<Books />}></Route>
      <Route path="magazines" element={<Magazines />}></Route>
      <Route path="contact" element={<Contact />}></Route>
      <Route path="signup" element={<SignUp />}></Route>
      <Route path="bookPage" element={<BookPage />}></Route>
      <Route path="publish" element={<Publish />}></Route>
      <Route path="myPublications" element={<MyPublications callingFunction="getUserBooks" />}></Route>
      <Route path="admin" element={<Admin />}></Route>
      <Route path="verifyBooks" element={<Verify />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
