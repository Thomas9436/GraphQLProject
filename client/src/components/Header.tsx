import { useAuth } from '../context/AuthContext';

function Header() {
    const { user, logout } = useAuth();

  return (
    <div className='header px-4'>
        <span className=''>
            <i className="fa-solid fa-house"></i> Home
        </span>
        <div className='d-flex gap-2 align-items-center'>
            <div className='d-flex gap-2 align-items-center '>
                <h6 className='username p-0 m-0'>{user?.username}</h6>
                <span className='profil'>
                    <i className="fa-solid fa-user"></i>
                </span>
            </div>
            <div className='separator'></div>
            <button className='btn btn-danger btn-sm' onClick={logout}>Se déconnecter</button>
        </div>
    </div>
  )
}

export default Header