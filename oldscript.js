// HTML elements
const gridElement = document.getElementById("grid");
const submitButton = document.getElementById("submit");
const hintButton = document.getElementById("hint");
const feedbackElement = document.getElementById("feedback");
const shuffleButton = document.getElementById("shuffle");
const deselectButton = document.getElementById("deselect");
// MathJax configuration
// window.MathJax = {
//     // Other configurations...
//     startup: {
//         ready() {
//             const mathElements =
//                 document.getElementsByClassName("MathJax_CHTML");
//             for (let i = 0; i < mathElements.length; i++) {
//                 const container = mathElements[i].closest(".mathjax-container");
//                 if (container) {
//                     container.classList.add("disable-text-select");
//                 }
//             }
//         },
//     },
// };

// Sample puzzle data
// const puzzles = [
//     {
//         category: "FISH",
//         options: ["Bass", "Flounder", "Salmon", "Trout"],
//         color: "#b0c4ef",
//     },
//     {
//         category: "FIRE ___",
//         options: ["Ant", "Drill", "Island", "Opal"],
//         color: "#a0c35a",
//     },
//     {
//         category: "COLORS",
//         options: ["Red", "Blue", "Green", "Yellow"],
//         color: "#bb81c5",
//     },
//     {
//         category: "FRUITS",
//         options: ["Apple", "Banana", "Orange", "Grape"],
//         color: "#f9df6d",
//     },
// ];

const puzzles = [
    {
        category: "Non-Negative Domain",
        options: [
            "x^3-\\frac{1}{\\sqrt{x}}",
            "\\sqrt{x}",
            "ln(x)",
            "\\sqrt[4]{x}",
        ],
        color: "#f9df6d",
    },

    {
        category: "Continuous but not differentiable",
        options: ["|x|", "|3x-6|", "\\sqrt[3]{x}", "\\sqrt[5]{x}"],
        color: "#a0c35a",
    },
    {
        category: "Undefined at x = 2",
        options: [
            "\\frac{x^2 - 4x +3}{x^2 - 3x + 2} ",
            "\\frac{sin(x)}{2x-4}",
            "\\frac{|x-2|}{x-2}",
            "\\sqrt[]{1-x^2}",
        ],
        color: "#bb81c5",
    },
    {
        category: "Trigonometric Functions",
        options: ["\\sin(x)", "\\cos(x)", "\\tan(x)", "\\sec(x)"],
        color: "#f9df6d",
    },
];

let selectedOptions = [];

// Function to generate the grid based on puzzle data
function generateGrid() {
    gridElement.innerHTML = "";
    selectedOptions = [];

    // Create a flat array of all options
    const allOptions = puzzles.flatMap((puzzle) => puzzle.options);

    // Shuffle the array
    allOptions.sort(() => Math.random() - 0.5);

    allOptions.forEach((option) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        gridItem.innerHTML = `\\(${option}\\)`;
        gridItem.dataset.option = option; // Store the original option in a data attribute
        gridItem.addEventListener("click", toggleSelection);

        gridElement.appendChild(gridItem);
    });
    // allOptions.forEach((option) => {
    //     const gridItem = document.createElement("div");
    //     gridItem.classList.add("grid-item");
    //     gridItem.innerHTML = `\\(${option}\\)`;
    //     gridItem.dataset.option = option; // Store the original option in a data attribute
    //     gridItem.addEventListener("click", toggleSelection);

    //     gridElement.appendChild(gridItem);
    // });
    // allOptions.forEach((option) => {
    //     const gridItem = document.createElement("div");
    //     gridItem.classList.add("grid-item");
    //     gridItem.innerHTML = `\\(${option}\\)`;
    //     gridItem.dataset.option = option;
    //     gridItem.addEventListener("click", toggleSelection);

    //     // Add a class to MathJax elements
    //     const mathJaxContainer = document.createElement("div");
    //     mathJaxContainer.classList.add("mathjax-container");
    //     mathJaxContainer.appendChild(gridItem);

    //     gridElement.appendChild(mathJaxContainer);
    // });
    // MathJax.typesetPromise().then(() => {
    //     // Call the function to disable text selection inside MathJax elements
    //     disableTextSelectionInMathJax();
    // });
    MathJax.typeset();
}
// function disableTextSelectionInMathJax() {
//     MathJax.Hub.Register.StartupHook("End", function () {
//         const mathElements = document.querySelectorAll(".MathJax_CHTML");
//         mathElements.forEach((mathElement) => {
//             mathElement.style.userSelect = "none";
//             mathElement.setAttribute("unselectable", "on");
//             mathElement.onselectstart = function () {
//                 return false;
//             };
//         });
//     });
// }
// Function to generate the grid based on puzzle data
// function generateGrid() {
//     gridElement.innerHTML = "";
//     selectedOptions = [];

//     // Create a flat array of all options
//     const allOptions = puzzles.flatMap((puzzle) => puzzle.options);

//     // Shuffle the array
//     allOptions.sort(() => Math.random() - 0.5);

