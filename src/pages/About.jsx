import { useParams } from "react-router-dom";
import useDocument from "../hooks/useDocument";
import { Timestamp } from "firebase/firestore";
import { useFirestore } from "../hooks/useFirestore";
import { MdOutlineSend } from "react-icons/md";
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

function About() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const { deleteDocument, updateDocument } = useFirestore("projects");
  const { document } = useDocument("projects", id);
  const { user } = useSelector((store) => store.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = {
      id: uuidv4(),
      content,
      createAt: Timestamp.fromDate(new Date()),
      owner: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.uid,
      },
    };

    if (comment.content.trim().length === 0) {
      toast.error("Bosh habar jonatib bolmaydi");
    } else {
      await updateDocument(
        {
          comments: [...document.comments, comment],
        },
        id
      );
      setContent(" ");
    }
  };

  if (!document) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-500">Loading project details...</p>
      </div>
    );
  }
  return (
    <div className="grid lg:grid-cols-2 gap-5 p-4">
      {/* Project Info */}
      <div className="bg-base-200   shadow-lg flex ">
        <div className="card-body space-y-4">
          <h2 className="card-title text-3xl font-semibold uppercase">
            {document.name}
          </h2>
          <h3 className="text-xl italic ">{document.projectType}</h3>
          <hr />
          <p className="w-full p-4 bg-gray-200 text-black rounded-md mt-2">
            {document.description}
          </p>
          {/* Action Buttons */}
          <div className="card-actions justify-center gap-8 ">
            <button
              className="py-2 px-6 bg-success text-white rounded-lg font-medium hover:bg-green-600 transition"
              onClick={() => updateDocument(document.id)}
            >
              Mark as Completed
            </button>
            <button
              className="py-2 px-6 bg-error text-white rounded-lg font-medium hover:bg-red-700 transition"
              onClick={() => deleteDocument(document.id)}
            >
              Delete Project
            </button>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col gap-4 bg-base-200 p-4 rounded-md shadow-md justify-between">
        <h2 className="text-3xl font-semibold">Chat</h2>
        {document.comments.length === 0 ? (
          <p className="text-center my-10 italic text-gray-500">
            No comments yet
          </p>
        ) : (
          <div className="space-y-4 overflow-y-auto max-h-[400px] ">
            {" "}
            {/* Add scroll and limit height */}
            {document.comments.map((comment) => (
              <div
                className={`chat ${
                  user.uid === comment.owner.id ? "chat-end" : "chat-start"
                }`}
                key={comment.id}
              >
                <div className="chat-image avatar">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img alt="User" src={comment.owner.photoURL} />
                  </div>
                </div>

                <div className="chat-bubble max-w-xs bg-teal-500 text-white rounded-lg px-4 py-2">
                  {comment.content}
                </div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label mb-2 text-lg">Message:</label>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="textarea textarea-bordered h-24 p-4 text-lg rounded-lg"
              placeholder="Type your message..."
            ></textarea>
          </div>
          <button className="btn btn-outline btn-info btn-block mt-4 py-3 text-lg flex items-center gap-2">
            Send <MdOutlineSend />
          </button>
        </form>
      </div>
    </div>
  );
}

export default About;
