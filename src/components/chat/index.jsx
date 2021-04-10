import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { DatePicker, Table, Skeleton, Typography, Button } from "antd";
import moment from "moment";
import api from "../../utils/api";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Chat extends Component {
  state = {
    data: [],
    fromDate: new Date(),
    toDate: new Date(),
  };

  componentDidMount() {
    this.getData();
  }

  onDateChange = async (date, dateString) => {
    const startDate = new Date(dateString[0]);
    const endDate = new Date(dateString[1]);

    await this.setState(
      {
        fromDate: moment(startDate).format(),
        toDate: moment(endDate).format(),
      },
      () => {
        this.fetchData();
      }
    );
  };

  getData = () => {
    api.get("/chats").then((d) => {
      this.setState({ data: d.data.data });
    });
  };

  fetchData = () => {
    const { data, fromDate, toDate } = this.state;

    const newArray =
      data.length > 0 &&
      data.filter((d) => d.date >= fromDate && d.date <= toDate);
    newArray.length > 0 && this.setState({ data: newArray });
  };

  clearData = () => {
    this.setState({ fromDate: new Date(), toDate: new Date() }, () => {
      this.getData();
    });
  };

  render() {
    const { data, fromDate, toDate } = this.state;
    const tableData =
      data.length > 0 &&
      data.map((arr, i) => ({
        key: arr.id,
        id: arr.websiteId,
        date: arr.date,
        chats: arr.chats,
        missedChats: arr.missedChats,
      }));

    const chatsColumn = [
      {
        title: "Website Id",
        dataIndex: "id",
        key: "id",
        render: (id) => <strong>{id}</strong>,
      },
      {
        title: "date",
        dataIndex: "date",
        key: "date",
        render: (date) => <span>{moment(date).format("DD-MM-YYYY")}</span>,
      },
      {
        title: "Chats",
        dataIndex: "chats",
        key: "chats",
        render: (chats) => <span>{chats}</span>,
      },
      {
        title: "Missed chats",
        dataIndex: "missedChats",
        key: "missedChats",
        render: (missedChats) => <span>{missedChats}</span>,
      },
    ];
    return (
      <Container style={{ marginTop: "20px" }}>
        <center>
          <h2>Chats Data</h2>
        </center>
        <Row style={{ marginTop: "20px" }}>
          <Col sm={4}>
            <Typography.Title level={3}>Choose Dates</Typography.Title>
            <DatePicker.RangePicker
              allowClear={false}
              size="large"
              format="MM/DD/YYYY"
              separator="to"
              value={[moment(fromDate), moment(toDate)]}
              onChange={this.onDateChange}
              style={{ marginBottom: "16px" }}
            />
          </Col>
          <Col sm={8}>
            <Button type="primary" onClick={this.clearData}>
              Clear Data
            </Button>
            {data.length > 0 ? (
              <Table columns={chatsColumn} dataSource={tableData} />
            ) : (
              <Skeleton active />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Chat;
