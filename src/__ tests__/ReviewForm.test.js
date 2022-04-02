import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import UserContext from "../hooks/useUserContext";

const {
  currentAdminUser,
  reviewee, review
} = require("./_testCommon");

// smoke test
it('renders without crashing', function () {
  render(
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser: currentAdminUser(), function() { } }}>
        <ReviewForm setReview={function () { }} review={review} 
          setShowReviewForm={function () {}} reviewee={reviewee()}/>
      </UserContext.Provider>
    </BrowserRouter>
  );
});

//snapshot test
it("matches snapshot", function () {
  const { asFragment } = render(
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser: currentAdminUser(), function() { } }}>
        <ReviewForm setReview={function () { }} review={review} 
          setShowReviewForm={function () {}} reviewee={reviewee()}/>
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should have 'Your review' in the component.", function () {
  const { getByText } = render(
    <BrowserRouter>
      <UserContext.Provider
        value={{ currentUser: currentAdminUser(), function() { } }}>
        <ReviewForm setReview={function () { }} review={review} 
          setShowReviewForm={function () {}} reviewee={reviewee()}/>
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(getByText("Your review")).toBeInTheDocument();
});
