import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useState } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const [input, setInput] = useState<string>();

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
        justifyContent: "center",
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
    </div>
  );
};

export default Home;
