const boxes = document.querySelectorAll(".box");
const ginfo = document.querySelector(".info");
const btnn = document.querySelector(".btn");

let cp, gg;
const wp = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

// Initialize Game
function initgame() {
    cp = "x";
    gg = ["", "", "", "", "", "", "", "", ""];
    btnn.classList.remove("active");
    ginfo.innerText = `Current Player - ${cp}`;

    // Reset board
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("win");
        box.style.pointerEvents = "auto";
    });
}

// Check for Winner or Tie
function checkwin() {
    let winner = "";

    // Check for winning condition
    wp.forEach((position) => {
        if (
            gg[position[0]] !== "" &&
            gg[position[0]] === gg[position[1]] &&
            gg[position[1]] === gg[position[2]]
        ) {
            winner = gg[position[0]]; // Set winner (either "x" or "0")

            // Highlight winning boxes
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            // Disable further clicks
            boxes.forEach((box) => (box.style.pointerEvents = "none"));
        }
    });

    // Check for Tie
    if (!winner && !gg.includes("")) {
        ginfo.innerText = "Game Tied!";
        btnn.classList.add("active"); // Show new game button
        return;
    }

    if (winner) {
        ginfo.innerText = `Winner - ${winner}`;
        btnn.classList.add("active"); // Show new game button
    }
}

// Handle Box Click
function handleClick(index) {
    if (gg[index] === "") {
        boxes[index].innerText = cp;
        gg[index] = cp;

        checkwin(); // Check if someone won or game tied

        // Switch Player
        cp = cp === "x" ? "0" : "x";
        ginfo.innerText = `Current Player - ${cp}`;
    }
}

// Add Event Listeners to Boxes
boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleClick(index));
});

// Add Event Listener to New Game Button
btnn.addEventListener("click", initgame);

// Initialize Game on Load
initgame();
