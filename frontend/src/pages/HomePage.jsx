import React from "react";
import Filter from "../components/Filter";
import NoteCardContainer from "../components/NoteCardContainer";

const HomePage = ({ notes, loading, handleFiltertext }) => {
  return (
    <>
      {notes.length < 1 ? "" : <Filter handleFiltertext={handleFiltertext} />}
      <NoteCardContainer notes={notes} loading={loading} />
    </>
  );
};

export default HomePage;
