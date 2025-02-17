import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PreviewGames from "../components/PreviewGames";
import { Card, Button } from "@chakra-ui/react";
import Auth from "../utils/auth";

const GameLibrary = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [formState, setFormState] = useState({
    search: "",
  });

  useEffect(() => {
    // Fetch games from the backend
    axios
      .get(
        `https://api.rawg.io/api/games?key=d34ea2467e8445f3b3a5876dd97c80c6&page=${page}`
      )
      .then((response) => setGames(response.data.results))
      .catch((error) => console.error("Error fetching games:", error));
  }, [page]);

  const nextPage = () => {
    // increase page state by one
    setPage(page + 1);

    // Scroll back to the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const previousPage = () => {
    // reduce page state by one
    setPage(page - 1);

    // Scroll back to the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // If searchbar isn't blank, redirect to the appropriate url
    if (formState.search !== "") {
      window.location.href = `/gamelibrary/games/${formState.search}`;
    }

    // make form blank again
    setFormState({ search: "" });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  if (!Auth.loggedIn()) {
    return (
      <div>
        <Card.Root>
          <Card.Body>
            <div>
              <p>You must be logged in to see the game library!</p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Link to="/login">
                  <Button>Go to Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Go to Signup</Button>
                </Link>
              </div>
            </div>
          </Card.Body>
        </Card.Root>
      </div>
    );
  }

  return (
    <div className="game-library">
      <h1 style={{ textAlign: "center" }}>Game Library</h1>
      <form className="game-search" onSubmit={handleFormSubmit}>
        <div style={{ width: "45%" }}>
          <input
            name="search"
            placeholder="Search for games..."
            className="game-search-bar"
            value={formState.search}
            style={{
              color: "white",
              padding: "5px",
              backgroundColor: "black",
              marginRight: "10px",
            }}
            onChange={handleFormChange}
          ></input>
        </div>
        <Button
          className="search-button"
          backgroundColor="blue"
          color="white"
          type="submit"
        >
          Search
        </Button>
      </form>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: "20px",
        }}
      >
        <Button backgroundColor="blue" color="white" onClick={previousPage}>
          Previous page
        </Button>
        <Button backgroundColor="blue" color="white" onClick={nextPage}>
          Next Page
        </Button>
      </div>
      <PreviewGames games={games} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button backgroundColor="blue" color="white" onClick={previousPage}>
          Previous page
        </Button>
        <Button backgroundColor="blue" color="white" onClick={nextPage}>
          Next Page
        </Button>
      </div>
      <div>
        <p>
          All Video Game data provided by{" "}
          <Link to="https://rawg.io/">RAWG API</Link>
        </p>
      </div>
    </div>
  );
};

export default GameLibrary;
