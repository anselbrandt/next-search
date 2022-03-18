import type { NextPage } from "next";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import useSearch from "../utils/useSearch";

const Home: NextPage = () => {
  const [input, setInput] = useState<string>();
  const [query, setQuery] = useState<string>();
  const { results } = useSearch(query);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInput(value);
  };

  const handleSubmit = (event: KeyboardEvent) => {
    if (event.key === "Enter" && input) {
      setQuery(encodeURI(input));
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Libre Baskerville",
      }}
    >
      <div style={{ margin: "1em", fontSize: "16px" }}>
        Google text-only search
      </div>
      <div style={{ margin: "1em" }}>
        <input
          type="search"
          placeholder="search"
          onChange={handleChange}
          onKeyPress={handleSubmit}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          size={28}
          style={{ padding: "4px 10px", fontSize: "18px" }}
        />
      </div>
      <div style={{ maxWidth: "720px" }}>
        {results &&
          results.map((result, index) => {
            if (result.title === result.blurb) {
              return (
                <div key={index} style={{ margin: "2em" }}>
                  <div
                    style={{
                      fontSize: "18px",
                      marginTop: ".25em",
                      marginBottom: ".5em",
                      color: "black",
                    }}
                  >
                    <a href={result.href}>{result.source}</a>
                  </div>
                  <div color="gray">{result.blurb}</div>
                </div>
              );
            } else {
              return (
                <div key={index} style={{ margin: "2em" }}>
                  <div>{result.source}</div>
                  <div
                    style={{
                      fontSize: "18px",
                      marginTop: ".25em",
                      marginBottom: ".5em",
                      color: "black",
                    }}
                  >
                    <a href={result.href}>{result.title}</a>
                  </div>
                  <div color="gray">{result.blurb}</div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Home;
