function isMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

export function openClaude(): void {
  if (isMobile()) {
    // Try native app deep link first
    const appLink = "claude://new-conversation";
    const webFallback = "https://claude.ai/new";

    // Attempt app link, fall back to web after timeout
    const start = Date.now();
    window.location.href = appLink;

    setTimeout(() => {
      // If we're still here after 1.5s, the app didn't open
      if (Date.now() - start < 2000) {
        window.open(webFallback, "_blank");
      }
    }, 1500);
  } else {
    window.open("https://claude.ai/new", "_blank");
  }
}
