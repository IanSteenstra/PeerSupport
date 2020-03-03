import React from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'Event',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Action',
        key: 'action',
    },
];

const data = [
    {
        key: '1',
        date: 'March 12th, 2020',
        name: 'Active Minds',
    },
    {
        key: '2',
        date: 'April 6th, 2020 - April 10th, 2020',
        name: 'Mindfulness Week',
    }
];

export class Events extends React.Component {
    render() {
        return (
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}

//export default Events;