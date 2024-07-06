import PropTypes from "prop-types";

export default function Pagination({
  numberOfElement,
  sortedCoins,
  currentPage,
  setCurrentPage,
}) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(sortedCoins.length / numberOfElement); i++) {
    pages.push(i);
  }
  console.log(currentPage);

  return (
    <>
      <div className="flex flex-wrap space-x-1 space-y-1 md:space-y-0  md:space-x-4 items-center justify-center mt-7 md:text-lg">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-2 rounded-md text-white hover:bg-blue-600 ${
              currentPage === page ? "bg-blue-900" : "bg-blue-400"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
}

Pagination.propTypes = {
  numberOfElement: PropTypes.number.isRequired,
  sortedCoins: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
