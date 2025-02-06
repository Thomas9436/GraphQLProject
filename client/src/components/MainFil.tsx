import ListPosts from "./ListPosts"

function MainFil() {
  return (
    <div className='mainFil px-5 d-flex gap-5'>
        <ListPosts />
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