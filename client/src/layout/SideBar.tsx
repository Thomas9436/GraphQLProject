import NavPills from '../components/NavPills'

function SideBar() {
    return (
        <div className='sidebar'>
            <h4 className='logo'>Touitteur</h4>
            <div className="input-group input-group-sm mb-4 mt-4">
                <span className="input-group-text bg-none" id="basic-addon1"><i className="fa-solid fa-magnifying-glass"></i></span>
                <input type="text" className="form-control" placeholder="Recherche..." aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <NavPills />
        </div>
    )
}

export default SideBar