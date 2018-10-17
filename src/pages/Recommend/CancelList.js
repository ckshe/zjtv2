import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, DatePicker, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
/* eslint react/no-multi-comp:0 */
@connect(({ cancellist, loading }) => ({
  cancellist,
  loading: loading.models.cancellist,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    expandForm: false,
    formValues: {},
  };

  columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'id',
    },
    {
      title: '管理员',
      align: 'center',
      dataIndex: 'admin',
    },
    {
      title: '推介ID',
      align: 'center',
      dataIndex: 'recommend_id',
    },
    {
      title: '撤销原因',
      align: 'center',
      dataIndex: 'reason',
    },
    {
      title: '撤销时间',
      align: 'center',
      dataIndex: 'time',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'cancellist/getCancelList',
      payload:{}
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
      type: 'cancellist/getCancelList',
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
      type: 'cancellist/getCancelList',
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
        type: 'cancellist/getCancelList',
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
            <FormItem label="管理员">
              {getFieldDecorator('admin_name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={10} sm={24}>
  					<FormItem label="选择日期">
              {getFieldDecorator('date')(<RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  // 展开列表
//renderAdvancedForm() {
//  const {
//    form: { getFieldDecorator },
//  } = this.props;
//  return (
//    <Form onSubmit={this.handleSearch} layout="inline">
//      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
//        <Col md={8} sm={24}>
//          <FormItem label="账号">
//            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
//          </FormItem>
//        </Col>
//        <Col md={8} sm={24}>
//          <FormItem label="昵称">
//            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
//          </FormItem>
//        </Col>
//        <Col md={8} sm={24}>
//          <FormItem label="操作">
//            {getFieldDecorator('status')(
//              <Select placeholder="请选择">
//                <Option value="0">关闭</Option>
//                <Option value="1">运行中</Option>
//              </Select>
//            )}
//          </FormItem>
//        </Col>
//      </Row>
//      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
//        <Col md={8} sm={24}>
//          <FormItem label="类型">
//            {getFieldDecorator('status')(
//              <Select placeholder="请选择">
//                <Option value="1">收入</Option>
//                <Option value="2">消费</Option>
//              </Select>
//            )}
//          </FormItem>
//        </Col>
//        <Col md={8} sm={24}>
//          <FormItem label="时间范围">
//            {getFieldDecorator('date')(<RangePicker placeholder={['开始日期', '结束日期']} />)}
//          </FormItem>
//        </Col>
//      </Row>
//      <div style={{ overflow: 'hidden' }}>
//        <div style={{ float: 'right', marginBottom: 24 }}>
//          <Button type="primary" htmlType="submit">
//            查询
//          </Button>
//          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
//            重置
//          </Button>
//          <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
//            导出excel
//          </Button>
//          <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
//            收起 <Icon type="up" />
//          </a>
//        </div>
//      </div>
//    </Form>
//  );
//}

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      cancellist: { data },
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
      <PageHeaderWrapper title="推介撤销记录">
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
