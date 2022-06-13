import "./App.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import styled from "styled-components";

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
        <a
          href="/"
          onClick={(evt) => {
            evt.preventDefault();
            console.log(props);
            props.onSelect();
            console.log("evt", evt);
          }}
        >
          Web
        </a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const list = props.data.map((e) => {
    return (
      <li key={e.id}>
        <a
          href={"/read/" + e.id}
          onClick={(evt) => {
            evt.preventDefault();
            props.onSelect(e.id);
          }}
        >
          {e.title}
        </a>
      </li>
    );
  });

  return (
    <nav>
      <ol>{list}</ol>
    </nav>
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
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(3);
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ]);
  function createHandler() {
    alert("create!");
  }
  let content = null;
  if (mode === "WELCOME") {
    content = <Article title="welcome" body="Hello, WEB!"></Article>;
  } else if (mode === "READ") {
    const topic = topics.filter((e) => {
      if (e.id === id) {
        return true;
      } else {
        return false;
      }
    })[0];
    content = <Article title={topic.title} body={topic.body}></Article>;
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = { id: nextId, title, body };
          const newTopics = [...topics, newTopic];
          setTopics(newTopics);
          setId(nextId);
          setMode("READ");
          setNextId((nextId) => nextId + 1);
        }}
      ></Create>
    );
  }
  return (
    <div>
      <HeaderTagStyled
        onSelect={() => {
          setMode("WELCOME");
        }}
      ></HeaderTagStyled>
      <Nav
        data={topics}
        onSelect={(id) => {
          setMode("READ");
          setId(id);
          console.log(mode);
        }}
      />
      {content}
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          variant="outlined"
          onClick={() => {
            setMode("CREATE");
          }}
        >
          Create
        </Button>
        <Button variant="outlined" onClick={() => alert("Update!")}>
          Update
        </Button>
        <Button variant="outlined">Delete</Button>
      </ButtonGroup>
    </div>
  );
}

export default App;
