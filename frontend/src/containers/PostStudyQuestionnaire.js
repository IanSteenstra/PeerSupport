import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Carousel, message } from "antd";
import Question from "../components/Question";
import moment from "moment";

class PostStudyQuestionnaire extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();
    this.state = {
      radioValues: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      slideNumber: 0,
      loading: false,
      iconLoading: false,
    };
  }

  //use API to upload answers from this.state.radiovalues
  logAnswers() {
    console.log(this.state.radioValues);
    const url = "http://127.0.0.1:8000/api/poststudyquiz/";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    axios
      .post(url, {
        username: this.props.username,
        q1: this.state.radioValues[0],
        q2: this.state.radioValues[1],
        q3: this.state.radioValues[2],
        q4: this.state.radioValues[3],
        q5: this.state.radioValues[4],
        q6: this.state.radioValues[5],
        q7: this.state.radioValues[6],
        q8: this.state.radioValues[7],
        q9: this.state.radioValues[8],
        q10: this.state.radioValues[9],
        q11: this.state.radioValues[10],
        q12: this.state.radioValues[11],
        q13: this.state.radioValues[12],
        q14: this.state.radioValues[13],
        q15: this.state.radioValues[14],
        q16: this.state.radioValues[15],
        q17: this.state.radioValues[16],
        q18: this.state.radioValues[17],
        q19: this.state.radioValues[18],
        q20: this.state.radioValues[19],
        created: moment().format(),
      })
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        this.succ();
      });
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
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      minHeight: 0,
      minWidth: 0,
    };
    return (
      <Carousel
        ref={(node) => (this.carousel = node)}
        style={{ minHeight: 0, minWidth: 0, maxHeight: 1000, maxWidth: 1000 }}
        {...props}
      >
        <Question
          questionTitle={
            "I feel comfortable talking to my friends or family about my mental health or emotions."
          }
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"first"}
          next={this.next}
        />
        <Question
          questionTitle={
            "I am knowledgeable about mental health related issues."
          }
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I feel sad or depressed."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I feel confident."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I feel loved."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I feel optimistic about the future."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I feel useful."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I feel relaxed."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I feel interested in other people."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I feel good about myself."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I feel close to other people."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I feel cheerful."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={
            "I enjoyed the 30-minute support conversation with the other student."
          }
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={
            "I felt comfortable talking about my mental health or emotions to the other student."
          }
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I felt like the other student respected me."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I felt like the other student understood me."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I felt comfortable supporting the other student."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={
            "I felt comfortable flagging the other students' risky message. (Answer only if you flagged a message)."
          }
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I believe this service should be implemented at RPI."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={
            "I would use this service if it was implemented at RPI."
          }
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"last"}
          previous={this.previous}
          loading={this.state.loading}
          enterLoading={this.enterLoading}
        />
      </Carousel>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  username: state.auth.username,
});

export default connect(mapStateToProps)(PostStudyQuestionnaire);
