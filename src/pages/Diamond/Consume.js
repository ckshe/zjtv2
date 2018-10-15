import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, DatePicker, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const payment = ['微信', '支付宝APP', '支付宝手机网页', 'App Store', 'Google Play'];

@Form.create()
/* eslint react/no-multi-comp:0 */
@connect(({ rechargeList, loading }) => ({
  rechargeList,
  loading: loading.models.rechargeList,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    expandForm: false,
    formValues: {},
  };

  columns = [
    {
      title: '消费日期',
      align: 'center',
      dataIndex: 'add_time',
    },
    {
      title: '类型',
      align: 'center',
      dataIndex: 'pay_type',
      render(val) {
        return <div>{payment[val]}</div>;
      },
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
      title: '消费M钻',
      align: 'center',
      dataIndex: 'amount',
    },
    {
      title: '专家',
      render: (_, record) => (
        <Fragment>
          <div>昵称: {record.nickname}</div>
          <div>[ID: {record.user_id} | 7M分析师]</div>
        </Fragment>
      ),
    },
    {
      title: '比赛',
      render: () => (
        <Fragment>
          <div>澳大利亚甲级联赛</div>
          <div>垃圾 VS 菜鸟</div>
        </Fragment>
      ),
    },
    {
      title: '推介类型',
      align: 'center',
      dataIndex: 'pay_type',
      render(val) {
        return <div>{payment[val]}</div>;
      },
    },
    {
      title: '消费端',
      align: 'center',
      dataIndex: 'pay_type',
      render(val) {
        return <div>{payment[val]}</div>;
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rechargeList/fetch',
    });
  }

  // StandardTable组件里面的Table组件 点击分页触发
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

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

  // 收起列表
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="用户查询">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="消费数量">
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
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
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
            <FormItem label="用户查询">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="消费数量">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="专家ID">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="客户端">
              {getFieldDecorator('status')(
                <Select placeholder="请选择">
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="主队名">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="客队名">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="时间范围">
              {getFieldDecorator('date')(<RangePicker placeholder={['开始日期', '结束日期']} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="推介类型">
              {getFieldDecorator('status')(
                <Select placeholder="请选择">
                  <Option value="1">让球胜负</Option>
                  <Option value="2">大小球</Option>
                  <Option value="3">胜平负</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="开赛时间">
              {getFieldDecorator('match_time')(<DatePicker placeholder="请选择开赛时间" />)}
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
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
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
            <div className={styles.tableListForm}>{this.renderForm()}</div>
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
