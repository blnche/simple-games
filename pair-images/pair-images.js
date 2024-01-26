window.addEventListener("DOMContentLoaded", function(){

    // function createDiv(name) {
    //     let name = document.createElement("div");
    //     return name;
    // }

    let gameBoard = document.getElementById("gameBoard");
    
    function writeGameBoard (row, column) {
        // Check if number of images is even and superior or equal to 6
        if((row*column)%2 == 0 && (row*column) >= 6) {
            let numbers = [];
            for(let i = 0; i < (row*column/2); i++) {
                numbers.push(i);
                numbers.push(i);
            }

            for(let i = 0; i < row; i++) {
                //Create row
                let newRow = document.createElement("div");
                newRow.classList.add("row");

                for(let y = 0; y < column; y++) {
                    //Create column
                    let newColumn = document.createElement("div");
                    newColumn.classList.add("column");
                    
                    newColumn.appendChild(document.createTextNode(numbers[0]));
                    numbers.shift();

                    newColumn.classList.add("hidden");
    
                    newRow.appendChild(newColumn);
                }
                gameBoard.appendChild(newRow);
            }
        } else {
            alert("Le nombre totale d'images doit être pair et supérieur ou égal à 6.");
        }
    };

    writeGameBoard(4,3);
    
    function revealCards() {
        let cards = document.getElementsByClassName("column");
        let cardsRevealed = [];
        let cardsWon = [];
        
        for(let i = 0; i < cards.length; i++) {
            
            cards[i].addEventListener("click", function() {
                
                if(cardsRevealed.length >=2) {
                    console.log("two cards or more revealed");
                    if(cardsRevealed[0].innerText === cardsRevealed[1].innerText) {
                        console.log("it's a match");
                        cardsRevealed[0].classList.add("won");
                        cardsRevealed[1].classList.add("won");
                        
                        cardsWon.push(cardsRevealed[0]);
                        cardsWon.push(cardsRevealed[1]);

                        cardsRevealed.length = 0;

                    } else {
                        console.log("try again");
                        cardsRevealed[0].classList.remove("revealed");
                        cardsRevealed[0].classList.add("hidden");
                        cardsRevealed[1].classList.remove("revealed");
                        cardsRevealed[1].classList.add("hidden");

                        cardsRevealed.length = 0;
                    }
                } else {
                    cards[i].classList.remove("hidden");
                    cards[i].classList.add("revealed");

                    cardsRevealed.push(cards[i]);
                }
                
            })


        };
    };
    
    revealCards();
});
