import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Alert, Card, Form, Input, Select, Icon, Button, DatePicker, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const payment = ['', '收入', '消费'];

@Form.create()
/* eslint react/no-multi-comp:0 */
@connect(({ diamond, loading }) => ({
  diamond,
  loading: loading.models.diamond,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    expandForm: false,
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
      title: '时间',
      align: 'center',
      dataIndex: 'add_time',
    },
    {
      title: '操作',
      align: 'center',
      dataIndex: 'operation',
    },
    {
      title: '类型',
      align: 'center',
      dataIndex: 'type',
      render(val) {
        return <div>{payment[val]}</div>;
      },
    },
    {
      title: '数额',
      align: 'center',
      dataIndex: 'score',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'diamond/accountList',
      payload: {},
    });
  }

  // StandardTable组件里面的Table组件 点击分页触发
  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const params = {
      page: pagination.current,
      page_size: pagination.pageSize,
      ...formValues,
    };

    dispatch({
      type: 'diamond/accountList',
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
      type: 'diamond/accountList',
      payload: {},
    });
  };

  // 展开收起事件
  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  // 查询按钮
  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue);
      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'diamond/accountList',
        payload: values,
      });
    });
  };

  // 导出excel表格
  handleFormExcel = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        export: 1
      };

      dispatch({
        type: 'diamond/accountList',
        payload: values,
      });
    });
  };
  // 收起列表
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="账号">
              {getFieldDecorator('username')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="昵称">
              {getFieldDecorator('nickname')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormExcel}>
                导出excel
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  // 展开列表
  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="账号">
              {getFieldDecorator('username')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="昵称">
              {getFieldDecorator('nickname')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="操作">
              {getFieldDecorator('operation')(
                <Select placeholder="请选择">
                  <Option value="1">用户支付查看推介</Option>
                  <Option value="2">用户M钻充值</Option>
                  <Option value="3">专家赚取付费推介</Option>
                  <Option value="4">用户竞猜解锁</Option>
                  <Option value="5">用户连续签到奖励</Option>
                  <Option value="6">充值活动赠送</Option>
                  <Option value="7">系统赠送</Option>
                  <Option value="8">系统返还</Option>
                  <Option value="9">当日第二次以上撤销推介时支付的手续费1M钻</Option>
                  <Option value="10">撤销推介扣除赚取的m钻</Option>
                  <Option value="11">登上奖励榜前3名</Option>
                  <Option value="12">M钻提现</Option>
                  <Option value="13">M钻提现失败返还</Option>
                  <Option value="14">撤销推介退还M钻</Option>
                  <Option value="15">M钻兑换M币</Option>
                  <Option value="16">撤销推介(欠费)</Option>
                  <Option value="17">服务费结算</Option>
                  <Option value="18">M钻购买商品</Option>
                  <Option value="19">系统扣除M钻</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="类型">
              {getFieldDecorator('type')(
                <Select placeholder="请选择">
                  <Option value="1">收入</Option>
                  <Option value="2">消费</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="时间范围">
              {getFieldDecorator('date')(<RangePicker placeholder={['开始日期', '结束日期']} />)}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormExcel}>
              导出excel
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      diamond: { data },
      loading,
    } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: parseInt(data.pagination.page_size),
      current: parseInt(data.pagination.current),
      total: parseInt(data.pagination.total),
    };
    return (
      <PageHeaderWrapper title="M钻流水">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableAlert}>
              <Alert
                message={
                  <Fragment>
                    累计{data.header.number}人进行{data.header.times}次操作,
                    收入{data.header.income}钻,
                    消费{data.header.consumption}钻。
                  </Fragment>
                }
                type="info"
                showIcon
              />
            </div>
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
