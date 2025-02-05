import React from 'react'

function Post() {
  return (
    <div className='post rounded shadow'>
        <div className="posthead p-3">
            <div className='d-flex gap-2'>
                <span className='profil'>
                    <i className="fa-solid fa-user"></i>
                </span>
                <div className='d-flex flex-column'>
                    <h6 className='p-0 m-0 username'>Abdul mounirou</h6>
                    <span className='time'>5 minutes ago</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post