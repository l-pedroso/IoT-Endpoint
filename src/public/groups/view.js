var addBtn = document.getElementById('new-group-btn');
var gradient = document.getElementById('gradient');
var popUp = document.getElementById('pop-up');
var groupContainer = document.getElementById('group-container');
var group = document.querySelectorAll('div.group');
var acceptBtn = document.getElementById('accept-btn');
var cancelBtn = document.getElementById('cancel-btn');
var inputName = document.getElementById('pop-up-input-name');

export default {

    registerHandler: function registerHandler(type, callback) {

        switch (type) {
            case 'addBtn':
                addBtn.addEventListener('click', callback);
                break;

            case 'acceptBtn':
                acceptBtn.addEventListener('click', callback);
                break;

            case 'cancelBtn':
                cancelBtn.addEventListener('click', callback);
                break;
        }
    },

    showPopup: function showPopup() {
        gradient.style.display = 'initial';
        popUp.style.display = 'flex';
        inputName.value = "";
    },

    hiddenPopup: function hiddenPopup() {
        gradient.style.display = 'none';
        popUp.style.display = 'none';
    },

    addGroup: function addGroup() {
        var inputText = inputName.value;
        console.log(inputText.length);

        console.log(inputText);
        if (inputText != "" && inputText.length <= 12) {
            groupContainer.insertAdjacentHTML('afterbegin', '<a href="/api/v1/devices" class="group flex-center" id="g-1">' + inputText + '</a>');
        }
    },

    updateUI: function updateUI() {
        var groups = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Array();

        groups.forEach(function (element) {
            console.log(element);
            groupContainer.insertAdjacentHTML('afterbegin', '<a href="/api/v1/devices" class="group flex-center" id="g-1">' + element + '</a>');
        });
    }
};