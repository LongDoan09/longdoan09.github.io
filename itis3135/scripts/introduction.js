// introduction.js

// Prevent form submission and handle data display
const form = document.getElementById("introForm");
const previewImage = document.getElementById("previewImage");
const courseSection = document.getElementById("courseSection");
const addCourseBtn = document.getElementById("addCourse");
const removeCourseBtn = document.getElementById("removeCourse");
const clearButton = document.querySelector("button[type='button'][id='clearButton']");

// Hide the introductory h3
const introH3 = document.querySelector("main h3");

// Handle picture preview
const pictureInput = document.querySelector("input[name='picture']");
pictureInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            previewImage.src = e.target.result; // Show selected image
        };
        reader.readAsDataURL(file);
    } else {
        previewImage.src = "images/DSC00591_small.jpeg"; // default image
    }
});

// Handle form submission
form.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent page refresh

    if (introH3) introH3.style.display = "none"; // hide h3

    const formData = new FormData(form);

    // Build output HTML
    let outputHTML = `<h2>Introduction</h2>`; // First heading

    // Name & Mascot
    const firstName = formData.get("firstName");
    const middleName = formData.get("middleName") || "";
    const lastName = formData.get("lastName");
    const mascotAdj = formData.get("mascotAdj");
    const mascotAnimal = formData.get("mascotAnimal");
    const divider = formData.get("divider");

    // Second heading: Name || Mascot
    outputHTML += `<h2>${firstName} ${lastName} ${divider} ${mascotAdj} ${mascotAnimal}</h2>`;

    // Picture with caption
    const picCaption = formData.get("picCaption");
    outputHTML += `<p><img src="${previewImage.src}" alt="User Picture" width="150"></p>`;
    if (picCaption) {
        outputHTML += `<p class="img-caption">${picCaption}</p>`;
    }

    // Personal Statement
    outputHTML += `<p><strong>Personal Statement:</strong> ${formData.get("personalStatement")}</p>`;

    // Main Bullets with bold labels
    const labelMap = [
        "Personal Background",
        "Academic Background",
        "Professional Goals",
        "Future Goals",
        "Skills",
        "Interests",
        "Favorite Course"
    ];
    outputHTML += `<h3>Main Bullets</h3><ul>`;
    for (let i = 1; i <= 7; i++) {
        const bullet = formData.get(`bullet${i}`);
        if (bullet) {
            outputHTML += `<li><strong>${labelMap[i - 1]}:</strong> ${bullet}</li>`;
        }
    }
    outputHTML += `</ul>`;

    // Courses
    const courses = document.querySelectorAll(".course");
    outputHTML += `<h3>Courses I'm Taking</h3><ul>`;
    courses.forEach((courseDiv) => {
        const inputs = courseDiv.querySelectorAll("input");
        const department = inputs[0].value;
        const classNumber = inputs[1].value;
        const className = inputs[2].value;
        const reason = inputs[3].value;

        outputHTML += `<li><strong>${classNumber} - ${className}:</strong> ${reason}</li>`;
    });
    outputHTML += "</ul>";

    // Favorite Quote
    const favoriteQuote = formData.get("quote");
    const quoteAuthor = formData.get("quoteAuthor");
    if (favoriteQuote) {
        outputHTML += `<p><strong class="quote-label">Favorite Quote</strong><br>`;
        outputHTML += `<span class="quote-text">"${favoriteQuote}"`;
        if (quoteAuthor) {
            outputHTML += `<br>- ${quoteAuthor}`;
        }
        outputHTML += `</span></p>`;
    }

    // Extras
    outputHTML += `<p><strong>Funny Thing:</strong> ${formData.get("Funny Thing") || "N/A"}</p>`;
    outputHTML += `<p><strong>Something to Share:</strong> ${formData.get("Thing to share") || "N/A"}</p>`;

    // Links with custom names displayed inline with "||"
   // Links with custom divider from form
    const linkLabels = ["LinkedIn", "GitHub", "GitHub.io", "Charlotte Webpage", "FreeCodeCamp"];


    let linksHTML = linkLabels.map((label, i) => {
        const url = formData.get("link" + (i + 1));
        return url ? `<a href="${url}" target="_blank">${label}</a>` : "";
    }).filter(Boolean).join(` ${divider} `);

outputHTML += `<h3>Links</h3><p>${linksHTML}</p>`;


    // Replace form with output
    form.innerHTML = outputHTML;

    // Add reset button at the bottom
    const resetLink = document.createElement("button");
    resetLink.textContent = "Reset Form";
    resetLink.type = "button";
    resetLink.style.fontSize = "18px";  // Bigger button
    resetLink.style.padding = "10px 20px";
    resetLink.style.marginTop = "10px";
    resetLink.addEventListener("click", () => window.location.reload());
    form.appendChild(resetLink);
});

// Clear button functionality
clearButton.addEventListener("click", function () {
    const inputs = Array.from(document.querySelectorAll("form input, form textarea"));
    inputs.forEach((input) => input.value = "");
    previewImage.src = "images/DSC00591_small.jpeg"; // reset image
});

// Add course functionality
addCourseBtn.addEventListener("click", () => {
    const newCourse = document.createElement("div");
    newCourse.className = "course";
    newCourse.innerHTML = `
        <input type="text" placeholder="Department" required>
        <input type="text" placeholder="Class Number" required>
        <input type="text" placeholder="Class Name" required>
        <input type="text" placeholder="Why you are taking this class?" required>
    `;
    courseSection.appendChild(newCourse);
});

// Remove last course functionality
removeCourseBtn.addEventListener("click", () => {
    const allCourses = document.querySelectorAll(".course");
    if (allCourses.length > 1) allCourses[allCourses.length - 1].remove();
});
