/*eslint-disable */
import useTopRecommendations from "../../../hooks/api/useTopRecommendations";

import Recommendation from "../../../components/Recommendation";

export default function Home() {
  const { recommendations, loadingRecommendations, listRecommendations } =
    useTopRecommendations();

  if ((loadingRecommendations && !recommendations) || !recommendations) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {recommendations.map((recommendation, index) => (
        <Recommendation
          key={recommendation.id}
          data-test={index}
          {...recommendation}
          onUpvote={() => listRecommendations()}
          onDownvote={() => listRecommendations()}
        />
      ))}

      {recommendations.length === 0 && (
        <div>No recommendations yet! Create your own :)</div>
      )}
    </>
  );
}
