import React, { PureComponent, Fragment } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, DatePicker, Table, Modal, Alert } from 'antd';
import styles from './style.less';

const FormItem = Form.Item;
const {RangePicker } = DatePicker;
const { Option } = Select;
const fieldLabels = {
  username: '专家账号',
  name: '真实姓名',
  id_card_no: '身份证号',
  nickname: '专家昵称',
  data: '选择日期',
  status: '审核状态',
};
const status = ['', '待审核', '审核通过', '审核不通过']
@Form.create()
/* eslint react/no-multi-comp:0 */
@connect(({ application, loading }) => ({
  application,
  loading: loading.models.application,
}))
class ExportApplicationList extends PureComponent {
  state = {
    expandForm: false,
    formValues: {},
    visible: false,
    id: 0
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'application/getApplicationList',
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
      type: 'application/getApplicationList',
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
      type: 'application/getApplicationList',
      payload: {},
    });
  };

  // 查询按钮
  handleSearch = e => {
    e.preventDefault();
    const {
      dispatch,
      form
    } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'application/getApplicationList',
        payload: values,
      });
    });
  };

  // 展开收起事件
  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };
  //跳转专家详情
  gotoApplicationDetails(id) {
    router.push({
      pathname: '/export/detail',
      query: {
        id,
      }
    })
  }

  //table表头
  columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'id',
    },
    {
      title: '账号',
      align: 'center',
      dataIndex: 'username',
    },
    {
      title: '专家信息',
      // align: 'center',
      render: (_, record) => (
        <Fragment>
          <div>真实姓名：{record.name}</div>
          <div>身份证号：{record.id_card_no}</div>
          <div>专家昵称：{record.nickname}</div>
          <div>注册时间：：{record.add_time}</div>
        </Fragment>
      ),
    },
    {
      title: '命中率',
      // align: 'center',
      render: (_, record) => (
        <Fragment>
          <div>本周：{record.this_week_info.rate}% 胜{record.this_week_info.win}走{record.this_week_info.draw}负{record.this_week_info.lose}</div>
          <div>上周：{record.last_week_info.rate}% 胜{record.last_week_info.win}走{record.last_week_info.draw}负{record.last_week_info.lose}</div>
          <div>上月：{record.this_month_info.rate}% 胜{record.this_month_info.win}走{record.this_month_info.draw}负{record.this_month_info.lose}</div>
        </Fragment>
      ),
    },
    {
      title: '申请时间',
      align: 'center',
      dataIndex: 'apply_time',
    },
    {
      title: '审核状态',
      align: 'center',
      dataIndex: 'status',
      render(val) {
        return <div>{status[val]}</div>;
      },
    },
    {
      title: '操作',
      align: 'center',
      render: (_, record) => (
        <Fragment>
          <div><a onClick={() => this.gotoApplicationDetails(record.id)}>查看详情</a></div>
        </Fragment>
      )
    },
  ];

  // 收起列表
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label={fieldLabels.username}>
              {getFieldDecorator('username')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label={fieldLabels.name}>
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
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
            <FormItem label={fieldLabels.username}>
              {getFieldDecorator('username')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label={fieldLabels.name}>
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label={fieldLabels.id_card_no}>
              {getFieldDecorator('id_card_no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label={fieldLabels.nickname}>
              {getFieldDecorator('nickname')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label={fieldLabels.data}>
              {getFieldDecorator('date')(<RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label={fieldLabels.status}>
              {getFieldDecorator('status')(
                <Select placeholder="请输入">
                  <Option value="0">全部</Option>
                  <Option value="1">待审核</Option>
                  <Option value="2">审核通过</Option>
                  <Option value="3">审核不通过</Option>
                </Select>
              )}
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
      application: { data },
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
      <Fragment>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              loading={loading}
              rowKey="id"
              dataSource={data.list}
              columns={this.columns}
              pagination={paginationProps}
              onChange={this.handleStandardTableChange}
              bordered
            />
          </div>
        </Card>
      </Fragment>
    );
  }
}

export default ExportApplicationList;
