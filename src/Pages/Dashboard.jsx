import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoins } from "../Feature/coins/CoinSlice";
import Loading from "../Components/Loading";

export default function Dashboard() {
  const [sortedCoins, setSortedCoins] = useState([]);
  const dispatch = useDispatch();
  const coinData = useSelector((state) => state.coin.coins);
  const { isLoading } = useSelector((state) => state.coin);

  useEffect(() => {
    if (!coinData) {
      dispatch(getCoins());
    }
  }, [coinData, dispatch]);

  useEffect(() => {
    if (coinData) {
      // Sort coins by current_price descending
      const sorted = [...coinData].sort(
        (a, b) => b.current_price - a.current_price
      );
      setSortedCoins(sorted);
    }
  }, [coinData]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold my-6">Top 10 cryptocurrencies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedCoins &&
            sortedCoins.slice(0, 9).map((coin) => (
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
    </>
  );
}
