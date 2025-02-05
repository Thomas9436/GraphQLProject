import { Link } from "react-router-dom";

function Header() {
  return (
    <div className='header container px-4'>
      <span className=''>
        <i className="fa-solid fa-house"></i> Home
      </span>
      <div className='d-flex gap-2 align-items-center'>
        <div className='d-flex gap-2 align-items-center '>
          <h6 className='username p-0 m-0'>Abdul kodir</h6>
          <span className='profil'>
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
        <div className='separator'></div>
        <Link to="/login" className="btn btn-danger btn-sm">
          Se déconnecter
        </Link>
      </div>
    </div>
  )
}

export default Header