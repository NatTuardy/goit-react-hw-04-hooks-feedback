import React, { Component, useState } from "react";
import FeedbackOptions from "../feedbackOptions/FeedbackOptions";
import Statistics from "../statistics/Statistics";
import Section from "../sectionTitle/Section";
import Notification from "../notification/Notification";
import { copyInNewObject } from "../../helpers/copyInNewObject";
import { hasCountTotal } from "../../helpers/hasCountTotal";

const MainPage = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  })

  const  handleClick = (name) => {
    const newName = name.toLowerCase();
    setState((prevState) => ({
      ...prevState,
      [newName]: prevState[newName] + 1,
    }));
  };

  const   countPositiveFeedbackPercentage = () => {
    const newState = copyInNewObject(state);
    const positive = Object.values(newState)[0];
    const total = hasCountTotal(newState);
    return Math.round((positive / total) * 100);
  };

  const   countTotalFeedback = () => {
    const newState = copyInNewObject(state);
    const total = hasCountTotal(newState);
    return total;
  };

  const { good, neutral, bad } = state;
    const options = Object.keys(state);
    const total = countTotalFeedback()

  return (      <>
    <Section title="Please leave feedback">
      <FeedbackOptions
        options={options}
        onLeaveFeedback={handleClick}
      />
    </Section>
    <Section title="Statistics">
      {total ? (
        <Statistics
          data={state}
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      ) : (
        <Notification message="No feedback given" />
      )}
    </Section>
  </> );
}
 
export default MainPage;


