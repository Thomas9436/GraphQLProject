import React from 'react'
import { Link, NavLink } from 'react-router'
import NavPills from '../components/NavPills'

function SideBar() {
  return (
    <div className='sidebar'>
        <h4 className='logo'>Touitteur</h4>
        <hr />
        <NavPills />
    </div>
  )
}

export default SideBar