import React from 'react';
import { Table } from 'antd';
import Item from 'antd/lib/list/Item';
import Button from 'react-bootstrap/Button';


class Events extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Event',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>
            },
            {
                title: 'Start Time',
                dataIndex: 'start_time',
                key: 'start_time',
            },
            {
                title: 'End Time',
                dataIndex: 'end_time',
                key: 'end_time',
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (text, record) => (
                    <span>
                        {/* 
                        TODO - Add functionality to disable button after time expires
                        */}
                        <Button variant="success">Join</Button>
                    </span>
                ),
            },
        ];

        this.events = [
            {
                key: '1',
                name: 'Active Minds',
                start_time: 'March 12th, 2020',
                end_time: 'March 12th, 2020',
                description: 'words',
                status: false,
            },
            {
                key: '2',
                name: 'Mindfulness Week',
                start_time: 'April 6th, 2020',
                end_time: 'April 10th, 2020',
                description: 'stuff',
                status: true,
            },
            {
                key: '3',
                name: 'Finals',
                start_time: 'May 1st, 2020',
                end_time: 'May 5th, 2020',
                description: 'stress',
                status: false,
            },
            {
                key: '4',
                name: 'Online Graduation',
                start_time: 'May 23th, 2020',
                end_time: 'March 23th, 2020',
                description: 'Graduation',
                status: true,
            },
        ];
        this.state = {
            columns: this.columns,
            eventsList: this.events,
            viewStatus: false
        };
    }

    displayStatus = status => {
        if (status) {
            return this.setState({ status: true });
        }
        return this.setState({ status: false });
    };

    renderTabList = () => {
        return (
            <div className="my-5 tab-list">
                <span
                    onClick={() => this.displayStatus(true)}
                    className={this.state.viewStatus ? "active" : ""}
                >
                    Active
                </span>
                <span
                    onClick={() => this.displayStatus(false)}
                    className={this.state.viewStatus ? "" : "active"}
                >
                    Ended
                </span>
            </div>
        );
    };


    render() {
        return (
            <div>
                <Table
                    columns={this.state.columns}
                    dataSource={this.state.eventsList}
                />
            </div >
        );
    }
}
export default Events;