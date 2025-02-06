import SideBar from '../layout/SideBar'
import MainComponent from '../components/MainComponent'
import { AuthProvider } from '../context/AuthContext'

function HomeView() {
  return (
    <div className='app'>
      <AuthProvider>
        <SideBar />
        <MainComponent />
      </AuthProvider>
    </div>
  )
}

export default HomeView