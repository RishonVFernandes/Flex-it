import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { supabase } from '../../services/supabaseClient.ts'

type NoteRow = {
    id: string;
    user_id: string;
    title: string | null;
    content: any;
    created_at: string;
    updated_at: string;
};

const ArchivesPage = () => {

    const [pageWidth, setPageWidth] = useState<number>(200);

    const { id } = useParams<{ id: string }>();
    const [noteId, setNoteId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<"saved" | "saving" | "error">("saved");

    const saveTimer = useRef<number | null>(null);

    const editor = useEditor({
        extensions: [StarterKit],
        content: "",
        editorProps: {
            attributes: {
                class:
                    `w-${pageWidth} min-h-[75vh] border rounded-xl outline-none text-base leading-7`,
            },
        },
        onUpdate: () => {
            triggerAutosave();
        },
    });

    useEffect(() => {
        const init = async () => {
            setLoading(true);

            const { data: authData, error: authErr } = await supabase.auth.getUser();
            if (authErr || !authData.user) {
                console.error("Not logged in");
                setLoading(false);
                return;
            }

            const user = authData.user;

            // Try to fetch latest note
            const { data: notes, error } = await supabase
                .from("notes")
                .select("*")
                .eq("id", id)
                .order("updated_at", { ascending: false })
                .limit(1);

            if (error) {
                console.error(error);
                setLoading(false);
                return;
            }

            // If no note exists -> create one
            if (!notes || notes.length === 0) {
                const { data: created, error: createErr } = await supabase
                    .from("notes")
                    .insert({
                        user_id: user.id,
                        title: "Untitled",
                        content: { type: "doc", content: [] },
                    })
                    .select()
                    .single();

                if (createErr) {
                    console.error(createErr);
                    setLoading(false);
                    return;
                }

                setNoteId(created.id);
                editor?.commands.setContent(created.content);
            } else {
                const note = notes[0] as NoteRow;
                setNoteId(note.id);
                editor?.commands.setContent(note.content);
            }

            setLoading(false);
        };

        if (editor) init();
    }, [editor]);

    const saveToSupabase = async () => {
        if (!editor || !noteId) return;

        setStatus("saving");

        const json = editor.getJSON();

        const { error } = await supabase
            .from("notes")
            .update({ content: json })
            .eq("id", id);

        if (error) {
            console.error(error);
            setStatus("error");
            return;
        }

        setStatus("saved");
    };

    const triggerAutosave = () => {
        if (saveTimer.current) window.clearTimeout(saveTimer.current);

        saveTimer.current = window.setTimeout(() => {
            saveToSupabase();
        }, 800);
    };

    if (loading) return <div style={{ padding: 20 }}>Loading note...</div>;

    return (
        <>
            Archives

            <div className="" style={{ padding: 20, margin: "0 auto" }}>
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Notes</h2>
                        <span style={{ opacity: 0.7 }}>
                            {status === "saving"
                                ? "Saving..."
                                : status === "saved"
                                    ? "Saved"
                                    : "Error saving"}
                        </span>
                    </div>

                    <div className="top fixed bg-white w-100 border border-black-200 rounded" style={{ marginTop: 12, display: "flex", gap: 10 }}>
                        <button onClick={() => editor?.chain().focus().toggleBold().run()}>
                            Bold
                        </button>
                        <button onClick={() => editor?.chain().focus().toggleItalic().run()}>
                            Italic
                        </button>
                        <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>
                            Bullet List
                        </button>
                        <button onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
                            Ordered List
                        </button>
                        <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>
                            Code Block
                        </button>

                        {/* <input type="number" value={pageWidth} onChange={(e)=>{setPageWidth(e.target.value)}}  />
                        {pageWidth} */}
                    </div>
                </div>

                <div className='mt-10 flex justify-center'>
                    <div style={{ marginTop: 20 }}>
                        <EditorContent editor={editor} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArchivesPage;