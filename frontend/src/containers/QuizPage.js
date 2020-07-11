import React from "react";
import { Row, Col, Divider } from "antd";
import PreStudyQuestionnaire from "./PreStudyQuestionnaire";

class QuizPage extends React.Component {
  render() {
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
            <Divider>Pre-Study Questionare</Divider>
            <p>
              Answer the statements on a scale from 1 (Strongly Agree) to 5
              (Strongly Disagree)
            </p>
            <Divider />
            <PreStudyQuestionnaire />
            <Divider />
          </Col>
        </Row>
      </div>
    );
  }
}
export default QuizPage;
