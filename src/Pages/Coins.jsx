import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoins } from "../Feature/coins/CoinSlice";
// import Loading from "../Components/Loading";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Pagination from "../Components/Pagination";

export default function Coins() {
  const [sortedCoins, setSortedCoins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [startPrice, setStartPrice] = useState();
  const [endPrice, setEndPrice] = useState();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfElement] = useState(9);

  const lastPageIndex = currentPage * numberOfElement;
  const currentPageIndex = lastPageIndex - numberOfElement;

  const dispatch = useDispatch();
  const coinData = useSelector((state) => state.coin.coins);
  // const { isLoading } = useSelector((state) => state.coin);

  useEffect(() => {
    if (!coinData) {
      dispatch(getCoins());
    }
  }, [coinData, dispatch]);

  // Combined sorting and filtering logic
  useEffect(() => {
    if (coinData) {
      // Filter coins based on search query and price range
      const filteredCoins = coinData.filter((coin) => {
        const matchesSearchQuery =
          coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());

        const withinPriceRange =
          (!startPrice || coin.current_price >= parseFloat(startPrice)) &&
          (!endPrice || coin.current_price <= parseFloat(endPrice));

        return matchesSearchQuery && withinPriceRange;
      });
      // Sort filtered coins by current_price based on sortOrder
      const sorted = [...filteredCoins].sort((a, b) => {
        if (sortOrder === "asc") {
          return a.current_price - b.current_price;
        } else {
          return b.current_price - a.current_price;
        }
      });
      setSortedCoins(sorted);
    }
  }, [coinData, searchQuery, sortOrder, startPrice, endPrice]);

  const handleOnSearch = (string) => {
    setSearchQuery(string);
  };

  const handleOnSelect = (item) => {
    setSearchQuery(item.name);
  };

  const formatResult = (item) => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{item.name}</span>
        <span className="hidden md:block">{item.symbol.toUpperCase()}</span>
      </div>
    );
  };

  return (
    <>
      {/* {isLoading && <Loading />} */}
      <div className="container mx-auto px-4">
        <div className="space-y-3 md:bg-slate-700 md:p-6 rounded-2xl md:flex space-x-3">
          <ReactSearchAutocomplete
            className="w-[90%]"
            items={coinData || []}
            fuseOptions={{ keys: ["name", "symbol"] }}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
            styling={{
              zIndex: 2,
              backgroundColor: "white",
              color: "#000",
              border: "1px solid black",
              borderRadius: "8px",
              padding: "8px",
              fontSize: "16px",
              hoverBackgroundColor: "#e8f0fe",
            }}
          />

          <select
            className="p-2 rounded-xl  md:rounded-2xl w-[50%] md:w-[10%] md:text-center"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="mt-5 space-x-0 md:space-x-7">
          <input
            type="number"
            placeholder="Start Price"
            value={startPrice}
            onChange={(e) => setStartPrice(e.target.value)}
            className="p-2 rounded-xl  md:rounded-2xl w-[50%] md:w-[30%] md:px-3 border-2 "
          />
          <input
            type="number"
            placeholder="End Price"
            value={endPrice}
            onChange={(e) => setEndPrice(e.target.value)}
            className="p-2 rounded-xl  md:rounded-2xl w-[50%] md:w-[30%] md:px-3 border-2"
          />
        </div>
        <h1 className="text-3xl font-bold my-6">Coins List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCoins &&
            sortedCoins.slice(currentPageIndex, lastPageIndex).map((coin) => (
              <div
                key={coin.id}
                className="bg-slate-100 rounded-lg shadow-2xl p-4 flex flex-col md:flex-row items-start md:items-center hover:bg-stone-300"
              >
                {/* Left side with symbol image */}
                <div className="flex-shrink-0 bg-blue-500 text-white rounded-full h-12 w-12 flex items-center justify-center overflow-hidden">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Right side with coin details */}
                <div className="md:ml-4 mt-4 md:mt-0">
                  <h2 className="text-lg font-semibold">
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </h2>
                  <p className="text-gray-600 mb-2">
                    ₹{coin.current_price.toLocaleString()}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1">
                      <p className="font-semibold">Market Cap:</p>
                      <p>₹{coin.market_cap.toLocaleString()}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Total Volume:</p>
                      <p>₹{coin.total_volume.toLocaleString()}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">24h Change:</p>
                      <p
                        className={
                          coin.price_change_24h < 0
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        {coin.price_change_24h.toLocaleString()} (
                        {coin.price_change_percentage_24h.toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Last updated:{" "}
                      {new Date(coin.last_updated).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Pagination
        numberOfElement={numberOfElement}
        sortedCoins={sortedCoins}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
