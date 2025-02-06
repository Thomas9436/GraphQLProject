
function NavPills() {
  return (
    <nav className='nav'>
        <ul className="nav-pills">
            <li className="nav-item active rounded">
                <a className="nav-link ">
                    <i className="fa-solid fa-house"></i> Home
                </a>
            </li>
            {/* <li className="nav-item rounded">
                <a className="nav-link">
                    <i className="fa-solid fa-people-group"></i> Community
                </a>
            </li>
            <li className="nav-item rounded">
                <a className="nav-link">
                    <i className="fa-solid fa-arrow-trend-up"></i> Trending
                </a>
            </li> */}
        </ul>
    </nav>
  )
}

export default NavPills