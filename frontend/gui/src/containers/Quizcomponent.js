import React, { Component } from "react";
import { Carousel, Button, Radio, Modal, message} from "antd";
const { confirm } = Modal;
export default class QuizComponent extends Component {

    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.carousel = React.createRef();
    }
    state = {
        radioValues: [0,0,0,0],
        slideNumber: 0,
        loading: false,
        iconLoading: false,
    };

    //use API to upload answers from this.state.radiovalues
    logAnswers() {
        if (true) { //upload successful
            this.succ()
        }
        else {
            console.log("error")
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
    succ () {
        message.success('Your responses have been submitted.', 8);
    };


    next() {
        console.log(this.state.slideNumber);
        this.carousel.next();
        const newSlide = this.state.slideNumber+1;
        this.setState({slideNumber:newSlide});
    }
    previous() {
        console.log(this.state.slideNumber);
        this.carousel.prev();
        const newSlide = this.state.slideNumber-1;
        this.setState({slideNumber:newSlide});
    }

    radioChange = e => {
        console.log('radio checked', this.state.slideNumber, 'id', e.target.value);
        this.state.radioValues[this.state.slideNumber] = e.target.value;
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
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
                <container>
                <Carousel ref={node => (this.carousel = node)} {...props}>
                    <div style={ {display:'flex',
                        flexDirection: 'column',
                        alignItems:'center',
                        justifyContent:'center',
                    }}>
                        <h1>Question</h1>
                        <p>this is a question</p>
                        <Radio.Group onChange={this.radioChange} value = {this.state.radioValues[this.state.slideNumber]}>
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
                        <Button type="primary" onClick={this.next}>
                            Next question
                        </Button>

                    </div>
                    <div>
                        <h1>Question</h1>
                        <p>this is a question</p>
                        <Radio.Group onChange={this.radioChange} value = {this.state.radioValues[this.state.slideNumber]}>
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
                        <Button type="secondary" onClick={this.previous}>
                            Previous question
                        </Button>
                        <p></p>
                        <Button type="primary" onClick={this.next}>
                            Next question
                        </Button>

                    </div>
                    <div>
                        <h1>Question</h1>
                        <p>this is a question</p>
                        <Radio.Group onChange={this.radioChange} value = {this.state.radioValues[this.state.slideNumber]}>
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
                        <Button type="secondary" onClick={this.previous}>
                            Previous question
                        </Button>
                        <p></p>
                        <Button type="primary" onClick={this.next}>
                            Next question
                        </Button>

                    </div>
                    <div>
                        <h1>Question</h1>
                        <p>this is a question</p>
                        <Radio.Group onChange={this.radioChange} value = {this.state.radioValues[this.state.slideNumber]}>
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
                        <Button type="secondary" onClick={this.previous}>
                            Previous question
                        </Button>
                        <p></p>
                        <Button type="primary" loading={this.state.loading} onClick={this.enterLoading} style={{ background: "green", borderColor: "green" }}>
                            Submit
                        </Button>

                    </div>
                </Carousel>
                </container>

        );
    }
}