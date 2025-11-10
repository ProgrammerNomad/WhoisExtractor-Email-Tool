import { useState, useEffect } from "react";

export type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [loading, setLoading] = useState(true);

  // Load theme from storage on mount
  useEffect(() => {
    chrome.storage.local.get(["whois_mail:theme"], (result) => {
      const savedTheme = result["whois_mail:theme"] as Theme;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
      }
      setLoading(false);
    });
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    chrome.storage.local.set({ "whois_mail:theme": newTheme });
  };

  return { theme, toggleTheme, loading };
};
