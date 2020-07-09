import React, { Component } from "react";
import { Carousel, Button, Radio, message, Col, Row, Icon } from "antd";
export default class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();
  }
  state = {
    radioValues: [0, 0, 0, 0],
    slideNumber: 0,
    loading: false,
    iconLoading: false,
  };

  //use API to upload answers from this.state.radiovalues
  logAnswers() {
    if (true) {
      //upload successful
      this.succ();
    } else {
      console.log("error");
    }
  }
  enterLoading = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({
        loading: false,
        iconLoading: false,
      });
      this.logAnswers();
    }, 1500);
  };
  succ() {
    message.success("Your responses have been submitted.", 8);
  }

  next() {
    console.log(this.state.slideNumber);
    this.carousel.next();
    const newSlide = this.state.slideNumber + 1;
    this.setState({ slideNumber: newSlide });
  }
  previous() {
    console.log(this.state.slideNumber);
    this.carousel.prev();
    const newSlide = this.state.slideNumber - 1;
    this.setState({ slideNumber: newSlide });
  }

  radioChange = (e) => {
    console.log("radio checked", this.state.slideNumber, "id", e.target.value);
    const tempRadioValues = this.state.radioValues;
    tempRadioValues[this.state.slideNumber] = e.target.value;
    this.setState({
      radioValues: tempRadioValues,
    });
    this.forceUpdate();
    console.log(this.state.radioValues[this.state.slideNumber]);
  };

  render() {
    const props = {
      dots: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      minHeight: 0,
      minWidth: 0,
    };
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
    };
    return (
      <container>
        <Carousel
          ref={(node) => (this.carousel = node)}
          style={{ minHeight: 0, minWidth: 0, maxHeight: 1000, maxWidth: 1000 }}
          {...props}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1>Question</h1>
            <p>this is a question</p>
            <Radio.Group
              onChange={this.radioChange}
              value={this.state.radioValues[this.state.slideNumber]}
            >
              <Radio style={radioStyle} value={1}>
                Option A
              </Radio>
              <Radio style={radioStyle} value={2}>
                Option B
              </Radio>
              <Radio style={radioStyle} value={3}>
                Option C
              </Radio>
            </Radio.Group>
            <p></p>
            <Row>
              <Col span={8} offset={17}>
                <Button type="primary" onClick={this.next}>
                  Next question
                  <Icon type={"right"}></Icon>
                </Button>
              </Col>
            </Row>
          </div>
          <div>
            <h1>Question</h1>
            <p>this is a question</p>
            <Radio.Group
              onChange={this.radioChange}
              value={this.state.radioValues[this.state.slideNumber]}
            >
              <Radio style={radioStyle} value={1}>
                Option A
              </Radio>
              <Radio style={radioStyle} value={2}>
                Option B
              </Radio>
              <Radio style={radioStyle} value={3}>
                Option C
              </Radio>
            </Radio.Group>
            <p></p>
            <Row>
              <Col span={12}>
                <Button type="secondary" onClick={this.previous}>
                  <Icon type={"left"}></Icon>
                  Previous question
                </Button>
              </Col>
              <Col span={7} offset={5}>
                <Button type="primary" onClick={this.next}>
                  Next question
                  <Icon type={"right"}></Icon>
                </Button>
              </Col>
            </Row>
          </div>
          <div>
            <h1>Question</h1>
            <p>this is a question</p>
            <Radio.Group
              onChange={this.radioChange}
              value={this.state.radioValues[this.state.slideNumber]}
            >
              <Radio style={radioStyle} value={1}>
                Option A
              </Radio>
              <Radio style={radioStyle} value={2}>
                Option B
              </Radio>
              <Radio style={radioStyle} value={3}>
                Option C
              </Radio>
            </Radio.Group>
            <p></p>
            <Row>
              <Col span={12}>
                <Button type="secondary" onClick={this.previous}>
                  <Icon type={"left"}></Icon>
                  Previous question
                </Button>
              </Col>
              <Col span={7} offset={5}>
                <Button type="primary" onClick={this.next}>
                  Next question
                  <Icon type={"right"}></Icon>
                </Button>
              </Col>
            </Row>
          </div>
          <div>
            <h1>Question</h1>
            <p>this is a question</p>
            <Radio.Group
              onChange={this.radioChange}
              value={this.state.radioValues[this.state.slideNumber]}
            >
              <Radio style={radioStyle} value={1}>
                Option A
              </Radio>
              <Radio style={radioStyle} value={2}>
                Option B
              </Radio>
              <Radio style={radioStyle} value={3}>
                Option C
              </Radio>
            </Radio.Group>
            <p></p>
            <Row>
              <Col span={12}>
                <Button type="secondary" onClick={this.previous}>
                  <Icon type={"left"}></Icon>
                  Previous question
                </Button>
              </Col>
              <Col span={6} offset={6}>
                <Button
                  type="primary"
                  loading={this.state.loading}
                  onClick={this.enterLoading}
                  style={{ background: "green", borderColor: "green" }}
                >
                  Submit
                  <Icon type={"check"}></Icon>
                </Button>
              </Col>
            </Row>
          </div>
        </Carousel>
      </container>
    );
  }
}
