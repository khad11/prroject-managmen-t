import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { ProjectFilter } from "../components/ProjectFilter";
import { useSelector } from "react-redux";
import { useState } from "react";
import { tr } from "date-fns/locale";
function Home() {
  const [filter, setFilter] = useState("all");
  const { documents } = useCollection("projects");
  const { user } = useSelector((store) => store.user);

  const changeFilter = (filter) => {
    setFilter(filter);
  };
  const projects = documents
    ? documents.filter((doc) => {
        switch (filter) {
          case "all":
            return true;
          case "mine":
            let assignedToMe = false;
            doc.assignedUsers.forEach((u) => {
              if (u.id == user.uid) assignedToMe = true;
            });
            return assignedToMe;
          case "frontend":
          case "backend":
          case "smm":
          case "mobilograf":
          case "marketing":
            return doc.projectType == filter;
          default:
            return true;
        }
      })
    : null;

  return (
    <div className="flex flex-col items-center px-5 ">
      <h1 className="text-4xl font-bold text-teal-600 mb-10">Dashboard</h1>
      <ProjectFilter changeFilter={changeFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-[1200px]">
        {projects &&
          projects.map((doc) => {
            return (
              <Link
                to={`/about/${doc.id}`}
                key={doc.id}
                className="card bg-base w-full shadow-xl rounded-lg border border-gray-200 overflow-hidden"
              >
                <div className="card-body p-6">
                  <h2 className="card-title text-xl font-semibold  mb-4">
                    {doc.name}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Due Date:{" "}
                    <span className="font-medium text-teal-600">
                      {new Date(doc.dueTo.toDate()).toLocaleDateString()}
                    </span>
                  </p>
                  <hr className="" />
                  <div className="avatar-group -space-x-6 rtl:space-x-reverse ">
                    {doc.assignedUsers.map((u) => {
                      return (
                        <div key={u.photoURL} className="avatar border-none">
                          <div className="w-12">
                            <img src={u.photoURL} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
export default Home;
