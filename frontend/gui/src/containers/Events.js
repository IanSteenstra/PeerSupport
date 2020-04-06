import React from 'react';
import { Table } from 'antd';
import Item from 'antd/lib/list/Item';
import Button from 'react-bootstrap/Button';

const columns = [
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
        title: 'Status',
        key: 'status',
    },
];

const events = [
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

export class Events extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: columns,
            eventsList: events,
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
    renderEvents = () => {
        const { viewStatus } = this.state;
        const newEvents = this.state.eventsList.filter(
            event => event.status === viewStatus
        );
        return newEvents.map(event => (
            <li
                key={event.key}
                className="list-group-item d-flex justify-content-between align-items-center"
            >
                <span
                    className={`event-name mr-2 ${
                        this.state.viewStatus ? "ended-event" : ""
                        }`}
                    title={event.description}
                >
                </span>
                <div className="col-md-2 mx-auto p-0">{event.name}</div>
                <div className="col-md-4 mx-auto p-0">{event.start_time}</div>
                <div className="col-md-4 mx-auto p-0">{event.end_time}</div>
                <span>
                    {/* 
                        TODO - Add functionality to disable button after time expires
                    */}
                    <Button variant="success">Join</Button>{' '}
                </span>
            </li>
        ));
    }
    render() {
        return (
            // <main className="content">
            //     {/* <h1 className="text-white text-uppercase text-center my-4">Events app</h1> */}
            //     <div className="row ">
            //         <div className="col-md-10 mx-auto p-0">
            //             {this.renderTabList()}
            //             <div><Table columns={columns} events={events} /></div>
            //             {/* <ul className="list-group list-group-flush">
            //                 {this.renderEvents()}
            //             </ul> */}
            //         </div>
            //     </div>
            // </main>
            <div>
                <Table columns={columns} dataSource={events} />
            </div>
        );
    }
}
// return (
//     <div>
//         <Table columns={columns} dataSource={data} />
//     </div>
// )
export default Events;