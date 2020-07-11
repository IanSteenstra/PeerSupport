import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Carousel, message } from "antd";
import Question from "../components/Question";

class PreStudyQuestionnaire extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel = React.createRef();
    this.state = {
      radioValues: [
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
      ],
      slideNumber: 0,
      loading: false,
      iconLoading: false,
    };
  }

  //use API to upload answers from this.state.radiovalues
  logAnswers() {
    console.log(this.state.radioValues);
    // const url = "http://127.0.0.1:8000/api/prestudyquiz/";
    // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    // axios.defaults.xsrfCookieName = "csrftoken";
    // axios.defaults.headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Token ${this.props.token}`,
    // };
    // axios
    //   .post(url, { profile: 1 })
    //   .then((response) => response.data)
    //   .then((data) => {
    //     console.log(data);
    //     this.succ();
    //   });
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
          questionTitle={
            "My mental health has been interfering with my personal relationships."
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
            "My mental health has been interfering with my ability to get work done or accomplish tasks. "
          }
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I’ve been feeling sad or depressed."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I’ve been having suicidal thoughts."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={
            "I’ve  been struggling to fall asleep or stay asleep, or sleep too much."
          }
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I’ve  been feeling confident."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I’ve been feeling loved."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I’ve  been feeling optimistic about the future."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I’ve been feeling useful."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I’ve been feeling relaxed."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I’ve been feeling interested in other people."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I’ve been dealing with problems well."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I’ve had energy to spare."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I’ve been thinking clearly."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I’ve been feeling good about myself."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I’ve been feeling close to other people."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I’ve been able to make up my own mind about things."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I’ve been interested in new things."}
          radioChange={this.radioChange}
          slideNumber={this.state.slideNumber}
          radioValues={this.state.radioValues}
          position={"middle"}
          previous={this.previous}
          next={this.next}
        />
        <Question
          questionTitle={"I’ve been feeling cheerful."}
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
});

export default connect(mapStateToProps)(PreStudyQuestionnaire);
