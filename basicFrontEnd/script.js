// let counter = 0; // variable of Number type that keeps track of # of times button is pressed

// function incrementCounter(){
//     counter = counter + 1;
//     let displayText = 'Pressed ' + counter;
    
//     if(counter === 1){
//         displayText = displayText + ' time';
//     }else {
//         displayText = displayText + ' times';
//     }
//     document.getElementById('display').innerHTML = displayText;
// }

/* Dynamic cards for resources */
const cardContainer = document.getElementById('card-container');

// function createResource(title, description, duration) {
//     const card = document.createElement('div');
//     card.classList.add('card');

//     const cardTitle = document.createElement('h2');
//     cardTitle.textContent = title;

//     const cardDescription = document.createElement('p');
//     cardTitle.textContent = description;

//     const cardDuration = document.createElement('p');
//     cardTitle.textContent = duration;

//     card.appendChild(cardTitle);
//     card.appendChild(cardDescription);
//     card.appendChild(cardDuration);
// }

// const card1 = createCard('Title', 'Description', '10 min');
// const card2 = createCard('Different', 'Information Given', '15 min');

// cardContainer.appendChild(card1);
// cardContainer.appendChild(card2);

function createCard(title, content, duration) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardTitle = document.createElement('h2');
    cardTitle.textContent = title;

    const cardContent = document.createElement('p');
    cardContent.textContent = content;

    const cardDuration = document.createElement('p');
    cardContent.textContent = duration;

    card.appendChild(cardTitle);
    card.appendChild(cardContent);
    card.appendChild(cardDuration);

    return card;
}

const card1 = createCard('Title', 'Learn how to spice up your web page with dynamic card rendering!', '10 min');
const card2 = createCard('The Power of Flexibility', 'Discover the endless possibilities of dynamic content.', '20 min');

cardContainer.appendChild(card1);
cardContainer.appendChild(card2);