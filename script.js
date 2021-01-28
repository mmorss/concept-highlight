let selectedConcept = null;
let currentLanguage = "java";
let currentTheme = "default";
let selectedTopic = null;
let languages = ["java", "csharp"];
let themes = {
  default:
    "https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism.min.css",
  dark:
    "https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism-tomorrow.min.css",
};
notLanguage = {
  java: "csharp",
  csharp: "java",
};
let langs = [
  {
    name: "java",
    title: "Java Vocabulary"
  },
  {
    name: "csharp",
    title: "C# Vocabulary"
  }
]
let langText = {
  java: "Java",
  csharp: "C#",
};
const concepts = [
  {
    title: "Data Types",
    collapsible: true,
    children: [
      ["data-type", "Data Type"],
      ["primitive", "Primitive Type"],
      ["reference", "Reference Type"],
    ],
  },
  {
    title: "Variables",
    collapsible: true,
    children: [
      ["variable-declaration", "Variable Declaration"],
      ["variable-init", "Variable Initialization"],
      ["variable-declare-init", "Declaration & Initialization"],
    ],
  },
  {
    title: "Conditionals",
    collapsible: true,
    children: [["expression-boolean", "Boolean Expression"]],
  },
  {
    title: "Loops",
    collapsible: true,
    children: [
      ["for-loop", "For Loop"],
      ["loop-init", "Loop Initialization"],
      ["loop-condition", "Loop Condition"],
      ["loop-iterator", "Loop Iterator"],
    ],
  },
  {
    title: "Arrays",
    collapsible: true,
    children: [
      ["array-type", "Array Type"],
      ["element-type", "Element Type"],
      ["array-init", "Array Initialization"],
      ["array-element", "Array Element"],
      ["array-index", "Element Index"],
      ["array-property", "Array Property"],
      ["shallow-copy", "Shallow Copy"],
    ],
  },
  {
    title: "Methods",
    collapsable: true,
    children: [
      ["method", "Method"],
      ["method-sig", "Method Signature"],
      ["method-name", "Method Name"],
      ["parameter-list", "Parameter List"],
      ["return-type", "Return Type"],
      ["method-call", "Method Call"],
    ],
  },
  {
    title: "Classes and Objects",
    collabsible: true,
    children: [
      ["class-block", "Class"],
      ["constructor", "Constructor"],
      ["class-property", "Properties"],
      ["getter", "Getters"],
    ],
  },
];

function toggleSidebarLink(el) {
  el.classList.toggle("active");
  if (el.style.display === "none") {
    el.style.display = "inline-block";
  } else {
    el.style.display = "none";
  }
}
// Fix This
function loadConceptList() {
  let index = 0;
  concepts.forEach((concept) => {
    const parent = document.getElementById("sidebar-groups");

    // Build Sidebar Headings
    const heading = document.createElement("section");
    heading.classList.add("sidebar-group");
    const p = document.createElement("p");
    p.innerText = concept.title;
    p.classList.add("sidebar-heading");
    heading.appendChild(p);
    const ul = document.createElement("ul");
    ul.classList.add("sidebar-links", "sidegar-group-links");
    ul.style.display = "inline-block";

    //Build submenus
    concept.children.forEach((child) => {
      li = document.createElement("li");
      a = document.createElement("a");
      a.classList.add("sidebar-link");
      a.setAttribute("href", "#");
      a.innerText = child[1];
      a.setAttribute("concept-name", child[0]);
      li.appendChild(a);

      a.addEventListener("click", (e) => {
        let choice = child[0];
        if (selectedConcept === choice) {
          clearSelection();
        } else {
          clearSelection();
          e.target.classList.add("selected-concept");
          let els = Array.from(document.getElementsByClassName(choice));
          els.forEach((item) => {
            item.classList.add("selected-concept");
          });
          selectedConcept = choice;
        }
      });
      ul.appendChild(li);
    });
    heading.appendChild(ul);
    parent.appendChild(heading);
  });
}

document.querySelector(".bottom").addEventListener("click", (e) => {
  selectedTheme = e.target.id;

  document.querySelector(".theme").classList.remove(currentTheme + "-theme");
  document.querySelector(".theme").classList.add(selectedTheme + "-theme");
  currentTheme = selectedTheme;
  document.getElementById("prismstyle").href = themes[e.target.id];
  localStorage.setItem("themePref", e.target.id);
});

document
  .querySelector(".theme-switcher.hidden")
  .addEventListener("change", (e) => {
    currentTheme = e.target.checked ? "dark" : "default";
    localStorage.setItem("themePref", currentTheme);
    setTheme(e.target.checked ? "dark" : "default");
  });

function clearSelection() {
  document.querySelectorAll(".selected-concept").forEach((e) => {
    e.classList.remove("selected-concept");
  });
  selectedConcept = null;
}

document.querySelectorAll(".lang-btn").forEach((item) => {
  item.addEventListener("click", (e) => {
    if (!e.target.classList.contains(currentLanguage)) {
      toggleLang();
    }
  });
});

function toggleLang() {
  newLang = notLanguage[currentLanguage];
  oldLang = currentLanguage;
  document.querySelector(".language-" + newLang).classList.remove("hidden");
  document.querySelector(".language-" + oldLang).classList.add("hidden");
  currentLanguage = newLang;
  localStorage.setItem("languagePref", currentLanguage);
  toggleLangButton(currentLanguage);
  title = langs[langs.findIndex(x => currentLanguage === x.name)].title;
  document.querySelector(".site-name").innerText = title;
  document.title = title;
}

function toggleLangButton(lang) {
  document.querySelector(".lang-btn." + lang).classList.add("selected");
  document.querySelector(".lang-btn." + lang).classList.remove("deselected");
  document
    .querySelector(".lang-btn." + notLanguage[lang])
    .classList.remove("selected");
    document
    .querySelector(".lang-btn." + notLanguage[lang])
    .classList.add("deselected");
}

document.addEventListener("readystatechange", () => {
  currentLanguage = localStorage.getItem("languagePref") ?? currentLanguage;
  toggleLangButton(currentLanguage);
  currentTheme = localStorage.getItem("themePref") ?? currentTheme;
  document.getElementById("prismstyle").href = themes[currentTheme];
});

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".language-" + notLanguage[currentLanguage])
    .classList.add("hidden");
  setTheme(localStorage.getItem("themePref") ?? "default");
  loadConceptList();
});

function setTheme(theme) {
  if (theme === "dark") {
    currentTheme = "dark";
    document.querySelector(".theme-switcher.hidden").checked = true;
    document.querySelector(".theme").classList.remove("default-theme");
    document.querySelector(".theme").classList.add("dark-theme");
  } else {
    currentTheme = "default";
    document.querySelector(".theme-switcher.hidden").checked = false;
    document.querySelector(".theme").classList.remove("dark-theme");
    document.querySelector(".theme").classList.add("default-theme");
  }
  document.getElementById("prismstyle").href = themes[currentTheme];
}
