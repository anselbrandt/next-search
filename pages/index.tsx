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
      <div style={{ margin: "1em" }}>Google text-only search</div>
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
        />
      </div>
      <div style={{ width: "720px" }}>
        {results &&
          results.map((result, index) => (
            <div key={index} style={{ margin: "2em" }}>
              <div>{result.source}</div>
              <div
                style={{
                  fontSize: "18px",
                  marginTop: ".25em",
                  marginBottom: ".5em",
                }}
              >
                <a href={result.href}>{result.title}</a>
              </div>
              <div>{result.blurb}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
