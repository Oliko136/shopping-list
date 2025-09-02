const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

// Add item feature
function addItem(e) {
    e.preventDefault();

    const newItem = itemInput.value.trim();

    // Validate input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    // Create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);

    itemInput.value = '';
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

// Remove item feature
function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure you want to delete this item?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

// Clear all items feature
function clearItems() {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
} 

// Event listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);