import React from 'react'

function MakePost() {
  return (
    <div className='makepost rounded shadow p-3'>
        <div className='d-flex gap-3 '>
            <span className='profil'>
                <i className="fa-solid fa-user"></i>
            </span>
            <form className='w-100'>
                <input className="form-control form-control-sm " type="text" placeholder="What's on your mind ?" aria-label=".form-control-sm example" />
            </form>
        </div>
        <div className='d-flex justify-content-between mt-1 pl-5'>
            <div className="buttons d-flex gap-3">
                <button className="make-button btn"><i className="fa-solid fa-camera"></i></button>
                <button className="make-button btn"><i className="fa-regular fa-image"></i></button>
                <button className="make-button btn"><i className="fa-solid fa-paperclip"></i></button>
                <button className="make-button btn"><i className="fa-solid fa-location-dot"></i></button>
                <button className="make-button btn"><i className="fa-regular fa-face-smile-wink"></i></button>
            </div>
            <div>
                <button className='btn btn-outline-dark btn-sm btn-post'>
                    Poster <i className="fa-regular fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>
  )
}

export default MakePost