//     allOptions.forEach((option) => {
//         const gridItem = document.createElement("div");
//         gridItem.classList.add("grid-item");
//         gridItem.innerHTML = `\\(${option}\\)`;
//         gridItem.dataset.option = option; // Store the original option in a data attribute
//         gridItem.addEventListener("click", toggleSelection);
//         gridItem.addEventListener("mousedown", (event) =>
//             event.preventDefault()
//         );
//         gridElement.appendChild(gridItem);
//     });
// }
// Function to toggle selection of a grid item
function toggleSelection(event) {
    const gridItem = event.target;
    if (gridItem.classList.contains("selected")) {
        gridItem.classList.remove("selected");
        selectedOptions = selectedOptions.filter(
            (option) => option !== gridItem.dataset.option // Use the original option from the data attribute
        );
    } else {
        if (selectedOptions.length < 4) {
            gridItem.classList.add("selected");
            selectedOptions.push(gridItem.dataset.option); // Use the original option from the data attribute
        } else {
            feedbackElement.textContent =
                "You've already selected four items. Tap 'Submit' to check.";
        }
    }
}
// Function to check if the selected options form a group with something in common
function checkSelection() {
    if (selectedOptions.length === 4) {
        const commonCategory = findCommonCategory(selectedOptions);
        if (commonCategory) {
            feedbackElement.textContent = `Correct! Selected items belong to the category: ${commonCategory.category}`;

            // Get the grid items for the selected options
            const selectedGridItems = Array.from(gridElement.children).filter(
                (gridItem) => selectedOptions.includes(gridItem.dataset.option) // Use the original option from the data attribute
            );

            // Create a new grid item to replace the selected grid items
            const newGridItem = document.createElement("div");
            newGridItem.classList.add("grid-item", "correct", "big-rectangle");
            newGridItem.innerHTML = `<strong style="color: black;">${
                commonCategory.category
            }</strong><br>${commonCategory.options
                .map((option) => `\\(${option}\\)`)
                .join(", ")}`;
            newGridItem.style.backgroundColor = commonCategory.color;
            newGridItem.style.color = "black";

            // Add the new grid item to the top of the grid
            gridElement.insertBefore(newGridItem, gridElement.firstChild);

            // Render the LaTeX formatting
            MathJax.typesetPromise();
            // Remove the selected grid items
            selectedGridItems.forEach((gridItem) =>
                gridElement.removeChild(gridItem)
            );

            // Clear the selected options
            selectedOptions = [];

            // Check if the game is over
            const allGridItems = Array.from(gridElement.children);
            if (
                allGridItems.every((item) => item.classList.contains("correct"))
            ) {
                gameOver();
            }
        } else {
            feedbackElement.textContent = "Please select exactly four items.";
        }
    } else {
        feedbackElement.textContent = "Please select exactly four items.";
    }
}
// Function to find the common category among the selected options
function findCommonCategory(selectedOptions) {
    for (let puzzle of puzzles) {
        if (
            selectedOptions.every((option) => puzzle.options.includes(option))
        ) {
            return puzzle;
        }
    }
    return null;
}

// Function to provide a hint
const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
function getHint() {
    feedbackElement.textContent = `Hint: One of the categories is ${puzzle.category}`;
}

// Function to shuffle the grid items
function shuffleGrid() {
    const gridItems = Array.from(gridElement.children);
    const movableItems = gridItems.filter(
        (item) => !item.classList.contains("correct")
    );
    const fixedItems = gridItems.filter((item) =>
        item.classList.contains("correct")
    );

    // Shuffle the movable items
    const shuffledItems = movableItems.sort(() => Math.random() - 0.5);

    // Clear the grid
    gridElement.innerHTML = "";

    // Add the fixed items back to the grid
    fixedItems.forEach((item) => gridElement.appendChild(item));

    // Add the shuffled items back to the grid
    shuffledItems.forEach((item) => gridElement.appendChild(item));
}

function deselectAll() {
    const selectedItems = Array.from(
        gridElement.getElementsByClassName("selected")
    );
    selectedItems.forEach((item) => {
        item.classList.remove("selected");
    });
    selectedOptions = [];
}

function gameOver() {
    const modal = document.getElementById("gameOverModal");
    modal.style.display = "block";

    const closeModal = document.getElementById("closeModal");
    closeModal.onclick = function () {
        modal.style.display = "none";
    };
}

// Event listeners
// Event listeners
submitButton.addEventListener("click", checkSelection);
hintButton.addEventListener("click", getHint);
shuffleButton.addEventListener("click", shuffleGrid);
deselectButton.addEventListener("click", deselectAll);

feedbackElement.textContent = "Create groups of 4!";

// // Generate initial grid
// generateGrid();
// disableTextSelectionInMathJax();

function initialize() {
    generateGrid();
    disableTextSelectionInMathJax();
}

window.MathJax = {
    tex: {
        inlineMath: [["\\(", "\\)"]],
        displayMath: [["$$", "$$"]],
        processEscapes: true,
        processEnvironments: true,
    },
    startup: {
        ready: function () {
            initialize();
        },
    },
};
