import React from 'react'
import image1 from "../assets/pexels-fotographiya-wedding-photography-823737813-30214743.jpg"

function Post() {
  return (
    <div className='post rounded shadow'>
        <div className="posthead p-3">
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
            <p className='post-text p-0 m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos debitis consectetur aliquid, harum nesciunt aperiam provident in ab odio repellat ducimus illo voluptas incidunt? Possimus rem corporis labore explicabo deserunt.</p>
        </div>
        <img src={image1} className='post-image' alt="" />
        <div className='post-buttons py-1 px-3 d-flex border-bottom'>
            <button className='like btn'><i className="fa-regular fa-thumbs-up"></i> liker le post <span className="badge text-bg-light rounded-pill">12</span></button>
        </div>
        <div className='comments p-3'>
            <div className='d-flex gap-2 align-items-center'>
                <div className='w-100 input-group'>
                    <input className="form-control form-control-sm " type="text" placeholder="Laisser un commentaire..." aria-label=".form-control-sm example" />
                    <button className="btn btn-primary border-0 rounded" type="button" id="basic-addon2"><i className="fa-regular fa-paper-plane"></i></button>
                </div>
            </div>
            <div className='commentaires mt-2'>
                <h6 style={{fontSize: '13px'}}>12 commentaires <i className="fa-solid fa-angle-down"></i></h6>
                <div className="liste-comment px-2">
                    <div className='comment d-flex gap-2'>
                        <p className='p-0 m-0'>
                            <span className='fw-bold'>Thomas: </span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque vel accusamus, facere ut voluptatum maiores temporibus ratione, doloribus rerum sapiente, autem expedita delectus eos.
                        </p>
                    </div>
                </div>
                <div className='border-top mt-3 text-center'>
                    <button className='btn text-primary btn-sm border-0 m-0 p-0 '>Voir tous les commentaires</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post