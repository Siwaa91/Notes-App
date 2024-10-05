import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import AddNote from "./pages/AddNote";
import NotePage from "./pages/NotePage";
import EditNote from "./pages/EditNote";
import axios from "axios";
import { toast } from "react-toastify";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [searchText, setSearchText] = useState("");

  const handleSearchText = (val) => {
    setSearchText(val);
  };

  useEffect(() => {
    if (searchText.length < 3) return;
    axios
      .get(`http://127.0.0.1:8000/notes-search/?search=${searchText}`)
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [searchText]);
  const handleFiltertext = (val) => {
    setFilterText(val);
  };

  const filterdNotes =
    filterText === "BUSINESS"
      ? notes.filter((note) => note.category === "BUSINESS")
      : filterText === "PERSONAL"
      ? notes.filter((note) => note.category === "PERSONAL")
      : filterText === "IMPORTANT"
      ? notes.filter((note) => note.category === "IMPORTANT")
      : notes;

  useEffect(() => {
    setLoading(true);
    axios.get("http://127.0.0.1:8000/notes/").then((res) => {
      setNotes(res.data);
      setLoading(false);
    });
  }, []);

  const addNote = (data) => {
    axios
      .post("http://127.0.0.1:8000/notes/", data)
      .then((res) => {
        setNotes([...notes, data]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updatedNote = (data, slug) => {
    axios
      .put(`http://127.0.0.1:8000/notes/${slug}/`, data)
      .then((res) => {
        setNotes([...notes, data]);
        toast.success("Note updated successfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteNote = (slug) => {
    axios
      .delete(`http://127.0.0.1:8000/notes/${slug}/`)
      .then((res) => {
        window.location.href("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <MainLayout
            searchText={searchText}
            handelSearchText={handleSearchText}
          />
        }
      >
        <Route
          index
          element={
            <HomePage
              notes={filterdNotes}
              loading={loading}
              handleFiltertext={handleFiltertext}
            />
          }
        />
        <Route path="/add-note" element={<AddNote addNote={addNote} />} />
        <Route
          path="/edit-note/:slug"
          element={<EditNote updatedNote={updatedNote} />}
        />
        <Route
          path="/notes/:slug"
          element={<NotePage deleteNote={deleteNote} />}
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
