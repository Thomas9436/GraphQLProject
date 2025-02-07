import React, { useRef, useState } from 'react'
import image1 from "../assets/pexels-fotographiya-wedding-photography-823737813-30214743.jpg"
import { Article as ArticleType } from '../gql/graphql';
import { useAuth } from '../context/AuthContext';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'sonner';
import EditCommentModal from './EditCommentModal';
import EditArticleModal from './EditArticleModal';

  interface ArticleProps {
    article: ArticleType;
    refetch: () => void;
  }

  const ADD_COMMENT_MUTATION = gql`
    mutation CreateComment($articleId: ID!, $content: String!) {
      createComment(articleId: $articleId, content: $content) {
        code
        comment {
          content
          author {
            id
            username
          }
          createdAt
          id
        }
        success
        message
      }
    }
  `;

  const DELETE_COMMENT_MUTATION = gql`
    mutation DeleteComment($deleteCommentId: ID!) {
      deleteComment(id: $deleteCommentId) {
        code
        message
        success
      }
    }
  `;

  const DELETE_ARTICLE_MUTATION = gql`
    mutation DeleteArticle($deleteArticleId: ID!) {
      deleteArticle(id: $deleteArticleId) {
        code
        message
        success
      }
    }
  `;

  const LIKE_ARTICLE_MUTATION = gql`
    mutation CreateLike($articleId: ID!) {
      createLike(articleId: $articleId) {
        code
        like {
          articleId
          id
          user {
            id
            username
          }
        }
        message
        success
      }
    }
  `;

  const DISLIKE_ARTICLE_MUTATION = gql`
    mutation DeleteLike($articleId: ID!) {
      deleteLike(articleId: $articleId) {
        code
        message
        success
      }
    }
  `

  const Post: React.FC<ArticleProps> = ({ article, refetch }) => {
    const [selectedComment, setSelectedComment] = useState<{ id: string; content: string } | null>(null);
    const [selectedArticle, setSelectedArticle] = useState<{ id: string; title: string; content: string } | null>(null);
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const { user } = useAuth();
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    let isLiked = article.likes.find(like => like.user.id === user?.id) ? true : false
    const commentShow = article.comments.slice(0, (isExpanded ? article.comments.length : 2))

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
          onClick: () => deleteArticle({ variables: { deleteArticleId: article.id } }),
        },
      });
    };

    const [createComment, { loading: loadingComment }] = useMutation(ADD_COMMENT_MUTATION, {
      onCompleted: (data) => {
        const response = data.createComment;
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
      // toast.success('Commentaire ajouté avec succès')
      if(content){
        createComment({
        variables: {
          articleId: article.id,
          content,
        },
      });
      }
      
    };

    const [likeArticle, { loading: loadingLike }] = useMutation(LIKE_ARTICLE_MUTATION, {
      onCompleted: (data) => {
        if (data.createLike.success) {
          toast.success('Vous avez liké cet article')
          refetch()
          
        }else{
          setErrorMessage(data.createLike.message);
        }
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    });

    const handleLike = () => {
      likeArticle({
        variables: { articleId: article.id },
      });
    };

    const [dislikeArticle, { loading: loadingdisLike }] = useMutation(DISLIKE_ARTICLE_MUTATION, {
      onCompleted: (data) => {
        if (data.deleteLike.success) {
          toast.success('Vous avez déliké cet article')
          refetch()
          
        }else{
          setErrorMessage(data.deleteLike.message);
        }
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    });

    const handleDislike = () => {
      dislikeArticle({
        variables: { articleId: article.id },
      });
    };

    const [deleteComment, { loading: loadingDeleteComment }] = useMutation(DELETE_COMMENT_MUTATION, {
      onCompleted: (data) => {
        if (data.deleteComment.success) {
          console.log("Commentaire supprimé !");
          toast.success('Commentaire supprimé avec succès')
          refetch();
        } else {
          console.error("Erreur :", data.deleteComment.message);
        }
      },
      onError: (error) => {
        console.error("Erreur de suppression :", error.message);
      },
    });

    const handleDeleteComment = (commentId: String) => {
      toast('Voulez-vous vraiment supprimer ce commentaire ?', {
        action: {
          label: 'Oui',
          onClick: () => deleteComment({ variables: { deleteCommentId: commentId } }),
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
        return `Il y a ${months} mois`;
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
                  <div className=''>
                    {selectedArticle && selectedArticle.id === article.id && (
                      <EditArticleModal
                        articleId={selectedArticle.id}
                        currentTitle={selectedArticle.title}
                        currentContent={selectedArticle.content}
                        onClose={() => setSelectedArticle(null)}
                        refetchArticles={refetch}
                      />
                    )}
                    <button onClick={() => setSelectedArticle(article)} className='btn btn-sm btn-outline-success'>{loading ? "Suppression..." : <><i className="fa-solid fa-pen-to-square" style={{fontSize: ".9rem"}}></i> Modifier</>}</button>&nbsp;
                    <button onClick={handleDelete} disabled={loading} className='btn btn-sm btn-outline-danger'>{loading ? "Suppression..." : <><i className="fa-solid fa-trash" style={{fontSize: ".9rem"}}></i> Supprimer</>}</button>
                  </div>
                }
            </div>
            <h6 className='m-0'>{article.title}</h6>
            <p className='post-text p-0 m-0'>{article.content}</p>
        </div>
        <img src={'https://picsum.photos/1920/1080?random='+article.id} className='post-image' alt="" />
        <div className='post-buttons py-1 px-3 d-flex border-bottom'>
            <button 
              className={`like btn ${isLiked ? 'text-danger': ''}`} 
              onClick={isLiked ? handleDislike : handleLike} disabled={loadingLike}
            >
              {article.likes?.length} {isLiked ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
            </button>
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
                    commentShow.map(comment => (
                      <div className='comment d-flex gap-2'>
                        <div className='d-flex justify-content-between w-100 align-items-center'>
                          <p className='p-0 m-0 d-flex justify-content-center gap-2'>
                              <span className='fw-bold'>{user?.id === comment.author.id ? ' Moi' : comment.author.username}: </span> 
                              {comment.content}
                              
                          </p>
                          {
                            user?.id === comment.author.id &&
                            <div className='d-flex btns'>
                              <button className='btn btn-outline-success border-0' onClick={() => setSelectedComment({id: comment.id, content: comment.content})}><i className="fa-solid fa-pen-to-square" style={{fontSize: ".9rem"}}></i></button>
                              <button className='btn btn-outline-danger border-0' onClick={() => handleDeleteComment(comment.id)} disabled={loadingDeleteComment}><i className="fa-solid fa-trash" style={{fontSize: ".9rem"}}></i></button>
                            </div>
                          }
                        </div>
                        {selectedComment && selectedComment.id === comment.id && (
                          <EditCommentModal
                            commentId={selectedComment.id}
                            currentContent={selectedComment.content}
                            onClose={() => setSelectedComment(null)}
                            refetchComments={refetch}
                          />
                        )}
                      </div>
                    ))
                  }
                    
                </div>
                {
                  article.comments.length > 3 &&
                  <div className='border-top mt-3 text-center'>
                    {
                      isExpanded ?
                      <button className='btn text-primary btn-sm border-0 m-0 p-0 ' onClick={() => setIsExpanded(false)}>Réduire les commentaires</button>
                      :
                      <button className='btn text-primary btn-sm border-0 m-0 p-0 ' onClick={() => setIsExpanded(true)}>Voir tous les commentaires</button>
                    }
                  </div>
                }
                
            </div>
        </div>
    </div>
  )
}

export default Post