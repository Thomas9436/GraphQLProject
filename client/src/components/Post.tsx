import React, { useState } from 'react'
import image1 from "../assets/pexels-fotographiya-wedding-photography-823737813-30214743.jpg"
import { Article as ArticleType } from '../gql/graphql';
import { useAuth } from '../context/AuthContext';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'sonner';

  interface ArticleProps {
    article: ArticleType;
    refetch: () => void;
  }

  const ADD_COMMENT_MUTATION = gql`
    mutation AddComment($articleId: ID!, $content: String!) {
      createComment(articleId: $articleId, content: $content) {
        comment {
          id
          content
          createdAt
          author {
            id
            username
          }
        }
        code
        message
        success
      }
    }
  `;

  const DELETE_ARTICLE_MUTATION = gql`
    mutation DeleteArticle($id: ID!) {
      deleteArticle(id: $id) {
        code
        message
        success
      }
    }
  `;

  const Post: React.FC<ArticleProps> = ({ article, refetch }) => {
    const { user } = useAuth();
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [deleteArticle, { loading, error }] = useMutation(DELETE_ARTICLE_MUTATION, {
      onCompleted: (data) => {
        if (data.deleteArticle.success) {
          console.log("Article supprimé !");
          toast.success('Article supprimé avec succès')
          refetch();
        } else {
          console.error("Erreur :", data.deleteArticle.message);
        }
      },
      onError: (error) => {
        console.error("Erreur de suppression :", error.message);
      },
    });
  
    const handleDelete = () => {
      toast('Voulez-vous vraiment supprimer cet article ?', {
        action: {
          label: 'Oui',
          onClick: () => deleteArticle({ variables: { id: article.id } }),
        },
      });
    };

    const [createComment, { loading: loadingComment }] = useMutation(ADD_COMMENT_MUTATION, {
      onCompleted: (data) => {
        const response = data.addComment;
        if (response?.success) {
          console.log("Commentaire ajouté:", response.comment);
          toast.success('Commentaire ajouté avec succès')
          setContent("");
          refetch()
        } else {
          setErrorMessage(response?.message || "Erreur lors de l'ajout du commentaire");
        }
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      toast.success('Commentaire ajouté avec succès')
      createComment({
        variables: {
          articleId: article.id,
          content,
        },
      });
    };

    const timeAgo = (date: string): string => {
      const now = new Date();
      const then = new Date(date);
      const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);
    
      const minute = 60;
      const hour = 60 * minute;
      const day = 24 * hour;
      const month = 30 * day;
      const year = 365 * day;
    
      // Calcul des différences
      if (diffInSeconds < minute) {
        return 'Il y a quelques secondes';
      } else if (diffInSeconds < hour) {
        const minutes = Math.floor(diffInSeconds / minute);
        return `Il y a ${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`;
      } else if (diffInSeconds < day) {
        const hours = Math.floor(diffInSeconds / hour);
        return `Il y a ${hours} ${hours > 1 ? 'heures' : 'heure'}`;
      } else if (diffInSeconds < month) {
        const days = Math.floor(diffInSeconds / day);
        return `Il y a ${days} ${days > 1 ? 'jours' : 'jour'}`;
      } else if (diffInSeconds < year) {
        const months = Math.floor(diffInSeconds / month);
        return `Il y a ${months} ${months > 1 ? 'mois' : 'mois'}`;
      } else {
        const years = Math.floor(diffInSeconds / year);
        return `Il y a ${years} ${years > 1 ? 'ans' : 'an'}`;
      }
    };
      
  return (
    <div className='post rounded shadow'>
        <div className="posthead p-3">
            <div className='d-flex justify-content-between mb-1'>
                <div className='d-flex gap-2 align-items-center'>
                    <span className='profil'>
                        <i className="fa-solid fa-user"></i>
                    </span>
                    <div className='d-flex flex-column'>
                        <h6 className='p-0 m-0 username'>{article.author.username}{user?.id === article.author.id ? ' (Moi)' : ''}</h6>
                        <span className='time'>{timeAgo(article.createdAt)}</span>
                    </div>
                </div>
                {
                  user?.id === article.author.id && 
                  <div>
                    <button onClick={handleDelete} disabled={loading} className='btn btn-sm btn-outline-danger'>{loading ? "Suppression..." : "Supprimer cet article"}</button>
                  </div>
                }
            </div>
            <h6 className='m-0'>{article.title}</h6>
            <p className='post-text p-0 m-0'>{article.content}</p>
        </div>
        <img src={image1} className='post-image' alt="" />
        <div className='post-buttons py-1 px-3 d-flex border-bottom'>
            <button className='like btn'><i className="fa-regular fa-thumbs-up"></i> liker l'article <span className="badge text-bg-light rounded-pill">12</span></button>
        </div>
        <div className='comments p-3'>
            <div className='d-flex gap-2 align-items-center'>
                <form className='w-100 input-group' onSubmit={handleSubmit}>
                    <input 
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="form-control form-control-sm " type="text" placeholder="Laisser un commentaire..." aria-label=".form-control-sm example" />
                    <button className="btn btn-primary border-0 rounded" type="submit" id="basic-addon2">{loadingComment ? "..." : <><i className="fa-regular fa-paper-plane"></i></>}</button>
                </form>
            </div>
            <div className='commentaires mt-2'>
                <h6 style={{fontSize: '13px'}}>{article.comments.length} commentaire{article.comments.length === 0 ? '' : 's'} <i className="fa-solid fa-angle-down"></i></h6>
                <div className="liste-comment px-2">
                  {
                    article.comments.length === 0 ? 
                    <p className='text-center text-muted'>Soyez le premier à commenter cet article</p>
                    :
                    article.comments.map(comment => (
                      <div className='comment d-flex gap-2'>
                        <p className='p-0 m-0'>
                            <span className='fw-bold'>{comment.author.username}: </span> {comment.content}
                        </p>
                      </div>
                    ))
                  }
                    
                </div>
                {
                  article.comments.length !== 0 &&
                  <div className='border-top mt-3 text-center'>
                    <button className='btn text-primary btn-sm border-0 m-0 p-0 '>Voir tous les commentaires</button>
                  </div>
                }
                
            </div>
        </div>
    </div>
  )
}

export default Post