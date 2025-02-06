import React from 'react'
import image1 from "../assets/pexels-fotographiya-wedding-photography-823737813-30214743.jpg"
import { Article as ArticleType } from '../gql/graphql';

interface ArticleProps {
    article: ArticleType;
  }

  const Post: React.FC<ArticleProps> = ({ article }) => {

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
                        <h6 className='p-0 m-0 username'>{article.author.username}</h6>
                        <span className='time'>{timeAgo(article.createdAt)}</span>
                    </div>
                </div>
                <div>
                    <button className='btn'><i className="fa-solid fa-ellipsis-vertical"></i></button>
                </div>
            </div>
            <h6 className='m-0'>{article.title}</h6>
            <p className='post-text p-0 m-0'>{article.content}</p>
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
                <h6 style={{fontSize: '13px'}}>{article.comments.length} commentaire{article.comments.length === 0 ? '' : 's'} <i className="fa-solid fa-angle-down"></i></h6>
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