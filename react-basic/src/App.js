import "./App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { Link, Routes, Route, useParams, useNavigate } from "react-router-dom";

function Header(props) {
  return (
    <header className={props.className}>
      <h1>
        <Link
          to="/"
          onClick={(evt) => {
            props.onSelect();
          }}
        >
          WWW
        </Link>
      </h1>
    </header>
  );
}
const HeaderStyled = styled(Header)`
  border-bottom: 1px solid gray;
  color: red;
`;
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}
function Nav(props) {
  const liTags = props.data.map((e) => {
    return (
      <li key={e.id}>
        <Link
          to={"/read/" + e.id}
          onClick={(evt) => {
            props.onSelect(e.id);
          }}
        >
          {e.title}
        </Link>
      </li>
    );
  });
  return (
    <nav>
      <ol>{liTags}</ol>
    </nav>
  );
}
function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          const title = evt.target.title.value;
          const body = evt.target.body.value;
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
function Read(props) {
  const params = useParams();
  const id = Number(params.topic_id);
  const topic = props.topics.filter((e) => {
    if (e.id === id) {
      return true;
    } else {
      return false;
    }
  })[0];
  return <Article title={topic.title} body={topic.body}></Article>;
}
function Control(props) {
  const params = useParams();
  const id = Number(params.topic_id);
  let contextUI = null;
  if (id) {
    contextUI = (
      <>
        <Button variant="outlined">Update</Button>
        <Button
          variant="outlined"
          onClick={() => {
            props.onDelete(id);
          }}
        >
          Delete
        </Button>
      </>
    );
  }
  return (
    <>
      <Button component={Link} to="/create" variant="outlined">
        Create
      </Button>
      {contextUI}
    </>
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
  const navigate = useNavigate();
  return (
    <div>
      <HeaderStyled onSelect={headerHandler()}></HeaderStyled>
      <Nav data={topics} onSelect={navHandler()}></Nav>
      <Routes>
        <Route
          path="/"
          element={<Article title="Welcome" body="Hello, WEB!"></Article>}
        ></Route>
        <Route
          path="/create"
          element={<Create onCreate={onCreateHandler()}></Create>}
        ></Route>
        <Route
          path="/read/:topic_id"
          element={<Read topics={topics}></Read>}
        ></Route>
      </Routes>
      <Routes>
        {["/", "/read/:topic_id", "/update/:topic_id"].map((path) => {
          return (
            <Route
              key={path}
              path={path}
              element={
                <Control
                  onDelete={(id) => {
                    deleteHandler(id);
                  }}
                ></Control>
              }
            ></Route>
          );
        })}
      </Routes>
    </div>
  );
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
    };
  }

  function deleteHandler(id) {
    const newTopics = topics.filter((e) => {
      if (e.id === id) {
        return false;
      } else {
        return true;
      }
    });
    setTopics(newTopics);
    navigate("/");
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
