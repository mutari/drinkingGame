class Card {

    #image;
    #name
    #code;

    constructor(image, name, code) {
        this.#image = image;
        this.#name = name;
        this.#code = code;
    }

    getImage() {
        return this.#image;
    }

    getName() {
        return this.#name
    }

    getCode() {
        return this.#code;
    }

}

const all_cards = [
    new Card('assets/images/style2/card_b_c2_large.png', '', 'bc2'),
    new Card('assets/images/style2/card_b_c3_large.png', '', 'bc3'),
    new Card('assets/images/style2/card_b_c4_large.png', '', 'bc4'),
    new Card('assets/images/style2/card_b_c5_large.png', '', 'bc5'),
    new Card('assets/images/style2/card_b_c6_large.png', '', 'bc6'),
    new Card('assets/images/style2/card_b_c7_large.png', '', 'bc7'),
    new Card('assets/images/style2/card_b_c8_large.png', '', 'bc8'),
    new Card('assets/images/style2/card_b_c9_large.png', '', 'bc9'),
    new Card('assets/images/style2/card_b_c10_large.png', '', 'bc10'),
    new Card('assets/images/style2/card_b_ca_large.png', '', 'bca'),
    new Card('assets/images/style2/card_b_cj_large.png', '', 'bcj'),
    new Card('assets/images/style2/card_b_ck_large.png', '', 'bck'),
    new Card('assets/images/style2/card_b_cq_large.png', '', 'bcq'),
    new Card('assets/images/style2/card_b_d2_large.png', '', 'bd2'),
    new Card('assets/images/style2/card_b_d3_large.png', '', 'bd3'),
    new Card('assets/images/style2/card_b_d4_large.png', '', 'bd4'),
    new Card('assets/images/style2/card_b_d5_large.png', '', 'bd5'),
    new Card('assets/images/style2/card_b_d6_large.png', '', 'bd6'),
    new Card('assets/images/style2/card_b_d7_large.png', '', 'bd7'),
    new Card('assets/images/style2/card_b_d8_large.png', '', 'bd8'),
    new Card('assets/images/style2/card_b_d9_large.png', '', 'bd9'),
    new Card('assets/images/style2/card_b_d10_large.png', '', 'bd10'),
    new Card('assets/images/style2/card_b_da_large.png', '', 'bda'),
    new Card('assets/images/style2/card_b_dj_large.png', '', 'bdj'),
    new Card('assets/images/style2/card_b_dk_large.png', '', 'bdk'),
    new Card('assets/images/style2/card_b_dq_large.png', '', 'bdq'),
    new Card('assets/images/style2/card_b_h2_large.png', '', 'bh2'),
    new Card('assets/images/style2/card_b_h3_large.png', '', 'bh3'),
    new Card('assets/images/style2/card_b_h4_large.png', '', 'bh4'),
    new Card('assets/images/style2/card_b_h5_large.png', '', 'bh5'),
    new Card('assets/images/style2/card_b_h6_large.png', '', 'bh6'),
    new Card('assets/images/style2/card_b_h7_large.png', '', 'bh7'),
    new Card('assets/images/style2/card_b_h8_large.png', '', 'bh8'),
    new Card('assets/images/style2/card_b_h9_large.png', '', 'bh9'),
    new Card('assets/images/style2/card_b_h10_large.png', '', 'bh10'),
    new Card('assets/images/style2/card_b_ha_large.png', '', 'bha'),
    new Card('assets/images/style2/card_b_hj_large.png', '', 'bhj'),
    new Card('assets/images/style2/card_b_hk_large.png', '', 'bhk'),
    new Card('assets/images/style2/card_b_hq_large.png', '', 'bhq'),
    new Card('assets/images/style2/card_b_s2_large.png', '', 'bs2'),
    new Card('assets/images/style2/card_b_s3_large.png', '', 'bs3'),
    new Card('assets/images/style2/card_b_s4_large.png', '', 'bs4'),
    new Card('assets/images/style2/card_b_s5_large.png', '', 'bs5'),
    new Card('assets/images/style2/card_b_s6_large.png', '', 'bs6'),
    new Card('assets/images/style2/card_b_s7_large.png', '', 'bs7'),
    new Card('assets/images/style2/card_b_s8_large.png', '', 'bs8'),
    new Card('assets/images/style2/card_b_s9_large.png', '', 'bs9'),
    new Card('assets/images/style2/card_b_s10_large.png', '', 'bs10'),
    new Card('assets/images/style2/card_b_sa_large.png', '', 'bsa'),
    new Card('assets/images/style2/card_b_sj_large.png', '', 'bsj'),
    new Card('assets/images/style2/card_b_sk_large.png', '', 'bsk'),
    new Card('assets/images/style2/card_b_sq_large.png', '', 'bsq'),
];
let used_cards = all_cards;

