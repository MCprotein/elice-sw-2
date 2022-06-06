import logo from "./logo.svg";
import "./App.css";

function HeaderTag() {
  return (
    <header>
      <h1>
        <a href="/">Webㄴㄴ</a>
      </h1>
    </header>
  );
}

function Nav(props) {
  console.log(props.data);
  const list = props.data.map((e) => {
    return (
      <li key={e.id}>
        <a href={"/read/" + e.id}>{e.title}</a>
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

function App() {
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
  ];
  return (
    <div>
      <HeaderTag></HeaderTag>
      <Nav data={topics}></Nav>
      <Article title="welcome ho" body="Hello, WEB!"></Article>
    </div>
  );
}

export default App;
