import React from 'react'

function Post() {
  return (
    <div className='post rounded shadow'>
        <div className="posthead p-3 ">
            <div className='d-flex justify-content-between mb-1'>
                <div className='d-flex gap-2 align-items-center'>
                    <span className='profil'>
                        <i className="fa-solid fa-user"></i>
                    </span>
                    <div className='d-flex flex-column'>
                        <h6 className='p-0 m-0 username'>Abdul mounirou</h6>
                        <span className='time'>5 minutes ago</span>
                    </div>
                </div>
                <div>
                    <button className='btn'><i className="fa-solid fa-ellipsis-vertical"></i></button>
                </div>
            </div>
            <p className='post-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos debitis consectetur aliquid, harum nesciunt aperiam provident in ab odio repellat ducimus illo voluptas incidunt? Possimus rem corporis labore explicabo deserunt.</p>
        </div>
        
    </div>
  )
}

export default Post