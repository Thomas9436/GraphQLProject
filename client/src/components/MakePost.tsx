import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { CreateArticleResponse } from '../gql/graphql'; // Assurez-vous d'importer les types générés

// Mutation pour créer un article
const CREATE_ARTICLE_MUTATION = gql`
  mutation CreateArticle($title: String!, $content: String!) {
    createArticle(title: $title, content: $content) {
      article {
        id
        title
        content
        createdAt
      }
      code
      message
      success
    }
  }
`;

function MakePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [createArticle, { loading, data }] = useMutation<CreateArticleResponse, { title: string; content: string }>(CREATE_ARTICLE_MUTATION, {
        onCompleted: (data) => {
            const response = data.createArticle
            if (response?.success) {
                console.log('Article créé:', response.article);
            } else {
                setErrorMessage(response?.message || 'Erreur lors de la création de l\'article');
            }
        },
        onError: (error) => {
            setErrorMessage(error.message);
        },
    });
  return (
    <form className='makepost rounded shadow p-3'>
        <div className='d-flex gap-2'>
            <span className='profil'>
                <i className="fa-solid fa-user"></i>
            </span>
            <div className='w-100'>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-control form-control-sm " 
                    type="text" placeholder="Title" 
                    aria-label=".form-control-sm example" 
                    required
                />
                <div className='mt-2'>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        placeholder="What's on your mind ?"
                        className="form-control"
                    ></textarea>
                </div>
            </div>
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
                <button className='btn btn-outline-dark btn-sm btn-post' type='button'>
                    Poster <i className="fa-regular fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </form>
  )
}

export default MakePost