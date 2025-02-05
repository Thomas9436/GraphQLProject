import ListPosts from "./ListPosts"
import MakePost from "./MakePost"

function MainFil() {
  return (
    <div className='mainFil px-5'>
        <div className="left pt-4 d-flex flex-column gap-2">
            <MakePost />
            <ListPosts />
        </div>
        <div className="right">

        </div>
    </div>
  )
}

export default MainFil