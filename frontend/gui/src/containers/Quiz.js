import React from 'react';
import { Row, Col } from 'antd';
import QuizComponent from "./Quizcomponent";
class Quiz extends React.Component {
    render() {
        return (
            <div style={{
                display:'box',
                flex: 1,
                alignItems:'center',
                justifyContent:'center',
                paddingBottom:20,
                paddingTop:20,
                minWidth: 0,
                minHeight: 0,

            }}>
                <Row type="flex" justify="center">
                    <Col span={12} offset={6}>
                <QuizComponent></QuizComponent>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Quiz;