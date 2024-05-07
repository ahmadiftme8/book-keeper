// Elements related to the title section
const titleElement = document.getElementById('title');
const addBtnContainer = document.querySelector('.add-btn-container');
const addBtn = document.querySelector('.add-btn');

// Elements related to bookmarks
const bookmarkContainer = document.querySelector('.bookmark-container');
const bookmarkItems = document.querySelectorAll('.bookmark-container .item');
const deleteBookmarkBtn = document.getElementById('delete-bookmark');

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


    
    if(JSON.parse(localStorage.getItem('bookmarks'))){

        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        console.log('rerived bookmarks:', bookmarks);

    }else{
        console.log('array is empty');
    }


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
        console.log( 'forEch:',name, url);

        //item

        // Create the main div
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        // Create the SVG element
        let svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.setAttribute('title', 'Delete Bookmark');
        svgElement.setAttribute('id', 'delete-bookmark');
        svgElement.setAttribute('version', '1.1');
        svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgElement.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        svgElement.setAttribute('x', '0px');
        svgElement.setAttribute('y', '0px');
        svgElement.setAttribute('width', '122.878px');
        svgElement.setAttribute('height', '122.88px');
        svgElement.setAttribute('viewBox', '0 0 122.878 122.88');
        svgElement.setAttribute('enable-background', 'new 0 0 122.878 122.88');
        svgElement.setAttribute('xml:space', 'preserve');

        // Create the path element inside the SVG
        let pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttribute('d', 'M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z');

        // Append the path to the SVG
        svgElement.appendChild(pathElement);

        // Create the name div
        let nameDiv = document.createElement('div');
        nameDiv.classList.add('name');

        // Create the img element
        let imgElement = document.createElement('img');
        imgElement.setAttribute('src', `${url}/favicon.ico`);
        imgElement.setAttribute('alt', 'favicon');

        // Create the anchor element
        let anchorElement = document.createElement('a');
        anchorElement.setAttribute('href', `${url}`);
        anchorElement.setAttribute('target', '_blank');
        anchorElement.textContent = name;

        // Append the img and anchor to the name div
        nameDiv.appendChild(imgElement);
        nameDiv.appendChild(anchorElement);

        // Append the SVG and name div to the main div
        itemDiv.appendChild(svgElement);
        itemDiv.appendChild(nameDiv);
        console.log(itemDiv);

        // Now you can append itemDiv to wherever you want in your document
        // For example, to append it to the body:
        bookmarkContainer.appendChild(itemDiv);

        

    });
}




    //delete bookmark

    function deleteBookmark(url){
        console.log('delete url:',url);
    }

    // bookmark delete btn event listener
  



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
    console.log('book mark as object:', bookmark);

    bookmarks.push(bookmark);
    console.log('bookmarks array:',bookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    buildBookmarks();
    /* bookmarkForm.reset();
    websiteNameInput.focus(); */
    


}

// event listener
bookmarkForm.addEventListener('submit', storeBookmark);

//on load , fetch bookmark

buildBookmarks();