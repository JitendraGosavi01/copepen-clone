import React, { Fragment, useState, useEffect } from "react";
import "../index.css";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
  <html>
    <body>${html}</body>
    <style>${css}</style>
    <script>${js}</script>
  </html>
  `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js, srcDoc]);
  return (
    <Fragment>
      <div className="pane top-pane">
        <Editor
          displayName="HTML"
          language="xml"
          value={html}
          onChange={setHtml}
        />
        <Editor
          displayName="CSS"
          language="css"
          value={css}
          onChange={setCss}
        />
        <Editor
          displayName="JavaScript"
          language="javascript"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
          srcDoc={srcDoc}
        />
      </div>
    </Fragment>
  );
}

export default App;
