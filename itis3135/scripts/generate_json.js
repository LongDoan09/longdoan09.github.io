document.addEventListener("DOMContentLoaded", () => {
  const generateJSONBtn = document.getElementById("generateJSON");
  const form = document.getElementById("introForm");
  const h2 = document.querySelector("main h2");

  // Escape HTML function (must be defined before use)
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, (tag) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;"
    }[tag]));
  }

  // Helper to safely get field values
  const getValue = (name) => {
    const field = form.querySelector(`[name="${name}"]`);
    return field ? field.value.trim() : "";
  };

  generateJSONBtn.addEventListener("click", () => {
    // Collect courses
    const courses = Array.from(document.querySelectorAll(".course")).map((courseDiv) => {
      const inputs = courseDiv.querySelectorAll("input");
      return {
        department: inputs[0].value,
        number: inputs[1].value,
        name: inputs[2].value,
        reason: inputs[3].value
      };
    });

    // Collect links
    const links = [
      { name: "LinkedIn", href: getValue("link1") },
      { name: "GitHub", href: getValue("link2") },
      { name: "GitHub.io", href: getValue("link3") },
      { name: "Charlotte Webpage", href: getValue("link4") },
      { name: "FreeCodeCamp", href: getValue("link5") }
    ];

    // Build the JSON object
    const jsonData = {
      firstName: getValue("firstName"),
      preferredName: getValue("preferredName"),
      middleInitial: getValue("middleName"),
      lastName: getValue("lastName"),
      divider: getValue("divider"),
      mascotAdjective: getValue("mascotAdj"),
      mascotAnimal: getValue("mascotAnimal"),
      image: document.getElementById("previewImage").src,
      imageCaption: getValue("picCaption"),
      personalStatement: getValue("personalStatement"),
      personalBackground: getValue("bullet1"),
      academicBackground: getValue("bullet2"),
      professionalBackground: getValue("bullet3"),
      futureGoals: getValue("bullet4"),
      skills: getValue("bullet5"),
      interests: getValue("bullet6"),
      favoriteCourse: getValue("bullet7"),
      courses: courses,
      links: links
    };

    // Convert to formatted JSON string
    const jsonText = JSON.stringify(jsonData, null, 2);

    // Replace form with JSON output
    h2.textContent = "Introduction JSON";
    form.innerHTML = `
      <section class="json-output" style="background:#f5f5f5; padding:15px; border-radius:5px; overflow:auto;">
        <pre><code class="language-json">${escapeHTML(jsonText)}</code></pre>
      </section>
      <button id="resetForm" type="button" class="button-style">Back to Form</button>
    `;

    // Back button reloads the page
    document.getElementById("resetForm").addEventListener("click", () => {
      window.location.reload();
    });

    // Highlight.js formatting
    if (window.hljs) {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  });
});
