import { useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";

type Note = {
    id: string;
    title: string | null;
    created_at: string;
    updated_at: string;
};

const ArchivesList = () => {

    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchArchives = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from("notes")
            .select("id, title, created_at, updated_at")
            .order("updated_at", { ascending: false });

        if (error) {
            console.error(error);
            alert("Failed to load notes");
            setLoading(false);
            return;
        }

        setNotes(data ?? []);
        setLoading(false);
        console.log(notes);
    }

    useEffect(() => {
        fetchArchives();
    }, []);

    const createArchive = async () => {

        const { data, error } = await supabase
            .from("notes")
            .insert({
                title: "Untitled",
                content: { type: "doc", content: [] },
            })
            .select("id")
            .single();

        if (error) {
            console.error(error);
            alert("Could not create note");
            return;
        }

        window.location.href = `/notes/${data.id}`;
    }

    if (loading) return <div style={{ padding: 20 }}>Loading notes...</div>;

    return (


        <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 style={{ fontSize: 24, fontWeight: 700 }}>All Notes</h2>
                <button onClick={createArchive}>+ New Note</button>
            </div>

            <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
                {notes.map((note) => (
                    <a
                        key={note.id}
                        href={`/archives/${note.id}`}
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: 12,
                            padding: 14,
                            textDecoration: "none",
                            color: "inherit",
                        }}
                    >
                        <div style={{ fontWeight: 700 }}>
                            {note.title?.trim() ? note.title : "Untitled"}
                        </div>
                        <div style={{ fontSize: 13, opacity: 0.7, marginTop: 6 }}>
                            Updated: {new Date(note.updated_at).toLocaleString()}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default ArchivesList;