import Dropdown from 'react-bootstrap/Dropdown'

export default class DropMenu extends React.Component{
    render(){
        return(
            <Dropdown className="drop-menu">
                <Dropdown.Toggle className="menu-btn flex-center" as="div">
                    <ion-icon name="reorder-three-outline"></ion-icon>
                </Dropdown.Toggle>

                <Dropdown.Menu className="menu-list flex-center">
                    <Dropdown.Item>Perfil</Dropdown.Item>
                    <Dropdown.Item>Conta</Dropdown.Item>
                    <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
} 