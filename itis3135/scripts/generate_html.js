document.addEventListener("DOMContentLoaded", () => {
    const generateHTMLBtn = document.getElementById("generateHTML");
    const form = document.getElementById("introForm");
    const h2 = document.querySelector("main h2");
  
    // Escape HTML function (must be defined first)
    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g, (tag) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
      }[tag]));
    }
  
    // Helper to safely get input values
    const getValue = (name) => {
      const field = form.querySelector(`[name="${name}"]`);
      return field ? field.value.trim() : "";
    };
  
    generateHTMLBtn.addEventListener("click", () => {
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
  
      // Build HTML content
      let htmlOutput = `<h3>${getValue("firstName")} ${getValue("middleName")} "${getValue("preferredName")}" ${getValue("lastName")} ★ ${getValue("mascotAdj")} ${getValue("mascotAnimal")}</h3>\n`;
      htmlOutput += `<figure>\n  <img src="${document.getElementById("previewImage").src}" alt="User Picture" />\n`;
      htmlOutput += `  <figcaption>${getValue("picCaption")}</figcaption>\n</figure>\n`;
  
      // Main bullets
      const labelMap = [
        "Personal Background",
        "Academic Background",
        "Professional Goals",
        "Future Goals",
        "Skills",
        "Interests",
        "Favorite Course"
      ];
      htmlOutput += "<ul>\n";
      for (let i = 1; i <= 7; i++) {
        const bullet = getValue(`bullet${i}`);
        if (bullet) htmlOutput += `  <li><strong>${labelMap[i - 1]}:</strong> ${bullet}</li>\n`;
      }
      htmlOutput += "</ul>\n";
  
      // Courses
      htmlOutput += "<h3>Courses I'm Taking</h3>\n<ul>\n";
      courses.forEach((course) => {
        htmlOutput += `  <li><strong>${course.number} - ${course.name}:</strong> ${course.reason}</li>\n`;
      });
      htmlOutput += "</ul>\n";
  
      // Links
      htmlOutput += "<h3>Links</h3>\n<ul>\n";
      links.forEach((link) => {
        if (link.href) htmlOutput += `  <li><a href="${link.href}" target="_blank">${link.name}</a></li>\n`;
      });
      htmlOutput += "</ul>\n";
  
      // Replace form with formatted HTML output
      h2.textContent = "Introduction HTML";
      form.innerHTML = `
        <section class="html-output">
          <pre><code class="language-html">${escapeHTML(htmlOutput)}</code></pre>
        </section>
        <button id="resetForm" type="button" class="button-style">Back to Form</button>
      `;
  
      // Reset button
      document.getElementById("resetForm").addEventListener("click", () => {
        window.location.reload();
      });
  
      // Highlight.js (optional)
      if (window.hljs) {
        document.querySelectorAll("pre code").forEach((block) => {
          hljs.highlightElement(block);
        });
      }
    });
  });
  