const Buttons = () => {
    const actions = [
        { label: "Left CW", axis: "x", limit: -1, dir: 1 },
        { label: "Left CCW", axis: "x", limit: -1, dir: -1 },
        { label: "Right CW", axis: "x", limit: 1, dir: -1 },
        { label: "Right CCW", axis: "x", limit: 1, dir: 1 },
        { label: "Top CW", axis: "y", limit: 1, dir: -1 },
        { label: "Top CCW", axis: "y", limit: 1, dir: 1 },
        { label: "Bottom CW", axis: "y", limit: -1, dir: 1 },
        { label: "Bottom CCW", axis: "y", limit: -1, dir: -1 },
        { label: "Front CW", axis: "z", limit: 1, dir: -1 },
        { label: "Front CCW", axis: "z", limit: 1, dir: 1 },
        { label: "Back CW", axis: "z", limit: -1, dir: 1 },
        { label: "Back CCW", axis: "z", limit: -1, dir: -1 },
    ];

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center",
                padding: "10px",
            }}
        >
            {actions.map(({ label, axis, limit, dir }, index) => (
                <button
                    key={`${label}-${index}`}
                    onClick={() =>
                        window.dispatchEvent(
                            new CustomEvent("rotate", {
                                detail: { axis, limit, dir },
                            })
                        )
                    }
                >
                    {label}
                </button>
            ))}
        </div>
    );
};

export default Buttons;
