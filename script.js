// Elements related to the title section
const titleElement = document.getElementById('title');
const addBtnContainer = document.querySelector('.add-btn-container');
const addBtn = document.querySelector('.add-btn');

// Elements related to bookmarks
const bookmarkContainer = document.querySelector('.bookmark-container');
const bookmarkItems = document.querySelectorAll('.bookmark-container .item');

// Elements related to the modal
const modalContainer = document.getElementById('modalContainer');
const modal = document.querySelector('.modal');
const closeModalBtn = document.getElementById('close-modal');
const modalHeader = document.querySelector('.modal-header');
const modalContent = document.querySelector('.modal-content');

// Elements related to the bookmark form within the modal
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameInput = document.getElementById('website-name');
const websiteUrlInput = document.getElementById('website-url');
const saveBtn = document.querySelector('.save-btn');


let bookmarks = [];


//show modal, fucose on Input

function showModal(){
    modalContainer.style.display = 'flex';
    websiteNameInput.focus();
}




//modal event listener

addBtnContainer.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', ()=>{modalContainer.style.display = 'none'} );

window.addEventListener('click', (e)=> {
    if(e.target === modalContainer){
        modalContainer.style.display = 'none';
    }
});


//form validation
function validateForm(nameValue,urlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{2,}\.[a-z]{2,3}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/g;
    const regex = new RegExp(expression);

    if(!nameValue || !urlValue){
        alert('pleae submit values for both fields')
        return false;
    }

    if(!urlValue.match(regex)){
        alert('inter a valid url')
        return false;
    }

    //valid
    return true;
   
}

//build bookmark doms
function buildBookmarks(){
    //build items
    bookmarks.forEach((bookmark)=>{
        const {name, url} = bookmark;
        console.log(name, url);
    })
}

//fetch bookmarks
function fetchBookmarks(){
    // get bookmark from loacal storage if available
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }else{
        //create bookmark array in local storage
        bookmarks = [{
            name: 'Fatemeh Ahmadi',
            url: 'ahmadiftme.ir'
        },]
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    };
   buildBookmarks();
}


// handle data from form
function storeBookmark(e){
    e.preventDefault();
    const nameValue = websiteNameInput.value;
    let urlValue = websiteUrlInput.value;

    if (!urlValue.startsWith('http://') && !urlValue.startsWith('https://')) {
    urlValue = `https://${urlValue}`;
}
    if(!validateForm(nameValue,urlValue)){
        return false;
    }

    const bookmark = {
        name: nameValue,
        url: urlValue,
    };

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmark));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameInput.focus();


}

// event listener
bookmarkForm.addEventListener('submit', storeBookmark);

//on load , fetch bookmark

fetchBookmarks();