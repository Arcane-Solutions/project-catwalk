/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useContext } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import Styled from 'styled-components';
import PropTypes from 'prop-types';
import { GlobalContext } from '../App.jsx';

const modalRoot = document.getElementById('modal-root');

// Styled Components
const Modal = Styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 14;
`;
const Background = Styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 14;
`;
const Form = Styled.form`
  min-height: fit-content;
  max-height: 80vh;
  overflow-y: scroll;
  width: 50vw;
  padding: 50px;
  border-style: solid;
  border-radius: 10px;
  background: rgb(120, 100, 160);
  z-index: 15;
  display: flex;
  flex-direction: column;
`;
const FormEntry = Styled.textarea`
  resize: none;
  width: -webkit-fill-available;

  &:invalid {
    border: 2px dashed red;
  }

  &:valid {
    border: 2px solid lime;
  }
`;
const SpacedLabel = Styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 20px 0px;
`;
const HorizontalFlex = Styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`;
const ScaleEnds = Styled.div`
  font-size: 80%;
  display: flex;
  justify-content: center;
`;
const Wrap = Styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function CharacteristicFormatter(characteristic, id, setReviewCharacteristics) {
  console.log(characteristic, id);
  const [charValue, setCharValue] = useState(0);

  const radioButtonSettings = {
    Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too big'],
    Width: ['Too narrow', 'Slightly Narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below Average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  };

  return (
    <div className="characteristic-radio">
      <ScaleEnds>
        <div>
          {characteristic}
          {': '}
        </div>
        {charValue !== 0 && <p>{radioButtonSettings[characteristic][charValue - 1]}</p>}
      </ScaleEnds>
      <ScaleEnds onChange={(e) => {
        setCharValue(Number(e.target.value));
        setReviewCharacteristics((p) => ({ ...p, [id]: Number(e.target.value) }));
      }}
      >
        {radioButtonSettings[characteristic].map((buttonOption, index) => (
          <input
            type="radio"
            id="yes"
            name={characteristic}
            value={index + 1}
            checked={charValue === (index + 1)}
          />
        ))}
      </ScaleEnds>
      <ScaleEnds>
        <div>{radioButtonSettings[characteristic][0]}</div>
        {'   '}
        <div>{radioButtonSettings[characteristic][4]}</div>
      </ScaleEnds>
    </div>
  );
}

function ReviewModal({ onDismiss, id }) {
  const { characteristics } = useContext(GlobalContext).ratingsData;
  const [options, setOptions] = useState({
    product_id: id,
    name: '',
    email: '',
    body: '',
    rating: 1,
    summary: '',
    recommend: true,
    photos: [],
  });
  const [reviewCharacteristics, setReviewCharacteristics] = useState({});

  const formSubmit = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: '/shopdata/reviews',
      data: { ...options, characteristics: reviewCharacteristics },
    })
      .then((res) => {
        onDismiss();
      })
      .catch((err) => {
        alert('Submission Failed');
        console.log(err);
      });
  };

  const form = (
    <Modal>
      <Background onClick={onDismiss} />
      <Form onSubmit={(e) => formSubmit(e)}>
        <SpacedLabel className="nickname">
          Nickname:
          <FormEntry
            value={options.name}
            required
            placeholder="Example: Jackson11!"
            onChange={(e) => setOptions((p) => ({ ...p, name: e.target.value }))}
          />
          <div>For privacy resons, do not use your full name or email address</div>
        </SpacedLabel>
        <SpacedLabel className="email">
          Email:
          <FormEntry
            value={options.email}
            required
            placeholder="Example: Jackson11@Email.com"
            onChange={(e) => setOptions((p) => ({ ...p, email: e.target.value }))}
          />
          <div>For authentication reasons, you will not be emailed</div>
        </SpacedLabel>
        <SpacedLabel className="summary">
          Summary:
          <FormEntry
            value={options.summary}
            maxLength={60}
            placeholder="Why did you like the product or not?"
            onChange={(e) => setOptions((p) => ({ ...p, summary: e.target.value }))}
          />
        </SpacedLabel>
        <SpacedLabel className="body">
          Review:
          <FormEntry
            value={options.body}
            required
            type="text"
            minLength={50}
            maxLength={1000}
            placeholder="Example: Best purchase ever!"
            onChange={(e) => setOptions((p) => ({ ...p, body: e.target.value }))}
          />
        </SpacedLabel>
        <SpacedLabel className="rating">
          Rating:
          <FormEntry
            value={options.rating}
            required
            placeholder="Rating?"
            onChange={(e) => setOptions((p) => ({ ...p, rating: Number(e.target.value) }))}
          />
        </SpacedLabel>
        <Wrap>
          {
            Object.entries(characteristics)
              .map((characteristic) => (
                CharacteristicFormatter(characteristic[0], characteristic[1].id, setReviewCharacteristics)
              ))
          }
        </Wrap>
        <div className="recommend-indicator">
          <p>Would you recommend this product?</p>
          <div onChange={(e) => setOptions((p) => ({ ...p, recommend: e.target.value === 'yes' }))}>
            <input
              type="radio"
              id="yes"
              name="recommend"
              value="yes"
              checked={options.recommend}
            />
            <label htmlFor="yes">Yes</label>
            <input
              type="radio"
              id="no"
              name="recommmend"
              value="no"
              checked={!options.recommend}
            />
            <label htmlFor="no">No</label>
          </div>
        </div>
        <HorizontalFlex>
          <button type="button" value="Cancel" onClick={onDismiss}>Cancel</button>
          <input type="submit" value="sumbit" />
          {/* <button type="button" value="Submit" onClick={formSubmit}>Submit</button> */}
        </HorizontalFlex>
      </Form>
    </Modal>
  );

  return ReactDom.createPortal(form, modalRoot);
}

ReviewModal.proptypes = {
  onDismiss: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired,
};

export default ReviewModal;

// review opt: product_id, rating, summary, body, recommend, name, email, photos, characteristics
// question opt: body, name, email, product_id
