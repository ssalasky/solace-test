"use client";

import AdvocatesTable from '@/components/AdvocatesTable';
import {Advocate} from '@/lib/types';
import {ChangeEvent, useEffect, useState} from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    await fetchAdvocatesWithSearch(term);
  };

  const fetchAdvocatesWithSearch = async (term: string) => {
    try {
      const response = await fetch(
        `/api/advocates?searchTerm=${term}`
      );
      const { data } = await response.json();
      setAdvocates(data);
    } catch (error) {
      console.error("Error fetching advocates:", error);
    }
    setIsLoading(false);
  };

  const handleReset = async () => {
    setSearchTerm('');
    setIsLoading(true);
    await fetchAdvocatesWithSearch('');
  };

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setIsLoading(false);
      });
    });
  }, []);

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Solace Advocates</h1>

      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
          Search
        </label>
        <div className="flex gap-4 mt-2">
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search advocates..."
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Reset Search
          </button>
        </div>
        {searchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            Searching for: <span className="font-medium">{searchTerm}</span>
          </p>
        )}
      </div>
      <AdvocatesTable advocates={advocates} isLoading={isLoading} />
    </main>
  );
}
