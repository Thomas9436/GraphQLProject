import React from 'react'
import Post from './Post'

function ListPosts() {
  return (
    <div className='listPosts d-flex flex-column gap-2'>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
    </div>
  )
}

export default ListPosts