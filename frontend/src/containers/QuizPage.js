import React from "react";
import { Row, Col, Divider } from "antd";
import PreStudyQuestionnaire from "./PreStudyQuestionnaire";
import PostStudyQuestionnaire from "./PostStudyQuestionnaire";
import WeekPostStudyQuestionnaire from "./WeekPostStudyQuestionnaire";

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
          {props.location.aboutProps.type === 1 ? (
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
          ) : props.location.aboutProps.type === 2 ? (
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
          ) : (
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
          )}
        </Col>
      </Row>
    </div>
  );
};
export default QuizPage;
