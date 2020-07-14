import React from "react";
import { Row, Col, Divider } from "antd";
import PreStudyQuestionnaire from "./PreStudyQuestionnaire";
import PostStudyQuestionnaire from "./PostStudyQuestionnaire";
import WeekPostStudyQuestionnaire from "./WeekPostStudyQuestionnaire";
import { NavLink } from "react-router-dom";

const QuizPage = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 40,
        paddingTop: 20,
        minWidth: 0,
        minHeight: 0,
      }}
    >
      <Row type="flex" justify="center" align="middle">
        <Col span={12}>
          {props.location.pathname === "/quiz/1" ? (
            <div>
              <Divider>Pre-Study Questionare</Divider>
              <p>
                Answer the statements on a scale from 1 (Strongly Agree) to 5
                (Strongly Disagree)
              </p>
              <Divider />
              <PreStudyQuestionnaire />
              <Divider />
            </div>
          ) : props.location.pathname === "/quiz/2" ? (
            <div>
              <Divider>Post-Study Questionare</Divider>
              <p>
                Answer the statements on a scale from 1 (Strongly Agree) to 5
                (Strongly Disagree)
              </p>
              <Divider />
              <PostStudyQuestionnaire />
              <Divider />
            </div>
          ) : props.location.pathname === "/quiz/3" ? (
            <div>
              <Divider>1-Week Post-Study Questionare</Divider>
              <p>
                Answer the statements on a scale from 1 (Strongly Agree) to 5
                (Strongly Disagree)
              </p>
              <Divider />
              <WeekPostStudyQuestionnaire />
              <Divider />
            </div>
          ) : (
            <div>
              <Row style={{ padding: "5px" }}>
                <NavLink to={{ pathname: "/quiz/1" }}>Pre-Study Quiz</NavLink>
              </Row>
              <Row style={{ padding: "5px" }}>
                <NavLink to={{ pathname: "/quiz/2" }}>Post-Study Quiz</NavLink>
              </Row>
              <Row style={{ padding: "5px" }}>
                <NavLink to={{ pathname: "/quiz/3" }}>
                  1-Week Post-Study Quiz
                </NavLink>
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default QuizPage;
