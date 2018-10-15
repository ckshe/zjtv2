import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, DatePicker, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
/* eslint react/no-multi-comp:0 */
@connect(({ rechargeList, loading }) => ({
  rechargeList,
  loading: loading.models.rechargeList,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    formValues: {},
  };

  columns = [
    {
      title: '流水编号',
      align: 'center',
      dataIndex: 'id',
    },
    {
      title: '用户',
      render: (_, record) => (
        <Fragment>
          <div>账号: {record.username}</div>
          <div>昵称: {record.nickname}</div>
          <div>
            [ID: {record.user_id} | IP: {record.client_ip}]
          </div>
        </Fragment>
      ),
    },
    {
      title: '扣除前剩余钻',
      align: 'center',
      dataIndex: 'amount',
    },
    {
      title: '扣除数量',
      align: 'center',
      dataIndex: 'amount',
    },
    {
      title: '扣除时间',
      align: 'center',
      dataIndex: 'add_time',
    },
    {
      title: '扣除后剩余钻',
      align: 'center',
      dataIndex: 'amount',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rechargeList/fetch',
    });
  }

  // StandardTable组件里面的Table组件 点击分页触发
  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
    };

    dispatch({
      type: 'rechargeList/fetch',
      payload: params,
    });
  };

  // 重置按钮
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rechargeList/fetch',
      payload: {},
    });
  };

  // 查询按钮
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'rechargeList/fetch',
        payload: values,
      });
    });
  };

  // 展开列表
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="账号">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="昵称">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="称号">
              {getFieldDecorator('status')(
                <Select placeholder="请选择">
                  <Option value="1">精英玩家</Option>
                  <Option value="2">7M分析师</Option>
                  <Option value="3">好波名家</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="时间范围">
              {getFieldDecorator('date')(<RangePicker placeholder={['开始日期', '结束日期']} />)}
            </FormItem>
          </Col>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ float: 'right', marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                导出excel
              </Button>
            </div>
          </div>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      rechargeList: { data },
      loading,
    } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...data.pagination,
    };
    return (
      <PageHeaderWrapper title="M钻流水">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              loading={loading}
              rowKey="id"
              dataSource={data.list}
              columns={this.columns}
              pagination={paginationProps}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
