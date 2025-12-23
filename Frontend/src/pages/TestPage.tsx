

export default function TestPage() {
    return (
        <div
            className="grid min-h-screen"
            style={{
                gridTemplateAreas: `
      "header header"
      "sidebar header2"
      "sidebar main"
    `,
                gridTemplateColumns: "minmax(0, auto) 1fr",
                gridTemplateRows: "68px 32px 1fr",
            }}
        >
            <header className="[grid-area:header]">Header1</header>
            <aside className="[grid-area:sidebar]">Sidebar</aside>
            <div className="[grid-area:header2]">Header2</div>
            <main className="[grid-area:main]">Main Content</main>
        </div>
    );
}