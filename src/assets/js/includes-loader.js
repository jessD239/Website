export async function loadIncludes() {
  const includeNodes = Array.from(document.querySelectorAll("[data-include]"));

  await Promise.all(
    includeNodes.map(async (node) => {
      const includePath = node.getAttribute("data-include");

      if (!includePath) {
        return;
      }

      try {
        const separator = includePath.includes("?") ? "&" : "?";
        const includeUrl = includePath + separator + "v=" + Date.now();
        const response = await fetch(includeUrl, { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Failed to load include: " + includePath);
        }

        node.outerHTML = await response.text();
      } catch (error) {
        console.error(error);
      }
    }),
  );
}
