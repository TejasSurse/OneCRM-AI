import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

const EmailBuilder = () => {
  const [subject, setSubject] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p>Start creating your email...</p>",
  });

  const exportHTML = () => {
    const html = editor.getHTML();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email-template.html";
    a.click();
  };

  const AI_Insert = (type) => {
    let output = "";

    if (type === "generate") {
      output =
        "<p><strong>🌟 Special Offer Just for You!</strong></p><p>We're excited to announce a limited-time discount on our premium services.</p><p>Reply to this email or click below to learn more.</p>";
    }

    if (type === "improve") {
      const text = editor.getText();
      output =
        `<p><strong>Improved Version:</strong></p><p>${text}</p><p>✨ Polished, engaging and professional.</p>`;
    }

    if (type === "tone") {
      const text = editor.getText();
      output =
        `<p><strong>Friendly Tone:</strong></p><p>Hey! Just wanted to share this update:</p><p>${text}</p><p>Hope this helps 😊</p>`;
    }

    editor.commands.setContent(output);
  };

  if (!editor) return null;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="bg-white shadow-card border border-gray-200 rounded-2xl p-6">

        {/* SUBJECT */}
        <input
          type="text"
          placeholder="Email Subject..."
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 border rounded-xl mb-6 shadow-inner"
        />

        {/* TOP TOOLBAR */}
        <div className="flex flex-wrap gap-3 mb-5">

          <button onClick={() => editor.chain().focus().toggleBold().run()}
            className="px-3 py-1 bg-gray-100 rounded-md">Bold</button>

          <button onClick={() => editor.chain().focus().toggleItalic().run()}
            className="px-3 py-1 bg-gray-100 rounded-md">Italic</button>

          <button onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="px-3 py-1 bg-gray-100 rounded-md">Underline</button>

          <button onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="px-3 py-1 bg-gray-100 rounded-md">• List</button>

          <button onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className="px-3 py-1 bg-gray-100 rounded-md">1. List</button>

          <button onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className="px-3 py-1 bg-gray-100 rounded-md">Left</button>

          <button onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className="px-3 py-1 bg-gray-100 rounded-md">Center</button>

          <button onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className="px-3 py-1 bg-gray-100 rounded-md">Right</button>

          <button
            onClick={() =>
              editor.chain().focus().setImage({ src: prompt("Image URL") }).run()
            }
            className="px-3 py-1 bg-gray-100 rounded-md"
          >
            Image
          </button>

          <button
            onClick={() =>
              editor.chain().focus().setLink({ href: prompt("Enter Link URL") }).run()
            }
            className="px-3 py-1 bg-gray-100 rounded-md"
          >
            Link
          </button>
        </div>

        {/* AI TOOLS */}
        <div className="flex gap-4 mb-5">
          <button
            className="px-4 py-2 bg-primary-600 text-white rounded-xl shadow-card"
            onClick={() => AI_Insert("generate")}
          >
            🤖 Generate Email
          </button>

          <button
            className="px-4 py-2 bg-accent-500 text-white rounded-xl shadow-card"
            onClick={() => AI_Insert("improve")}
          >
            ✨ Improve Text
          </button>

          <button
            className="px-4 py-2 bg-primary-700 text-white rounded-xl shadow-card"
            onClick={() => AI_Insert("tone")}
          >
            😎 Friendly Tone
          </button>
        </div>

        {/* EDITOR */}
        <div className="bg-gray-50 min-h-[300px] p-4 border rounded-xl shadow-inner">
          <EditorContent editor={editor} />
        </div>

        {/* EXPORT */}
        <button
          onClick={exportHTML}
          className="mt-6 px-5 py-3 bg-primary-600 text-white rounded-xl shadow-focus hover:bg-primary-700 transition"
        >
          Export HTML
        </button>
      </div>
    </div>
  );
};

export default EmailBuilder;
