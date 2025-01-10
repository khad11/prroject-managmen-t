import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  if (error?.status == 404) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/img.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center p-10 rounded-lg space-y-6">
          <Link
            to="/"
            className="px-6 py-3 btn btn-secondary transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-10 rounded-lg space-y-6">
        <h1 className="text-6xl font-bold text-red-500"> ooPs :(</h1>
        <h2 className="text-3xl font-medium">Something went wrong !</h2>
        <Link
          to="/"
          className="px-6 py-3 btn btn-secondary transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
