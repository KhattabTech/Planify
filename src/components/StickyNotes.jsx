import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";
import { CiStickyNote } from "react-icons/ci";
import { motion } from "framer-motion";
import "../App.css";

const StickyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNoteIndex, setActiveNoteIndex] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#FFD700");

  const colors = [
    "#FFEB7A",
    "#87CEEB",
    "#A9A9F5",
    "#A8F0A4",
    "#FFD39B",
    "#FFB6C1",
  ];

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

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("stickyNotes"));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("stickyNotes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([
        ...notes,
        {
          text: newNote,
          id: Date.now(),
          color: selectedColor,
          date: formatDate(new Date()),
        },
      ]);
      setNewNote("");
      setSelectedColor(colors[0]);
      setIsModalOpen(false);
    }
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  const handleEditNote = (index) => {
    setActiveNoteIndex(index);
    setNewNote(notes[index].text);
    setSelectedColor(notes[index].color);
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (newNote.trim()) {
      setNotes(
        notes.map((note, index) =>
          index === activeNoteIndex
            ? { ...note, text: newNote, color: selectedColor }
            : note
        )
      );
      setNewNote("");
      setSelectedColor(colors[0]);
      setActiveNoteIndex(null);
      setIsModalOpen(false);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedNotes = Array.from(notes);
    const [movedNote] = reorderedNotes.splice(result.source.index, 1);
    reorderedNotes.splice(result.destination.index, 0, movedNote);

    setNotes(reorderedNotes);
  };

  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="sticky-notes-container flex flex-wrap gap-6 p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="notes" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-wrap gap-6"
            >
              {notes.map((note, index) => (
                <Draggable
                  key={note.id}
                  draggableId={note.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <motion.div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="sticky-note shadow-lg rounded-2xl p-6 relative cursor-pointer"
                      style={{ backgroundColor: note.color }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => handleEditNote(index)}
                    >
                      <div
                        className="corner-fold"
                        style={{
                          backgroundColor: darkenColor(note.color, -20),
                        }}
                      ></div>
                      <div className="text-lg text-[#333]">{note.text}</div>
                      <small className="text-xs text-gray-700">
                        {note.date}
                      </small>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNote(index);
                        }}
                        className="absolute top-2 left-2 text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </motion.div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300"
        whileTap={{ scale: 0.95 }}
      >
        <CiStickyNote size={27} />
      </motion.button>

      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-2xl font-bold mb-4 text-center">
              {activeNoteIndex === null ? "Add New Note" : "Edit Note"}
            </h3>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="w-full h-32 p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your note"
            />
            <div className="flex justify-center gap-2 mb-4">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor === color ? "border-white" : "border-gray-600"
                  }`}
                  style={{ backgroundColor: color }}
                ></button>
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={
                  activeNoteIndex === null ? handleAddNote : handleSaveEdit
                }
                disabled={!newNote.trim()}
                className="w-full px-4 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600"
              >
                {activeNoteIndex === null ? "Add Note" : "Save Note"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
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

export default StickyNotes;
