const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

// Display items to UI from local storage
function displayItems() {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach(item => addItemToDom(item));

    checkUI();
}

// Add item feature
function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value.trim();

    // Validate input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    // Create item DOM element
    addItemToDom(newItem);

    // Add item to local storage
    addItemToStorage(newItem);
    
    checkUI();

    itemInput.value = '';
}

function addItemToDom(item) {
    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    // Add li to the DOM
    itemList.appendChild(li);
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;

    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);

    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;

    return icon;
}

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    // Add new item to array
    itemsFromStorage.push(item);

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;
    
    localStorage.getItem('items') === null ?
        itemsFromStorage = [] :
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    
    return itemsFromStorage;
}

// Remove item feature
function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure you want to delete this item?')) {
            e.target.parentElement.parentElement.remove();

            checkUI();
        }
    }
}

// Clear all items feature
function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }

    checkUI();
}

// Filter items feature
function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const filter = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemText = item.firstChild.textContent.toLowerCase();

        itemText.indexOf(filter) !== -1 ?
            item.style.display = 'flex' :
            item.style.display = 'none';
    })
}

// Check and clear UI state feature
function checkUI() {
    const items = itemList.querySelectorAll('li');

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

// Event listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

checkUI();