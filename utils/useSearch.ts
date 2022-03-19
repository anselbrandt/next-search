import { useEffect, useState } from "react";

interface Results {
  title: string;
  href: string;
  source: string;
  blurb: string;
}

type Query = {
  query?: string;
  nonce?: number;
};

export default function useSearch({ query, nonce }: Query) {
  const [results, setResults] = useState<Results[]>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    if (query !== undefined) {
      const search = async () => {
        try {
          const response = await fetch(`/api/search?q=${query}`);
          if (response.ok) {
            const json = (await response.json()) as Results[];
            setResults(json);
          } else {
            const error = {
              code: response.status,
              message: response.statusText,
            };
            setError(error);
          }
        } catch (err) {
          const error: any = err;
          setError(error);
          console.log(error.toString());
        }
      };
      search();
    }
  }, [nonce]);

  return { results, error };
}
