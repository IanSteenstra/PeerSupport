import React from "react";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import { Table, Button, Row, Popover } from "antd";

class RiskMonitoring extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flaggedMessages: null,
      userEmail: null,
    };
  }

  retrieveFlaggedMessages() {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    axios.get(`http://127.0.0.1:8000/api/flags/`).then((res) => {
      this.setState({ flaggedMessages: res.data });
    });
  }

  deleteFlaggedMessage = (record) => {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    axios.delete(`http://127.0.0.1:8000/api/flags/${record.pk}`).then((res) => {
      this.retrieveFlaggedMessages();
    });
  };

  retrieveUserEmail = (record) => {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    axios
      .get(`http://127.0.0.1:8000/get-user-email`, {
        params: {
          groupName: "Risk Monitor",
          flaggedProfilePk: record.flagged_user,
        },
      })
      .then((res) => {
        this.setState({ userEmail: res.data });
      });
  };

  componentDidMount() {
    this.retrieveFlaggedMessages();

    // Retrieves flagged messages every 5 minutes
    this.intervalID = setInterval(
      this.retrieveFlaggedMessages.bind(this),
      60 * 1000
    );
  }

  render() {
    const columns = [
      {
        title: "Timestamp",
        dataIndex: "created",
        key: "created",

        render: (record) => {
          return moment(record).format("lll");
        },

        sorter: (a, b) => moment(a.created) - moment(b.created),
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Profile Id",
        dataIndex: "flagged_user",
        key: "flagged_user",

        sorter: (a, b) => a.flagged_user - b.flagged_user,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Flag Type",
        dataIndex: "flag_type",
        key: "flag_type",

        filters: [
          {
            text: "Suicidal",
            value: "Suicidal",
          },
          {
            text: "Violent",
            value: "Violent",
          },
          {
            text: "Harassment",
            value: "Harassment",
          },
        ],

        filterMultiple: true,
        onFilter: (value, record) => record.flag_type.indexOf(value) === 0,
        sorter: (a, b) => a.flag_type.length - b.flag_type.length,
        sortDirections: ["descend", "ascend"],
      },
      {
        title: "Message",
        dataIndex: "content",
        key: "content",
      },
      {
        title: "User's Email",
        key: "users_email",
        render: (record) => (
          <Popover
            title={<center>User's Email</center>}
            trigger="click"
            content={<center>{this.state.userEmail}</center>}
          >
            <Button onClick={() => this.retrieveUserEmail(record)}>View</Button>
          </Popover>
        ),
      },
      {
        title: "Delete Flag",
        key: "delete_flag",
        render: (record) => (
          <Button
            type="danger"
            onClick={() => this.deleteFlaggedMessage(record)}
          >
            Delete
          </Button>
        ),
      },
    ];
    return (
      <div>
        <Row
          style={{
            padding: 8,
          }}
        >
          <Button onClick={() => this.retrieveFlaggedMessages()}>
            Refresh List
          </Button>
        </Row>
        <Row
          style={{
            padding: 8,
          }}
        >
          <Table
            columns={columns}
            dataSource={this.state.flaggedMessages}
            rowKey="pk"
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(RiskMonitoring);
