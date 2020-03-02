import React from 'react';
import { Row, Col, Divider } from 'antd';
import QuizComponent from "./Quizcomponent";
class Quiz extends React.Component {
    render() {
        return (
            <div style={{
                display:'flex',
                flexDirection: 'column',
                flex: 1,
                alignItems:'center',
                justifyContent:'center',
                paddingBottom:40,
                paddingTop:20,
                minWidth: 0,
                minHeight: 0,
            }}>

                <Row type="flex" justify="center" align="center">
                    <Col span={12}>
                        <Divider>Personality quiz</Divider>
                        <p>This quiz helps us match you with people</p>
                        <Divider></Divider>
                        <QuizComponent></QuizComponent>
                        <Divider></Divider>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Quiz;