document.addEventListener("DOMContentLoaded", () => {

    let gameBoard = document.querySelector('#game-board');
    let mainBoard = gameBoard.querySelector('#main');
    let sidePanel = gameBoard.querySelector('#side');

    for(let i = 0; i < 9; i++) {
        let card = createCard(new Card('assets/images/Deck/deck_4_large.png', '', ''));
        if(i === 0)
            card.querySelector('.card').classList.add('first');
        card.querySelector('.card').dataset.pos = i;
        sidePanel.append(card);
    }

    const ace = ['bca', 'bda', 'bha', 'bsa'];
    for(let i = 1; i <= 4; i++) {
        let row = mainBoard.querySelector(`#row-${i}`);
        row.append(createCard(getAndRemoveCardByCode(ace[i-1])));
    }


    document.querySelector('#start-dialog').showModal();

});

let loop;
function startGame() {
    document.querySelector('#start-dialog').close();

    loop = setInterval(() => {
        drawCard();
    }, 1000)

}

let drawn = false;
function drawCard() {

    if(drawn)
        return;

    drawn = true;

    let card = getAndRemoveRandomCard();

    moveAce(`b${card.getCode().charAt(1)}a`)

    if(checkIfWon())
        return clearInterval(loop)

    showCardDialog(card);

    setTimeout(() => {
        closeCardDialog();
        drawn = false;
    }, 900)
}

function showCardDialog(card, title = 'Card') {
    document.querySelector('#card-dialog').close();
    document.querySelector('#card-dialog div').innerHTML = "";
    document.querySelector('#card-dialog div').append(createCard(card));
    document.querySelector('#card-dialog h4').innerText = title;
    document.querySelector('#card-dialog').showModal();
}

function closeCardDialog() {
    document.querySelector('#card-dialog').close();
}

function moveAce(code, back = false) {
    let ace = document.querySelector(`[data-code="${code}"]`)
    if(back)
        ace.dataset.pos = parseInt(ace.dataset.pos) - 1;
    else
        ace.dataset.pos = parseInt(ace.dataset.pos) + 1;
    let width = ace.offsetHeight;
    ace.style.marginTop = `${width * parseInt(ace.dataset.pos) + 5}px`;
    checkIfShouldRotateSideCard();

}

function checkIfWon() {
    let cardDiv = document.querySelector('[data-pos="9"]')
    if(!cardDiv)
        return false;

    const src = cardDiv.querySelector('img').src;
    showCardDialog(new Card(src, '', cardDiv.dataset.code), 'Winner! 🎉')

    return true;
}

function checkIfShouldRotateSideCard() {
    let lowest = -1;
    document.querySelectorAll('[data-code="bca"], [data-code="bda"], [data-code="bha"], [data-code="bsa"]').forEach(element => {
        if(lowest === -1 || parseInt(element.dataset.pos) <= lowest)
            lowest = parseInt(element.dataset.pos);
    })

    if(lowest <= 0)
        return;

    let sideCard = document.querySelector(`#side [data-pos="${lowest}"]`)
    if(sideCard.dataset.played)
        return;

    sideCard.dataset.played = true;

    let card = getAndRemoveRandomCard();
    sideCard.querySelector('img').src = card.getImage();
    sideCard.dataset.code = card.getCode();
    moveAce(`b${card.getCode().charAt(1)}a`, true);
}

function createCard(card) {
    let template = document.querySelector('#card-template');
    let cardDiv = template.content.cloneNode(true);
    cardDiv.querySelector('.card').dataset.code = card.getCode();
    cardDiv.querySelector('.card').dataset.pos = 0;
    if(card.getImage())
        cardDiv.querySelector('img').src = card.getImage();

    return cardDiv;
}

function getRandomCard() {
    return used_cards[Math.floor(Math.random() * used_cards.length)]
}

function getAndRemoveRandomCard() {
    return removeCard(getRandomCard());
}

function removeCard(card) {
    used_cards = used_cards.filter(c => c !== card);
    return card;
}

function getAndRemoveCardByCode(code) {
    return removeCard(getCardByCode(code));
}

function getCardByCode(code) {
    for (const card of used_cards)
        if(card.getCode() === code)
            return card;
}