export default class Popup extends React.Component{

    render(){
        return(    
        <div id="pop-up" class="flex-center">
        <div class="pop-up-container">
             <h4 class="pop-up-title">Novo Grupo</h4>
             <input type="text" id="pop-up-input-name" placeholder="Nome do grupo" maxlength="12"></input>
             <div class="pop-up-button-container">
                <button id="accept-btn" class="pop-up-btn">Confirma</button>
                <button id="cancel-btn" class="pop-up-btn">Cancela</button>
             </div>     
        </div>       
        </div>
    )
    }
}