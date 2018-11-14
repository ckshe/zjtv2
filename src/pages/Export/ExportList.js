import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import router from 'umi/router';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, DatePicker, Table, Modal, Alert } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import { recommendType, status, level, sort } from '@/pages/config'

const FormItem = Form.Item;
const sourceArr = ['','7m内部专家','b端SportsDT']
@Form.create()
/* eslint react/no-multi-comp:0 */
@connect(({ exportlist, loading }) => ({
  exportlist,
  loading: loading.models.exportlist,
}))
class ExportList extends PureComponent {
  state = {
    expandForm: false,
    formValues: {},
    visible: false,
    content: '',
    id: 0
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'exportlist/getExportlist',
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
      type: 'exportlist/getExportlist',
      payload: params,
    });
  };
  // 如果审核请求触发成功时 models的state发生变化 就会执行该生命周期函数
  // 如果models的state 的review有值则重新请求列表数据
  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps)
    const { dispatch } = this.props;
    if (nextProps.exportlist.review) {
      dispatch({
        type: 'exportlist/getExportlist',
        payload: {},
      });
    }
  }
  // 重置按钮
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'exportlist/getExportlist',
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
        type: 'exportlist/getExportlist',
        payload: values,
      });
    });
  };

  //查看详情
  seenDetails = (id, content) => {
    this.setState({
      visible: true,
      id: id,
      content: content,
    });
  }
  //跳转页面
  gotoExpertAdd(id) {
    router.push({
      pathname: '/export/export-list/export-add',
    })
  }
  //跳转专家详情
  gotoSetExport(id) {
    router.push({
      pathname: '/export/export-list/export-update',
      query: {
        id,
      }
    })
  }

  handleOk = (e) => {
    e.preventDefault();
    const {
      form, dispatch,
    } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        id: this.state.id
      };
      console.log(values)
      this.setState({
        formValues: values,
        visible: false,
      });
      dispatch({
        type: 'exportlist/updateContent',
        payload: values,
      });
    });
  }
  onCancel = (e) => {
    this.setState({
      visible: false,
      content: ''
    });
  }

  //table表头
  columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '专家信息',
      key: 'name',
      render: (_, record) => (
        <Fragment>
          <div>昵称: {record.nickname}</div>
          <div>真实姓名: {record.name}</div>
          <div>账号: {record.username}</div>
        </Fragment>
      ),
    },
    {
      title: '来源',
      align: 'center',
      dataIndex: 'source',
      key: 'source',
      render: (_, record) => (
        <Fragment>
          <div>{sourceArr[record.source]}</div>
        </Fragment>
      ),
    },
    {
      title: '身份认证',
      key: 'bank_card_no',
      render: (_, record) => (
        <Fragment>
          <div>银行卡: {record.bank_card_no}</div>
          <div>所属银行: {record.bank}</div>
          <div>身份证: {record.id_card_no}</div>
        </Fragment>
      ),
    },
    {
      title: '详细资料',
      key: 'telephone',
      render: (_, record) => (
        <Fragment>
          <div>手机号: {record.telephone}</div>
          <div>微信号: {record.wechat}</div>
          <div>完善时间: {record.update_time}</div>
        </Fragment>
      ),
    },
    {
      title: '操作',
      align: 'center',
      render: (_, record) => (
        <Fragment>
          <div><a onClick={() => this.gotoSetExport(record.id)}>专家设置</a></div>
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
          <Col md={6} sm={24}>
            <FormItem label="专家昵称">
              {getFieldDecorator('nickname')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="来源">
              {getFieldDecorator('source')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <Button style={{ marginLeft: 8, color: '#1890FF', borderColor: '#1890FF' }} onClick={this.gotoExpertAdd}>
                添加专家
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      exportlist: { data },
      loading,
      form: { getFieldDecorator },
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
        <PageHeaderWrapper title="专家列表">
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
      </Fragment>
    );
  }
}

export default ExportList;
