// import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from 'react-markdown';

const REVIEW = gql`
    query GetReview($id: ID!) {
        review(id: $id) {
            data {
                attributes {
                    title
                    rating
                    body
                    categories {
                        data {
                          attributes {
                            name
                          }
                          id
                        }
                    }
                }
                id
            }
        }
    }
`

const ReviewDetails = () => {
    // const { loading, error, data } = useFetch('http://localhost:1337/api/reviews/' + id);
    const { id } = useParams();
    const { loading, error, data } = useQuery(REVIEW, {
        variables: {
            id: id
        }
    });

    if (loading) {
        return <p>Loading...</p>;
    };

    if (error) {
        return <p>Error :'(</p>;
    };

    return (
        <div>
            {data && <div className="review-card" >
                <div className="rating">{data.review.data.attributes.rating}</div>
                <h2>{data.review.data.attributes.title}</h2>
                {data.review.data.attributes.categories.data.map(console => (
                    <small key={console.id}>{console.attributes.name}</small>
                ))}
                <ReactMarkdown>{data.review.data.attributes.body}</ReactMarkdown>
            </div>}
        </div>
    )
}
export default ReviewDetails;