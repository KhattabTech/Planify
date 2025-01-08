import { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { motion } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import "./notebook.css";

const Notebook = () => {
  const [notebooks, setNotebooks] = useState([]);
  const [currentContent, setCurrentContent] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quillRef = useRef(null);

  const colors = [
    "#FFEB7A",
    "#87CEEB",
    "#A9A9F5",
    "#A8F0A4",
    "#FFD39B",
    "#FFB6C1",
  ];

  useEffect(() => {
    const savedNotebooks = localStorage.getItem("notebooks");
    if (savedNotebooks) {
      setNotebooks(JSON.parse(savedNotebooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notebooks", JSON.stringify(notebooks));
  }, [notebooks]);

  const generateRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  const saveNotebook = () => {
    if (currentTitle.trim() === "" || currentContent.trim() === "") {
      alert("Title and content cannot be empty.");
      return;
    }

    const newNotebook = {
      title: currentTitle,
      content: currentContent,
      color: generateRandomColor(),
    };

    if (isEditing) {
      const updatedNotebooks = [...notebooks];
      updatedNotebooks[editingIndex] = newNotebook;
      setNotebooks(updatedNotebooks);
    } else {
      setNotebooks([...notebooks, newNotebook]);
    }

    setCurrentContent("");
    setCurrentTitle("");
    setIsEditing(false);
    setEditingIndex(null);
    quillRef.current?.getEditor().setText("");
    setIsModalOpen(false);
  };

  const editNotebook = (index) => {
    setCurrentTitle(notebooks[index].title);
    setCurrentContent(notebooks[index].content);
    setIsEditing(true);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const deleteNotebook = (index) => {
    setNotebooks(notebooks.filter((_, i) => i !== index));
  };

  const cancelEdit = () => {
    setCurrentContent("");
    setCurrentTitle("");
    setIsEditing(false);
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + "...";
    }
    return content;
  };

  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="notebook-container max-w-4xl mx-auto bg-gray-50 p-6 rounded-xl shadow-md text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        My Notebooks
      </h1>

      <button
        className="p-4 my-5 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        onClick={() => {
          setCurrentContent("");
          setCurrentTitle("");
          setIsEditing(false);
          setIsModalOpen(true);
        }}
      >
        <FaPlus size={27} />
      </button>

      <ul className="list-none mb-6">
        {notebooks.map((notebook, index) => (
          <li key={index} className="mb-4">
            <div
              className="p-4 rounded-tr-2xl shadow hover:bg-gray-200 cursor-pointer relative"
              style={{ backgroundColor: notebook.color }}
              onClick={() => editNotebook(index)}
            >
              <div
                className="corner-fold"
                style={{
                  backgroundColor: darkenColor(notebook.color, -20),
                }}
              ></div>
              <div className="flex justify-between items-center ">
                <h3 className="text-xl font-semibold">{notebook.title}</h3>
                <button
                  className="text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotebook(index);
                  }}
                >
                  <AiOutlineDelete size={20} />
                </button>
              </div>

              <div
                className="text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: truncateContent(notebook.content, 100),
                }}
              />
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-30 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-dark text-black p-6 rounded-2xl shadow-xl w-full sm:w-1/2">
            <h2 className="text-2xl font-semibold mb-4 text-center text-white">
              {isEditing ? "Edit Notebook" : "Create New Notebook"}
            </h2>
            <input
              type="text"
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              placeholder="Enter notebook title"
              className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={currentContent}
              onChange={setCurrentContent}
              modules={modules}
              style={{
                height: "300px",
                marginBottom: "20px",
                border: "1px solid #444",
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: "#1f2937",
                color: "#E0E0E0",
              }}
            />
            <div className="flex justify-between">
              <button
                className="w-28 bg-indigo-500 text-white hover:bg-indigo-600 px-6 py-3 rounded-lg transition duration-300 ease-in-out"
                onClick={saveNotebook}
              >
                Save
              </button>
              <button
                className="w-28 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const darkenColor = (color, percent) => {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const r = (num >> 16) + amt;
  const g = ((num >> 8) & 0x00ff) + amt;
  const b = (num & 0x0000ff) + amt;

  return `#${(
    0x1000000 +
    (r < 255 ? (r < 1 ? 0 : r) : 255) * 0x10000 +
    (g < 255 ? (g < 1 ? 0 : g) : 255) * 0x100 +
    (b < 255 ? (b < 1 ? 0 : b) : 255)
  )
    .toString(16)
    .slice(1)}`;
};

export default Notebook;
