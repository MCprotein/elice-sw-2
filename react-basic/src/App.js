import "./App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import styled from "styled-components";
import { Link, Routes, Route, useParams } from "react-router-dom";
import { Nav } from "./Nav";

const HeaderTagStyled = styled(HeaderTag)`
  border-bottom: 1px solid gray;
  color: blue;
`;

function HeaderTag(props) {
  const myStyle = {
    borderBottom: "1px solid gray",
    padding: "10px",
    fontSize: "20px",
  };
  return (
    <header className={props.className} style={myStyle}>
      <h1>
        <Link
          to="/"
          onClick={(evt) => {
            // evt.preventDefault();
            console.log(props);
            props.onSelect();
            console.log("evt", evt);
          }}
        >
          Web
        </Link>
      </h1>
    </header>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          alert("submit!");
          const title = evt.target.title.value;
          const body = evt.target.body.value;
          console.log(title, body);
          props.onCreate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title"></input>
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create"></input>
        </p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState("WELCOME"); // todo 삭제 예정
  const [id, setId] = useState(null); // todo 삭제 예정
  const [nextId, setNextId] = useState(3);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ]);

  return (
    <div>
      <HeaderTagStyled onSelect={headerHandler()}></HeaderTagStyled>
      <Nav data={topics} onSelect={navHandler()} />
      <Routes>
        <Route
          path="/"
          element={<Article title="welcome" body="Hello, Web!"></Article>}
        ></Route>
        <Route
          path="/create"
          element={<Create onCreate={onCreateHandler()}></Create>}
        ></Route>
        <Route
          path="/Read/:topicId"
          element={<Read topics={topics}></Read>}
        ></Route>
      </Routes>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          component={Link}
          to="/create"
          variant="outlined"
          onClick={createHandler()}
        >
          Create
        </Button>
        <Button variant="outlined" onClick={() => alert("Update!")}>
          Update
        </Button>
        <Button variant="outlined" onClick={deleteHandler()}>
          Delete
        </Button>
      </ButtonGroup>
    </div>
  );

  function Read({ topics }) {
    const params = useParams();
    const id = Number(params.topicId);
    console.log("params", params);
    const topic = topics.filter((e) => {
      if (e.id === id) {
        return true;
      } else {
        return false;
      }
    })[0];
    return <Article title={topic.title} body={topic.body}></Article>;
  }

  function onCreateHandler() {
    return (title, body) => {
      const newTopic = { id: nextId, title, body };
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
      setId(nextId);
      setMode("READ");
      setNextId(nextId + 1);
    };
  }

  function navHandler() {
    return (id) => {
      setMode("READ");
      setId(id);
      console.log(mode);
    };
  }

  function deleteHandler() {
    return () => {
      const newTopics = topics.filter((e) => {
        if (e.id === id) {
          return false;
        } else {
          return true;
        }
      });
      setTopics(newTopics);
      setMode("WELCOME");
    };
  }

  function createHandler() {
    return () => {
      setMode("CREATE");
    };
  }

  function headerHandler() {
    return () => {
      setMode("WELCOME");
    };
  }
}

export default App;
