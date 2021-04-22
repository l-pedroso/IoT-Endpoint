const addBtn = document.getElementById('new-group-btn');
const gradient = document.getElementById('gradient');
const popUp = document.getElementById('pop-up');
const groupContainer = document.getElementById('group-container');
const group = document.querySelectorAll('div.group');
const acceptBtn = document.getElementById('accept-btn');
const cancelBtn = document.getElementById('cancel-btn');
const inputName = document.getElementById('pop-up-input-name');



export default{

    registerHandler: function(type, callback){

        switch(type){
            case 'addBtn':
                addBtn.addEventListener('click',callback);
                break;

                case 'acceptBtn':
                    acceptBtn.addEventListener('click',callback);
                    break;

                    case 'cancelBtn':
                        cancelBtn.addEventListener('click',callback);
                        break;
        }
    },

    showPopup: function(){
        gradient.style.display = 'initial';
        popUp.style.display = 'flex';
        inputName.value = "";
    },

    hiddenPopup: function(){
        gradient.style.display = 'none';
        popUp.style.display = 'none';
    },


    addGroup: function(){
        const inputText = inputName.value;
        console.log(inputText.length);
        
        console.log(inputText);
        if(inputText != "" && inputText.length <= 12){
            groupContainer.insertAdjacentHTML('afterbegin',`<a href="../devices/devices.html" class="group flex-center" id="g-1">${inputText}</a>`);
        }   
    },

    updateUI: function(groups = new Array()){
        groups.forEach(element => {
            console.log(element);
            groupContainer.insertAdjacentHTML('afterbegin',`<a href="../devices/devices.html" class="group flex-center" id="g-1">${element}</a>`);
        });

    }
}




