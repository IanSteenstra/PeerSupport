import React from 'react';
import { Button, Radio, Carousel } from 'antd';
class Quiz extends React.Component {

    onChange(a, b, c) {
        console.log(a, b, c);
    };
    next() {
        this.setState(this.state+1);
    };
    radioChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (

            <div style={{display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'left',
                paddingBottom:20
            }}>

                <Carousel afterChange={this.onChange}>
                    <div>
                        <Radio.Group onChange={this.radioChange} value={this.state.value}>
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
                        <Button type="primary" onClick={this.next}>
                            Next question
                        </Button>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                </Carousel>
            </div>
        );
    }
}

export default Quiz;