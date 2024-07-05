
import {
    Avatar,
    Dropdown,
    DropdownAction,
    DropdownContent,
    DropdownItem,
    DropdownList,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarCollapseBtn,
    NavbarContainer,
    NavbarItem,
    NavbarList,
} from 'keep-react'
import { cerrarSesion } from '../../services/usuarioService';
import { User } from 'phosphor-react';

export const NavbarComponent = ({ usuario, handleUsuario }) => {
    return (
        <Navbar>
            <NavbarContainer>
                <NavbarBrand>
                    {/* <img src={KeepLogo} alt="keep" /> */}
                    <h2 className='text-2xl font-semibold text-white text-center mx-2'> Modulo Administrador</h2>
                </NavbarBrand>
                <NavbarList >
                </NavbarList>
                <NavbarList className='mx-2'>
                    <Dropdown placement="bottom-end" >
                        <DropdownAction asChild>
                            <Avatar size="lg" shape="circle" className='bg-sky-800' />
                        </DropdownAction>
                        <DropdownContent>
                            <DropdownList>
                                <DropdownItem disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 256 256"><path fill="#0284c7" d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8M72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56"/></svg>
                                    {usuario.nombre + " " + usuario.apellidos}</DropdownItem>

                                <DropdownItem onClick={() => cerrarSesion({ handleUsuario })}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48"><path fill="none" stroke="#e11d48" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M23.992 6H6v36h18m9-9l9-9l-9-9m-17 8.992h26" /></svg>
                                    Salir</DropdownItem>
                            </DropdownList>
                        </DropdownContent>
                    </Dropdown>
                </NavbarList>
                <NavbarCollapseBtn />
                <NavbarCollapse>
                    <NavbarItem>{usuario.nombre + "" + usuario.apellidos}</NavbarItem>
                    {/* <NavbarItem>Projects</NavbarItem>
                    <NavbarItem>Research</NavbarItem>
                    <NavbarItem>Contact</NavbarItem>
                    <NavbarItem>Sign In</NavbarItem> */}
                    <NavbarItem onClick={() => cerrarSesion({ handleUsuario })}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48">
                            <path fill="none" stroke="#FF0000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M23.992 6H6v36h18m9-9l9-9l-9-9m-17 8.992h26" /></svg>
                        Salir</NavbarItem>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    )
}

export default NavbarComponent;

