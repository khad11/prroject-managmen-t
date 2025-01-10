import { useCollection } from "../hooks/useCollection";

function OnlineUsers() {
  const { documents } = useCollection("users");

  return (
    <div className="bg-gradient-to-b from-slate-800 to-slate-600 min-h-screen p-10 rounded-tl-2xl rounded-bl-2xl text-white shadow-xl">
      <div className="w-[240px] mx-auto">
        <h1 className="mb-8 text-center text-2xl font-bold tracking-wide">
          Online Users
        </h1>
        <ul className="space-y-3">
          {documents &&
            documents.map((doc) => (
              <li
                key={doc.id}
                className={`flex items-center gap-4 p-4 rounded-lg shadow-lg ${
                  doc.online
                    ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
                    : "bg-gradient-to-r from-red-400 via-red-500 to-red-600"
                }`}
              >
                <div className="relative">
                  <img
                    src={doc.photoURL}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full border-2 border-white"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                      doc.online ? "bg-green-300" : "bg-red-400"
                    }`}
                  ></span>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{doc.displayName}</p>
                  <p className="text-sm italic opacity-80">
                    {doc.online ? "Currently:  Online" : "Currently: Offline"}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default OnlineUsers;
