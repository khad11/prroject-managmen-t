import { useSelector } from "react-redux";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import { Form } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";

function Settings() {
  const { isPending } = useSelector((store) => store.user);
  const { user } = useSelector((store) => store.user);

  return (
    <div className="min-h-screen bg-base-200 p-6 flex flex-col items-center ">
      <div className="relative w-full max-w-4xl">
        <div className="h-[200px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-lg"></div>
        <img
          src={user.photoURL}
          alt=""
          className="w-[150px] h-[150px] rounded-full bg-slate-700 border-4 border-white shadow-lg absolute left-1/2 transform -translate-x-1/2 -bottom-12"
        />
      </div>

      <div className="text-center mt-16">
        <h1 className="text-3xl font-bold ">{user.displayName}</h1>
        <p className=" mt-2">{user.email}</p>
      </div>

      <div className="w-full max-w-3xl mt-8 bg-base-200 p-6 rounded-xl shadow-lg border">
        <Form className="flex flex-col gap-4">
          <FormInput
            label="Username"
            type="text"
            placeholder="Enter your username"
          />
          <FormInput
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
        </Form>
      </div>

      <div className="mt-6 w-full max-w-3xl">
        {!isPending ? (
          <button className="w-full bg-accent text-white py-3 rounded-lg hover:bg-purple-700 transition-all">
            Save
          </button>
        ) : (
          <button
            className="w-full bg-accent text-white py-3 rounded-lg cursor-not-allowed opacity-75"
            disabled
          >
            Saving...
          </button>
        )}
      </div>
    </div>
  );
}

export default Settings;
