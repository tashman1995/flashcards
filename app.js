const cardsContainer = document.getElementById('cards'),
	// NEW POPUP
	openPopup = document.getElementById('open-popup'),
	closePopup = document.getElementById('exit-popup'),
	popup = document.getElementById('popup'),
	newCardForm = document.getElementById('newCardForm'),
	question = document.getElementById('question'),
	answer = document.getElementById('answer'),
	// EDIT POPUP
	closeEditPopup = document.getElementById('exit-edit-popup'),
	editPopup = document.getElementById('editPopup'),
	editCardForm = document.getElementById('editCardForm'),
	editQuestion = document.getElementById('edit-question'),
	editAnswer = document.getElementById('edit-answer');

let cardArr = [];
let cardIndex = 0;
let tempIndex;

let editCard = false;

console.log(editCardForm)

// POPULATE CARDS WITH CARD ARRAY DATA
function initialiseCards() {
	cardsContainer.innerHTML = '';
	cardArr.forEach((card) => {
		// GENERATE HTML ELEMENT
		cardsContainer.insertAdjacentHTML(
			'beforeend',
			`
        <div class="card" id = ${card.index}>
                <div class="card__content">
                    <div class="card__side card__side--front">
                        <h2 class="heading-secondary">
                            ${card.question}
                        </h2>
    
                        <div class="card__buttons">
                            <a class="card__edit-btn"> <svg class="card__icon">
                                <use xlink:href="img/sprite.svg#icon-new-message"></use>
                            </svg></a>
                            <a class="card__delete-btn"><svg class="card__icon">
                                <use xlink:href="img/sprite.svg#icon-trash"></use>
                            </svg></a>
                        </div>
                    </div>
    
                    <div class="card__side card__side--back">
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
		card.querySelector('.card__delete-btn').addEventListener('click', () => {
			// REMOVE FROM ARRAY
			cardArr = cardArr.filter((currentCard) => {
				return Number(currentCard.index) != Number(card.id);
			});

			// INITIALISE CARDS
			initialiseCards();
		});

		// EDIT BUTTON
		card.querySelector('.card__edit-btn').addEventListener('click', () => {
			editQuestion.value = card.querySelector('.heading-secondary').innerText;
			editAnswer.value = card.querySelector('.card__answer').innerText;
			tempIndex = Number(card.id);
			rotateCard(card);
			openEditPopup();
		});

		// SWITCH FRONT TO BACK
		card.addEventListener('click', () => {
			rotateCard(card);
		});
	});
}

// OPEN NEW POPUP
function openNewPopup() {
	popup.style.opacity = '100%';
	popup.style.visibility = 'visible';
}

// CLOSE  NEW POPUP
function closeNewPopup() {
	popup.style.opacity = '0%';
	popup.style.visibility = 'hidden';
	editCard = false;
}
//OPEN EDIT POPUP
function openEditPopup() {
	console.log('edit');
	editPopup.style.opacity = '100%';
	editPopup.style.visibility = 'visible';
}

// CLOSE  EDIT POPUP
function closeEditPopupFunc() {
	editPopup.style.opacity = '0%';
	editPopup.style.visibility = 'hidden';
	
}

// ROTATE card
function rotateCard(card) {
	card.querySelector('.card__side--front').classList.toggle('front-hidden');
	card.querySelector('.card__side--back').classList.toggle('back-showing');
}

//CREATE CARD
function createCard(e) {
	e.preventDefault();
	let newCard;
	
	console.log('Added');
	cardIndex++;
	newCard = {
		index: cardIndex,
		question: question.value,
		answer: answer.value
	};

	cardArr.push(newCard);
	

	initialiseCards();

	closeNewPopup();

	question.value = '';
	answer.value = '';
}
// EDIT CARD
function editCardFunc(e){
	e.preventDefault();
	newCard = {
		index: tempIndex,
		question: editQuestion.value,
		answer: editAnswer.value
	};
	console.log('tempIndex:' + tempIndex);
	let findCard = (cardArr.findIndex((card) => card.index === tempIndex ));
	console.log(findCard)
	cardArr[findCard] = newCard;
	initialiseCards();
	closeEditPopupFunc()
}

// EVENT LISTENERS NEW CARD
newCardForm.addEventListener('submit', createCard);
closePopup.addEventListener('click', closeNewPopup);
openPopup.addEventListener('click', openNewPopup);

// EVENT LISTENERS EDIT CARD
editCardForm.addEventListener('submit', editCardFunc);
closeEditPopup.addEventListener('click', closeEditPopupFunc);
// openEditPopup.addEventListener('click', openEditPopup);

initialiseCards();
