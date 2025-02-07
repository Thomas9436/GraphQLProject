import { useEffect, useMemo, useState } from "react"
import ListPosts from "./ListPosts"
import { gql, useMutation, useQuery } from "@apollo/client";
import { Article } from "../gql/graphql";



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

function MainFil() {
    // const [selectedAuthors, setSelectedAuthors] = useState<string[]>([])
    const [sortOrder, setSortOrder] = useState<string>('asc');
    const [uniqueAuthors, setUniqueAuthors] = useState<(string | boolean)[][]>([]);
    const { data, loading: loadingArticles, error: queryError, refetch  } = useQuery(GET_ARTICLES_QUERY);
    

    // const sortArticles = (articles: Article[], order: string) => {
    //     return articles.sort((a, b) => {
    //         const likesA = a.likes.length;
    //         const likesB = b.likes.length;
    //         if (order === 'asc') {
    //             return likesA - likesB;
    //         } else {
    //             return likesB - likesA;
    //         }
    //     });
    // };

    const articles: Article[] = data?.getArticles?.articles || [];
    // const sortedArticles = sortArticles(articles, sortOrder);

    useEffect(() => {
        if (articles.length > 0) {
            const selectedAuthors: (string | boolean)[][] = articles.map((article) => [article.author.id, article.author.username, true]);

            // Suppression des doublons en utilisant une Map
            const unique = Array.from(
                new Map(selectedAuthors.map(author => [author[0], author])).values()
            );
            
            setUniqueAuthors(unique);
        }
    }, [articles]);

    if (loadingArticles) return <p>Chargement des articles...</p>;
    if (queryError) return <p>Erreur : {queryError.message}</p>;

    const handleCheckboxChange = (index: number) => {
        setUniqueAuthors((prev) =>
            prev.map((author, i) =>
                i === index ? [author[0], author[1], !author[2]] : author
            )
        );
    };

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSortOrder(e.target.value);
    };


    // // Filtrage des articles selon les auteurs sélectionnés
    const filteredArticles = articles.filter(article =>
        uniqueAuthors.find(author => author[0] === article.author.id)?.[2] === true
    );

  return (
    <div className='mainFil px-5 d-flex gap-5'>
        <ListPosts articles={filteredArticles} refetch={refetch}/>
        <div className="right pt-4">
            <div className="filter rounded shadow p-3">
                <h6 className="p-0 m-0"><i className="fa-solid fa-filter"></i> Filtre</h6>
                <hr />
                <h6 className="p-0 m-0 mb-2"><i className="fa-solid fa-filter"></i> Par auteur</h6>
                {
                    uniqueAuthors.map((author, index) => (
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="flexCheckChecked" checked={Boolean(author[2])} onChange={() => handleCheckboxChange(index)} />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                {author[1]}
                            </label>
                        </div>
                    ))
                }
                <hr />
                <h6 className="p-0 m-0 mb-2"><i className="fa-solid fa-filter"></i> Par popularité</h6>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
                        value="asc"
                        checked={sortOrder === 'asc'}
                        onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        ascendant
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  
                        value="desc"
                        checked={sortOrder === 'desc'}
                        onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        descendant
                    </label>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MainFil