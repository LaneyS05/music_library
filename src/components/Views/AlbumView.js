// These components will be making separate API calls from the app
// component to serve specific data about a given album
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AlbumView() {
  const [albumData, setAlbumData] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:4000/song/${id}`;
      const responce = await fetch(url);
      const data = await responce.json();

      const songs = data.results.filter((item) => item.wrapperType === "track");
      setAlbumData(songs);
    };
    fetchData();
  }, [id]);

  const songsDisplay = albumData.map((songs) => {
    return (
      <div key={songs.trackId}>
        <p>{songs.trackName}</p>
      </div>
    );
  });

  const navButton = () => {
    return (
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    );
  };

  return (
    <div>
      {navButton()}
      <p>Album Data Goes Here!</p>
      <p>ID: {id}</p>
      {songsDisplay}
    </div>
  );
}

export default AlbumView;
