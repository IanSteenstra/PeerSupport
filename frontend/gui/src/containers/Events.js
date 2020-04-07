import React from 'react';
import { Table, Tabs, Icon } from 'antd';
import Item from 'antd/lib/list/Item';
import Button from 'react-bootstrap/Button';
import 'antd/dist/antd.css';
import { CarryOutTwoTone, CalendarTwoTone } from '@ant-design/icons'

const TabPane = Tabs.TabPane;


class Events extends React.Component {
    constructor(props) {
        super(props);
        this.pastColumns = [
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
        ];
        this.upcomingColumns = [
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
                key: 'x',
                render: (text, record) => (
                    <span>
                        {/* 
                        TODO - Add functionality to disable button after time expires
                        */}
                        <Button variant="success" disabled={record === true}>Join</Button>
                    </span>
                ),
            },
        ];

        this.pastEvents = [
            {
                key: '1',
                name: 'Active Minds',
                start_time: date_conversion(2020, 3, 12, 10, 0),
                end_time: date_conversion(2020, 3, 12, 12, 0),
                description: 'words',
            },
        ];
        this.upcomingEvents = [
            {
                key: '1',
                name: 'Mindfulness Week',
                start_time: date_conversion(2020, 4, 6, 12, 0),
                end_time: date_conversion(2020, 4, 10, 17, 0),
                description: 'stuff',
            },
            {
                key: '2',
                name: 'Finals',
                start_time: date_conversion(2020, 5, 1, 12, 0),
                end_time: date_conversion(2020, 5, 5, 12, 0),
                description: 'stress',
            },
            {
                key: '3',
                name: 'Online Graduation',
                start_time: date_conversion(2020, 5, 23, 12, 0),
                end_time: date_conversion(2020, 5, 23, 14, 0),
                description: 'Graduation',
            },
        ];
        this.state = {
            pastColumns: this.pastColumns,
            upcomingColumns: this.upcomingColumns,
            pastEvents: this.pastEvents,
            upcomingEvents: this.upcomingEvents,
        };

        // Possible bug if server is not running on same server time as user
        function date_conversion(year, month, day, hours, minutes) {
            var d = new Date(year, month, day, hours, minutes)
            return d.toLocaleString('en-US', {
                timeZone: "America/New_York", dateStyle: "full", timeStyle: "long", hour12: true
            });
        };
    }

    render() {
        return (
            <div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><CalendarTwoTone />Upcoming Events</span>} key="1">
                        <div>
                            <Table
                                columns={this.state.upcomingColumns}
                                dataSource={this.state.upcomingEvents}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab={<span><CarryOutTwoTone />Past Events</span>} key="2">
                        <div>
                            <Table
                                columns={this.state.pastColumns}
                                dataSource={this.state.pastEvents}
                            />
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}
export default Events;