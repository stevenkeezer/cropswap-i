import {
  EuiButton,
  EuiButtonEmpty,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiTextArea,
} from "@elastic/eui";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import RatingSelect from "../components/RatingSelect";

export default ({
  successProductReview,
  loadingProductReview,
  errorProductReview,
  submitHandler,
  comment,
  setComment,
  userInfo,
  rating,
  setRating,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSwitchChecked, setIsSwitchChecked] = useState(true);
  const [superSelectvalue, setSuperSelectValue] = useState("option_one");

  const closeModal = () => setIsModalVisible(false);

  const showModal = () => setIsModalVisible(true);

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiOverlayMask onClick={closeModal}>
        <EuiModal onClose={closeModal} initialFocus="[name=popswitch]">
          <EuiModalHeader>
            <EuiModalHeaderTitle>Write a review</EuiModalHeaderTitle>
          </EuiModalHeader>

          <form onSubmit={submitHandler}>
            <EuiModalBody>
              <div className="tw-max-w-screen-lg tw-mx-10 tw-text-gray-800 tw-my-8 tw-mx-auto">
                <div>
                  <div>
                    {successProductReview && (
                      <Message variant="success">
                        Review submitted successfully
                      </Message>
                    )}
                    {loadingProductReview && <Loader />}
                    {errorProductReview && (
                      <Message variant="danger">{errorProductReview}</Message>
                    )}
                    {userInfo ? (
                      <>
                        <RatingSelect
                          controlId="rating"
                          rating={rating}
                          setRating={setRating}
                        />
                        <br></br>
                        <EuiTextArea
                          fullWidth
                          placeholder="Share your experience with this grower..."
                          aria-label="Use aria labels when no actual label is in use"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </>
                    ) : (
                      <Message>
                        Please <Link to="/login">sign in</Link> to write a
                        review{" "}
                      </Message>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="tw-font-bold tw-pb-3">Review tips</div>
                <li className="tw-py-1 tw-text-sm">
                  Write about your own personal experience.
                </li>
                <li className="tw-py-1 tw-text-sm">
                  Provide honest, accurate feedback about your experience.
                </li>
                <li className="tw-py-1 tw-text-sm">
                  Make sure your review is relevant to the business or product.
                </li>
              </div>
            </EuiModalBody>
            <EuiModalFooter>
              <EuiButton
                isDisabled={loadingProductReview}
                type="submit"
                fullWidth
                className="tw-font-bold"
                color="secondary"
                fill
              >
                Submit
              </EuiButton>
            </EuiModalFooter>
          </form>
        </EuiModal>
      </EuiOverlayMask>
    );
  }
  return (
    <div>
      <EuiButton
        onClick={showModal}
        color="secondary"
        fill
        className=" tw-px-2 tw-font-semibold tw-no-underline"
      >
        Write a review
      </EuiButton>

      {modal}
    </div>
  );
};
