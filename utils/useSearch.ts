import { useEffect, useState } from "react";

interface Results {
  title: string;
  href: string;
  source: string;
  blurb: string;
}

export default function useSearch(query: string | undefined) {
  const [results, setResults] = useState<Results[]>();
  const [error, setError] = useState();

  useEffect(() => {
    if (query !== undefined) {
      const search = async () => {
        try {
          const response = await fetch(`/api/search?q=${query}`);
          const json = (await response.json()) as Results[];
          setResults(json);
        } catch (err) {
          const error: any = err;
          setError(error);
          console.log(error.toString());
        }
      };
      search();
    }
  }, [query]);

  return { results, error };
}
