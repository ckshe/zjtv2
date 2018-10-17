import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Alert, Form, Input, Select, Button, DatePicker, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
/* eslint react/no-multi-comp:0 */
@connect(({ diamond, loading }) => ({
  diamond,
  loading: loading.models.diamond,
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
            ID: {record.user_id}
          </div>
        </Fragment>
      ),
    },
    {
      title: '扣除前剩余钻',
      align: 'center',
      dataIndex: 'before_score',
    },
    {
      title: '扣除数量',
      align: 'center',
      dataIndex: 'score',
    },
    {
      title: '扣除时间',
      align: 'center',
      dataIndex: 'add_time',
    },
    {
      title: '扣除后剩余钻',
      align: 'center',
      dataIndex: 'after_score',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'diamond/deductList',
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
      type: 'diamond/deductList',
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
      type: 'diamond/deductList',
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
        type: 'diamond/deductList',
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
        type: 'diamond/deductList',
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
              {getFieldDecorator('username')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="昵称">
              {getFieldDecorator('nickname')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="称号">
              {getFieldDecorator('level')(
                <Select placeholder="请选择">
                  <Option value="1">精英玩家</Option>
                  <Option value="2">7M分析师</Option>
                  <Option value="4">好波名家</Option>
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
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormExcel}>
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
      <PageHeaderWrapper title="专家扣钻记录">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <div className={styles.tableAlert}>
              <Alert
                message={
                  <Fragment>
                    累计{data.header.times}次操作,
                    扣除{data.header.score}钻。
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
