import Post from './Post'
import { gql, useMutation } from "@apollo/client";
import { Article, Article as ArticleType, CreateArticleResponse } from '../gql/graphql';
import { useState } from 'react';
import { toast } from 'sonner';

interface ListPostProps {
  articles: Article[];
  refetch: () => void;
}

const GET_ARTICLES_QUERY = gql`
  query GetArticles {
    getArticles {
      code
      message
      success
      articles {
        id
        title
        content
        likes {
          user {
            id
          }
          id
          articleId
        }
        comments {
          content
          author {
            id
            username
          }
          createdAt
          articleId
          id
        }
        createdAt
        author {
          id
          username
        }
      }
    }
  }
`;

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


const ListPosts: React.FC<ListPostProps> = ({articles, refetch}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [createArticle, { loading: creatingArticle }] = useMutation<CreateArticleResponse, { title: string; content: string }>(CREATE_ARTICLE_MUTATION, {
      onCompleted: (data) => {
      const response = data.createArticle;
      if (response?.success) {
        setTitle('');
        setContent('');
        setErrorMessage(null);
        toast.success('article créé avec succès')
      } else {
        setErrorMessage(response?.message || 'Erreur lors de la création de l\'article');
      }
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
    update(cache, { data: { createArticle } }) {
      const existingArticles = cache.readQuery<{ getArticles: { articles: ArticleType[] } }>({ query: GET_ARTICLES_QUERY });
      if (existingArticles) {
        const updatedArticles = [createArticle.article, ...existingArticles.getArticles.articles];
        cache.writeQuery({
          query: GET_ARTICLES_QUERY,
          data: { getArticles: { articles: updatedArticles } },
        });
      }
    },
  });

  

  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createArticle({
      variables: { title, content },
    });
  };

  return (
    <div className="left pt-4 d-flex flex-column gap-2">
        <form className='makepost rounded shadow p-3' onSubmit={handleSubmit}>
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
                  <button className='btn btn-outline-dark btn-sm btn-post' type='submit'>
                      {creatingArticle  ? 'Création en cours...' : <>Poster <i className="fa-regular fa-paper-plane"></i></>}
                  </button>
              </div>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>

        <div className='listPosts d-flex flex-column gap-2'>
            {
              articles?.length === 0 ? 
                <p>Aucun article disponible.</p>
              :
              articles?.map((article: ArticleType) => (
                <Post key={article.id} article={article} refetch={refetch} />
              ))
            }
            
        </div>
    </div>
    
  )
}

export default ListPosts