import Dropdown from 'react-bootstrap/Dropdown'
import * as style from './menu.module.css'

export default class DropMenu extends React.Component{
    render(){
        return(
            <Dropdown bsPrefix={style.menu}>
                <Dropdown.Toggle  bsPrefix={style.btn} as="div">
                    <ion-icon name="reorder-three-outline"></ion-icon>
                </Dropdown.Toggle>

                <Dropdown.Menu bsPrefix={style.list}>
                    <Dropdown.Item>Perfil</Dropdown.Item>
                    <Dropdown.Item>Conta</Dropdown.Item>
                    <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
} 