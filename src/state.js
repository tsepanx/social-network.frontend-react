let state = {
    posts: {
        items: [
            {title: 'AAA', description: 'Do smdsfsdfdsfth...', completed: false},
            {title: 'bbb', description: 'Do more!', completed: false},
            {title: 'CCC', description: 'Do not do anything', completed: false}
        ]
    }
};

export let addCard = (newCard) => { state.posts.items.push(newCard) }
export let updateCard = (cardId, updatedCard) => {
    // debugger
    state.posts.items[cardId] = updatedCard}
    // debugger

export default state