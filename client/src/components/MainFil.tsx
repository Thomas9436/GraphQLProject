import ListPosts from "./ListPosts"
import MakePost from "./MakePost"

function MainFil() {
  return (
    <div className='mainFil px-5 d-flex gap-5'>
        <div className="left pt-4 d-flex flex-column gap-2">
            <MakePost />
            <ListPosts />
        </div>
        <div className="right pt-4">
            <div className="filter rounded shadow p-3">
                <h6 className="p-0 m-0"><i className="fa-solid fa-filter"></i> Filtrer par</h6>
                <hr />
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Auteur
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Popularité
                    </label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MainFil