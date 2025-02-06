import Post from './Post'
import { gql, useQuery } from "@apollo/client";
import { Article as ArticleType } from '../gql/graphql';

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
        createdAt
        author {
          id
          username
        }
      }
    }
  }
`;

function ListPosts() {
  const { data, loading, error } = useQuery(GET_ARTICLES_QUERY);

  if (loading) return <p>Chargement des articles...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const articles = data?.getArticles?.articles;

  return (
    <div className='listPosts d-flex flex-column gap-2'>
        {
          articles?.length === 0 ? 
            <p>Aucun article disponible.</p>
          :
          articles?.map((article: ArticleType) => (
            <Post key={article.id} article={article} />
          ))
        }
        
    </div>
  )
}

export default ListPosts