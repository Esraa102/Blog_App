// eslint-disable-next-line react/prop-types
const Loader = ({ miniLoading }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        miniLoading ? "" : "h-screen"
      } bg-black`}
    >
      <svg
        className="animate-spin h-14 w-14 border-4 border-red rounded-full border-t-transparent"
        viewBox="0 0 24 24"
      ></svg>
    </div>
  );
};

export default Loader;
