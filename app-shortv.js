const cardsContainer = document.getElementById('cards'),
	// NEW POPUP
	openPopup = document.getElementById('open-popup'),
	closePopup = document.getElementById('exit-popup'),
	popup = document.getElementById('popup'),
	newCardForm = document.getElementById('newCardForm'),
	question = document.getElementById('question'),
	answer = document.getElementById('answer');

let cardArr = [
	{
		index: 'starter',
		question: 'Click the add new card button in the top right corner to add your first card',
		answer: ''
	}
];
let cardIndex = 0;
let tempIndex;
let newCard;

let toggleEdit = false;

// POPULATE CARDS WITH CARD ARRAY DATA
function initialiseCards() {
    let i = 0
	cardsContainer.innerHTML = '';
	cardArr.forEach((card) => {
        i++
		// GENERATE HTML ELEMENT
		cardsContainer.insertAdjacentHTML(
			'beforeend',
			`
            <div class="card" id = ${card.index}>
                <div class="card__content">
                    <div class="card__side card__side--front">
                        
                        <div class="card__buttons">
                            <p class = "card__side-label">${i}. front<p>
                            <a class="card__buttons--edit"> <svg class="card__icon">
                                <use xlink:href="img/sprite.svg#icon-new-message"></use>
                            </svg></a>
                            <a class="card__buttons-delete"><svg class="card__icon">
                                <use xlink:href="img/sprite.svg#icon-trash"></use>
                            </svg></a>
                        </div>

                        <h2 class="heading-secondary">
                            ${card.question}
                        </h2>
                    </div>
    
                    <div class="card__side card__side--back">
                    <p class = "card__side-label card__side-label--back">${i}. Back<p>
                        <p class="card__answer">
                        ${card.answer}
                        </p>
                    </div>
                    
                </div>
            </div>

        `
		);
	});
	// ADD CARD FUNCTIONALITY
	addCardFunctionality();
}

//////////////////////////////////////////
// ADD CARD FUNCTIONALITY
function addCardFunctionality() {
	cards = document.querySelectorAll('.card');
	cards.forEach((card) => {
		//DELETE BUTTON
		card.querySelector('.card__buttons-delete').addEventListener('click', () => {
			// REMOVE FROM ARRAY
			cardArr = cardArr.filter((currentCard) => {
				return Number(currentCard.index) != Number(card.id);
			});

			// INITIALISE CARDS
			initialiseCards();
		});

		// EDIT BUTTON
		card.querySelector('.card__buttons--edit').addEventListener('click', () => {
			//STOP THE CARD ROTATION FROM THE CLICK
			rotateCard(card);
			// SET THE VALUE OF THE POPUP TO EQUAL THAT OF THE SELECTED CARD
			question.value = card.querySelector('.heading-secondary').innerText;
			answer.value = card.querySelector('.card__answer').innerText;
			tempIndex = Number(card.id);
			toggleEdit = true;
			openNewPopup();
		});

		// SWITCH FRONT TO BACK
		card.addEventListener('click', () => {
			rotateCard(card);
		});
	});
}

// OPEN POPUP
function openNewPopup() {
	popup.style.display = 'block'; //STOPS FORM FLASHING ON LOAD BUT STOPS ANIMATION ON FIRST LOAD
	popup.style.opacity = '100%';
	popup.style.visibility = 'visible';
	if (toggleEdit === true) {
		popup.querySelector('#popup-title').innerText = 'Edit Card';
	} else {
		popup.querySelector('#popup-title').innerText = 'Add New Card';
	}
}

// CLOSE POPUP
function closeNewPopup() {
	popup.style.opacity = '0%';
	popup.style.visibility = 'hidden';
	toggleEdit = false;
	question.value = '';
	answer.value = '';
	question.classList.remove('popup__txt--success');
	question.classList.remove('popup__txt--failure');
	answer.classList.remove('popup__txt--success');
	answer.classList.remove('popup__txt--failure');
}

// ROTATE card
function rotateCard(card) {
	card.querySelector('.card__side--front').classList.toggle('front-hidden');
	card.querySelector('.card__side--back').classList.toggle('back-showing');
}

// CHECK IF REQUIRED FIELDS ARE PRESENT
function checkRequired(inputArr) {
	inputArr.forEach(function(input) {
		if (input.value.trim() === '') {
			input.classList.add('popup__txt--failure');
	        input.classList.remove('popup__txt--success');
		} else {
			// input.style.border = '3px solid #a2ff9f';
			input.classList.add('popup__txt--success');
			input.classList.remove('popup__txt--failure');
		}
	});

	if (question.value.trim() != '' && answer.value.trim() != '') {
		updateCards();
	}
}
 

// SHOW RELEVENT ERRORS
function showError() {
	
}

// EDIT CARD
function editCard() {
	newCard = {
		index: tempIndex,
		question: question.value,
		answer: answer.value
	};
	let findCard = cardArr.findIndex((card) => card.index === tempIndex);
	cardArr[findCard] = newCard;
}

// CREATE CARD
function createCard() {
	cardIndex++;
	newCard = {
		index: cardIndex,
		question: question.value,
		answer: answer.value
	};
	cardArr.push(newCard);
}

//CREATE OR EDIT CARD
function updateCards() {
	// REMOVE STARTER CARD
	if (cardArr[0].index === 'starter') {
		cardArr = [];
	}
	// SELECT EDIT OR CREATE
	if (toggleEdit === true) {
		editCard();
	} else {
		createCard();
	}

	initialiseCards();

	closeNewPopup();
}

// EVENT LISTENERS NEW CARD
newCardForm.addEventListener('submit', function(e) {
	e.preventDefault();
	checkRequired([ question, answer ]);
});
closePopup.addEventListener('click', closeNewPopup);
openPopup.addEventListener('click', openNewPopup);

initialiseCards();
