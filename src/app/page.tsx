"use client";

import AdvocatesTable from '@/app/components/AdvocatesTable';
import {Advocate} from '@/lib/types';
import {ChangeEvent, useEffect, useState} from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;
  const totalPages = Math.ceil(totalCount / pageSize)

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setPage(1)
    await fetchAdvocatesWithSearch(term, 1);
  };

  const fetchAdvocatesWithSearch = async (term: string, pageNum: number) => {
    try {
      const response = await fetch(
        `/api/advocates?searchTerm=${encodeURIComponent(term)}&page=${pageNum}&pageSize=${pageSize}`
      );
      const { data, totalCount } = await response.json();
      setAdvocates(data);
      setTotalCount(totalCount);
    } catch (error) {
      console.error("Error fetching advocates:", error);
    }
    setIsLoading(false);
  };

  const handleReset = async () => {
    setSearchTerm('');
    setPage(1);
    setIsLoading(true);
    await fetchAdvocatesWithSearch('', 1);
  };

  const handleNextPage = async () => {
    const nextPage = page + 1;
    if (nextPage <= totalPages) {
      setPage(nextPage);
      await fetchAdvocatesWithSearch(searchTerm, nextPage);
    }
  }

  const handlePreviousPage = async () => {
    const prevPage = page - 1;
    if (prevPage >= 1) {
      setPage(prevPage);
      await fetchAdvocatesWithSearch(searchTerm, prevPage);
    }
  }

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setTotalCount(jsonResponse.totalCount);
        setIsLoading(false);
      });
    });
  }, []);

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Solace Advocates</h1>

      <div className="mb-6 flex justify-between">
        <div>
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
        <div className="mt-4 flex gap-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <p className="text-sm text-gray-600 self-center">
            Page {page} of {totalPages}
          </p>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      <AdvocatesTable advocates={advocates} isLoading={isLoading} />
    </main>
  );
}
