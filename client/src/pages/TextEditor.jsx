// import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Quill from 'quill';
import katex from 'katex';
import io from 'socket.io-client';
import hash from 'object-hash';
import { toast } from 'sonner';
import 'quill/dist/quill.snow.css';
import 'katex/dist/katex.min.css';
import './TextEditor.css';
import useAuth from '@/hooks/useAuth';

window.katex = katex;

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ align: [] }, { list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  ["link", "blockquote", "code-block", "formula"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  ["image", "video"],
  ["clean"],
];
const SAVE_INTERVAL = 1000;

function TextEditor() {
  const { id: documentID } = useParams();
  const [quill, setQuill] = useState();
  const [socket, setSocket] = useState();
  const [lastSavedContentHash, setLastSavedContentHash] = useState("");
  const [participants, setParticipants] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const editorRef = useCallback((wrapper) => {
    if (!wrapper) return;

    // Clear out previous quill instance
    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, {
      modules: { toolbar: TOOLBAR_OPTIONS },
      theme: "snow",
    });

    q.disable();
    setQuill(q);
  }, []);

  // Setup socket.io connection
  useEffect(() => {
    const s = io(SOCKET_URL);
    setSocket(s);

    s.on("connect_error", () => {
      toast.error("Connection Error");
    });

    s.on("disconnect", () => {
      toast.warn("Disconnected from server");
    });

    return () => {
      s.disconnect();
    };
  }, []);

  // Load document from server
  useEffect(() => {
    if (!quill || !socket) return;

    const loadDocument = () => {
      socket.emit("get-document", { documentID, token });
    };

    socket.once("load-document", (document) => {
      console.log("Here");
      quill.setContents(document);
      quill.enable();
    });

    // socket.once("error-document-not-found", (err) => {
    //   toast.error("Document not found");
    //   console.log(err);
    // });

    socket.on("error-unauthorized-document-access", (message) => {
      toast.error(message);
    });

    socket.on("error-document-update-failed", (message) => {
      toast.error(message);
    });

    loadDocument();

  }, [quill, socket, documentID, token]);

  // Send quill changes to server
  useEffect(() => {
    if (!quill || !socket) return;

    const handleTextChange = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handleTextChange);
    return () => {
      quill.off("text-change", handleTextChange);
    };
  }, [quill, socket]);

  // Receive quill changes to server
  useEffect(() => {
    if (!quill || !socket) return;

    const handleReceiveChanges = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handleReceiveChanges);

    return () => {
      socket.off("receive-changes", handleReceiveChanges);
    };
  }, [quill, socket]);

  // Autosave document
  useEffect(() => {
    if (!quill || !socket) return;

    const saveDocument = () => {
      const content = quill.getContents();
      const currentContentHash = hash(content);

      if (currentContentHash !== lastSavedContentHash) {
        socket.emit("save-document", content);
        setLastSavedContentHash(currentContentHash);
      }
    };

    const interval = setInterval(saveDocument, SAVE_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, [quill, socket, lastSavedContentHash]);

  return (
      <div id="text-editor" ref={editorRef}></div>
  );
}

export default TextEditor;