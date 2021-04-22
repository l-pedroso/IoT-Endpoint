import view from './view'

view.registerHandler('addBtn', btnHandler);
view.registerHandler('acceptBtn', acceptHandler);
view.registerHandler('cancelBtn', cancelHandler);

let grupos = ['quarto', 'sala', 'cozinha', 'quintal', 'banheiro'];

view.updateUI(grupos);


function btnHandler(){
    view.showPopup();
}

function acceptHandler(){
    view.hiddenPopup()
    view.addGroup();
}

function cancelHandler(){
    view.hiddenPopup();
}


