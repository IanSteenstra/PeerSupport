import React from "react";
import { Button, Radio, Col, Row, Icon } from "antd";

class Question extends React.Component {
  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h6>{this.props.questionTitle}</h6>
        <Radio.Group
          onChange={this.props.radioChange}
          value={this.props.radioValues[this.props.slideNumber]}
        >
          <Radio style={radioStyle} value={1}>
            Strongly Agree
          </Radio>
          <Radio style={radioStyle} value={2}>
            Somewhat Agree
          </Radio>
          <Radio style={radioStyle} value={3}>
            Neutral
          </Radio>
          <Radio style={radioStyle} value={4}>
            Somewhat Disagree
          </Radio>
          <Radio style={radioStyle} value={5}>
            Strongly Disagree
          </Radio>
        </Radio.Group>
        <p></p>

        {this.props.position === "first" ? (
          <Row>
            <Col span={7} offset={5}>
              <Button type="primary" onClick={this.props.next}>
                Next Question
                <Icon type={"right"}></Icon>
              </Button>
            </Col>
          </Row>
        ) : this.props.position === "middle" ? (
          <Row>
            <Col span={12}>
              <Button type="secondary" onClick={this.props.previous}>
                <Icon type={"left"}></Icon>
                Previous Question
              </Button>
            </Col>
            <Col span={7} offset={5}>
              <Button type="primary" onClick={this.props.next}>
                Next Question
                <Icon type={"right"}></Icon>
              </Button>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col span={12}>
              <Button type="secondary" onClick={this.props.previous}>
                <Icon type={"left"}></Icon>
                Previous Question
              </Button>
            </Col>
            <Col span={6} offset={6}>
              <Button
                type="primary"
                loading={this.props.loading}
                onClick={this.props.enterLoading}
                style={{ background: "green", borderColor: "green" }}
              >
                Submit
                <Icon type={"check"}></Icon>
              </Button>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default Question;
