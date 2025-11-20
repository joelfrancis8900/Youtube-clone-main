import { useEffect } from "react";

export default function useSidebarToggle() {
    useEffect(() => {
        console.log("Sidebar toggle initialized");

        const page = document.getElementById("page");
        const toggleButton = document.getElementById("sidebar-toggle");

        if (!page || !toggleButton) {
            console.warn("Sidebar toggle: missing element(s)");
            return;
        }

        // Click handler
        const handleClick = () => {
            console.log("Sidebar toggle clicked");

            const isCollapsed =
                page.classList.contains("auto-collapsed") ||
                page.classList.contains("manually-collapsed") ||
                page.classList.contains("semi-collapsed");

            // Wide screens (>= 900px)
            if (window.innerWidth >= 900) {
                if (page.classList.contains("semi-collapsed")) {
                    page.classList.remove("semi-collapsed", "user-override");
                } else {
                    page.classList.remove("manually-collapsed", "auto-collapsed");
                    page.classList.add("semi-collapsed", "user-override");
                }
            } else {
                // Small/medium screens
                if (isCollapsed) {
                    page.classList.remove(
                        "manually-collapsed",
                        "auto-collapsed",
                        "semi-collapsed"
                    );
                    page.classList.add("user-override");
                } else {
                    page.classList.remove("semi-collapsed");
                    page.classList.add("manually-collapsed", "user-override");
                }
            }
        };

        // Add listener
        toggleButton.addEventListener("click", handleClick);

        // Media query logic
        const mediaQuery = window.matchMedia("(max-width: 899px)");

        const handleSidebarCollapse = (e: MediaQueryListEvent | MediaQueryList) => {
            if (e.matches) {
                page.classList.remove("user-override");
                page.classList.add("auto-collapsed");
            } else {
                page.classList.remove("auto-collapsed", "manually-collapsed", "user-override");
            }
        };

        // Initial check
        handleSidebarCollapse(mediaQuery);

        // Listen to changes
        if ("addEventListener" in mediaQuery) {
            mediaQuery.addEventListener("change", handleSidebarCollapse);
        } else {
            // Legacy fallback
            // @ts-expect-error
            mediaQuery.addListener(handleSidebarCollapse);
        }

        // Cleanup
        return () => {
            toggleButton.removeEventListener("click", handleClick);

            if ("removeEventListener" in mediaQuery) {
                mediaQuery.removeEventListener("change", handleSidebarCollapse);
            } else {
                // @ts-expect-error
                mediaQuery.removeListener(handleSidebarCollapse);
            }
        };
    }, []); // run once on mount
}
