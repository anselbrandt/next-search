import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import useSearch from "../utils/useSearch";

interface Query {
  query: string;
  nonce: number;
}

const Search: NextPage = () => {
  const router = useRouter();
  const { query } = useRouter();
  const { q } = query;
  const [input, setInput] = useState<string>();
  const [searchQuery, setSearchQuery] = useState<Query | {}>({});
  const { results, error, loading } = useSearch(searchQuery as Query);

  useEffect(() => {
    if (q) {
      setSearchQuery({
        query: q,
        nonce: new Date().getTime(),
      });
    }
  }, [q]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInput(value);
  };

  const handleSubmit = (event: KeyboardEvent) => {
    if (event.key === "Enter" && input) {
      const searchTerms = encodeURIComponent(input);
      router.push(`/search?q=${searchTerms}`);
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: `${loading ? "" : "center"}`,
        alignItems: "center",
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
        {error && (
          <div style={{ margin: "2em" }}>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        )}
        {results &&
          results.map((result, index) => {
            if (!result.blurb) {
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
                  <div color="gray" style={{ fontFamily: "Libre Baskerville" }}>
                    {result.title}
                  </div>
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
                  <div color="gray" style={{ fontFamily: "Libre Baskerville" }}>
                    {result.blurb}
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Search;
