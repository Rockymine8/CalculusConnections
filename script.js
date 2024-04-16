// HTML elements
const gridElement = document.getElementById("grid");
const submitButton = document.getElementById("submit");
const hintButton = document.getElementById("hint");
const feedbackElement = document.getElementById("feedback");
const shuffleButton = document.getElementById("shuffle");
const deselectButton = document.getElementById("deselect");

const puzzles = [
    {
        category: "Non-Negative Domain",
        options: ["x³ - 1/√x", "√x", "ln(x)", "∜x"],
        color: "#f9df6d",
    },
    {
        category: "Continuous but not differentiable",
        options: ["|x|", "|3x-6|", "∛x", "∜x"],
        color: "#a0c35a",
    },
    {
        category: "Undefined at x = 2",
        options: [
            "(x² - 4x + 3)/(x² - 3x + 2)",
            "sin(x)/(2x - 4)",
            "|x - 2|/(x - 2)",
            "√(1 - x²)",
        ],
        color: "#bb81c5",
    },
    {
        category: "Trigonometric Functions",
        options: ["sin(x)", "cos(x)", "tan(x)", "sec(x)"],
        color: "#f9df6d",
    },
];

let selectedOptions = [];

// Function to generate the grid based on puzzle data
// function generateGrid() {
//     gridElement.innerHTML = "";
//     selectedOptions = [];

//     const allOptions = puzzles.flatMap((puzzle) => puzzle.options);
//     allOptions.sort(() => Math.random() - 0.5);

//     allOptions.forEach((option) => {
//         const gridItem = document.createElement("div");
//         gridItem.classList.add("grid-item");

//         if (option.includes("/")) {
//             const fractionRepresentation = createFractionRepresentation(option);
//             gridItem.appendChild(fractionRepresentation);
//         } else {
//             gridItem.style.alignSelf = "center";
//             gridItem.textContent = option;
//         }
//         gridItem.style.height = "50px";
//         gridItem.dataset.option = option;
//         gridItem.addEventListener("click", toggleSelection);
//         gridElement.appendChild(gridItem);
//     });
// }
function generateGrid() {
    gridElement.innerHTML = "";
    selectedOptions = [];

    const allOptions = puzzles.flatMap((puzzle) => puzzle.options);
    allOptions.sort(() => Math.random() - 0.5);

    allOptions.forEach((option) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");

        if (option.includes("/")) {
            const fractionRepresentation = createFractionRepresentation(option);
            gridItem.appendChild(fractionRepresentation);

            // Set styles for the fraction grid item
            gridItem.style.display = "flex";
            gridItem.style.alignItems = "center";
            gridItem.style.alignSelf = "center"; // Center-align items vertically
            gridItem.style.userSelect = "none"; // Disable text selection
        } else {
            gridItem.style.alignSelf = "center";
            gridItem.textContent = option;
        }
        gridItem.style.height = "50px";
        gridItem.style.alignSelf = "center";
        gridItem.dataset.option = option;
        gridItem.addEventListener("click", toggleSelection);
        gridElement.appendChild(gridItem);
    });
}

// function createFractionRepresentation(fractionString) {
//     const fractionParts = fractionString.split("/");
//     const numerator = fractionParts[0];
//     const denominator = fractionParts[1];

//     const fractionContainer = document.createElement("div");
//     fractionContainer.classList.add("fraction-container");
//     fractionContainer.style.userSelect = "none"; // Disable text selection for the container

//     const numeratorElement = document.createElement("div");
//     numeratorElement.textContent = numerator;
//     numeratorElement.style.userSelect = "none"; // Disable text selection for the numerator
//     numeratorElement.addEventListener("click", (event) =>
//         event.stopPropagation()
//     );
//     fractionContainer.appendChild(numeratorElement);

//     const lineElement = document.createElement("div");
//     lineElement.textContent = "––";
//     lineElement.style.userSelect = "none"; // Disable text selection for the line
//     lineElement.style.pointerEvents = "none"; // Disable click events on the line
//     fractionContainer.appendChild(lineElement);

//     const denominatorElement = document.createElement("div");
//     denominatorElement.textContent = denominator;
//     denominatorElement.style.userSelect = "none"; // Disable text selection for the denominator
//     denominatorElement.addEventListener("click", (event) =>
//         event.stopPropagation()
//     );
//     fractionContainer.appendChild(denominatorElement);

//     // Prevent the container from inheriting the 'selected' class
//     fractionContainer.addEventListener("click", function (event) {
//         const gridItem = event.currentTarget.closest(".grid-item");
//         if (gridItem) {
//             gridItem.classList.toggle("selected");
//         }
//     });

//     return fractionContainer;
// }

// Function to toggle selection of a grid item
function createFractionRepresentation(fractionString) {
    const fractionParts = fractionString.split("/");
    const numerator = fractionParts[0];
    const denominator = fractionParts[1];

    const fractionContainer = document.createElement("div");
    fractionContainer.classList.add("fraction-container");
    fractionContainer.style.userSelect = "none"; // Disable text selection for the container

    const numeratorElement = document.createElement("div");
    numeratorElement.textContent = numerator;
    numeratorElement.style.userSelect = "none"; // Disable text selection for the numerator
    fractionContainer.appendChild(numeratorElement);

    const lineElement = document.createElement("div");
    lineElement.textContent = "––";
    lineElement.style.userSelect = "none"; // Disable text selection for the line
    lineElement.style.pointerEvents = "none"; // Disable click events on the line
    fractionContainer.appendChild(lineElement);

    const denominatorElement = document.createElement("div");
    denominatorElement.textContent = denominator;
    denominatorElement.style.userSelect = "none"; // Disable text selection for the denominator
    fractionContainer.appendChild(denominatorElement);

    // Prevent click event propagation to grid item
    fractionContainer.addEventListener("click", function (event) {
        event.stopPropagation();
    });

    return fractionContainer;
}

function toggleSelection(event) {
    const gridItem = event.target;
    if (gridItem.classList.contains("selected")) {
        gridItem.classList.remove("selected");
        selectedOptions = selectedOptions.filter(
            (option) => option !== gridItem.dataset.option
        );
    } else {
        if (selectedOptions.length < 4) {
            gridItem.classList.add("selected");
            selectedOptions.push(gridItem.dataset.option);
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
            const selectedGridItems = Array.from(gridElement.children).filter(
                (gridItem) => selectedOptions.includes(gridItem.dataset.option)
            );
            const newGridItem = document.createElement("div");
            newGridItem.classList.add("grid-item", "correct", "big-rectangle");
            newGridItem.innerHTML = `<strong style="color: black;">${
                commonCategory.category
            }</strong><br>${commonCategory.options.join(", ")}`;
            newGridItem.style.backgroundColor = commonCategory.color;
            newGridItem.style.color = "black";
            gridElement.insertBefore(newGridItem, gridElement.firstChild);
            selectedGridItems.forEach((gridItem) =>
                gridElement.removeChild(gridItem)
            );
            selectedOptions = [];
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
function getHint() {
    const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
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
    const shuffledItems = movableItems.sort(() => Math.random() - 0.5);
    gridElement.innerHTML = "";
    fixedItems.forEach((item) => gridElement.appendChild(item));
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
submitButton.addEventListener("click", checkSelection);
hintButton.addEventListener("click", getHint);
shuffleButton.addEventListener("click", shuffleGrid);
deselectButton.addEventListener("click", deselectAll);

feedbackElement.textContent = "Create groups of 4!";

function initialize() {
    generateGrid();
}

initialize();
