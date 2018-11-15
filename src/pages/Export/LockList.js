import React, { PureComponent, Fragment } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, DatePicker, Table, Modal, Alert } from 'antd';
import styles from './style.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const { Option } = Select;
const confirm = Modal.confirm;
const fieldLabels = {
  nickname: '专家昵称',
  data: '选择日期',
  source: '来源',
};
const fieldSelect = ['', '7m内部专家', 'b端SportsDT']
@Form.create()
/* eslint react/no-multi-comp:0 */
@connect(({ locklist, loading }) => ({
  locklist,
  loading: loading.models.locklist,
}))
class LockList extends PureComponent {
  state = {
    formValues: {},
    visible: false,
    content: '',
    id: 0
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'locklist/getLockList',
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
      type: 'locklist/getLockList',
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
      type: 'locklist/getLockList',
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
        type: 'locklist/getLockList',
        payload: values,
      });
    });
  };


//解封号
lockSealNumber = (id,nickname,source) => {
  const {
    dispatch,
  } = this.props;
  console.log("data======",id,nickname,fieldSelect[source])
  confirm({
    title: '确认解除该专家的封号吗？',
    content: (
      <div>
        <p>专家昵称： {nickname}</p>
        <p>来源: {fieldSelect[source]}</p>
      </div>
    ),
    okText: '解封',
    cancelText: '取消',
    onOk() {
      const param = {
        id: id,
        status: '2'
      }
      dispatch({
        type: 'locklist/updateLockStatus',
        payload: param,
      });
    },
    onCancel() { },
  });
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
      title: '来源',
      align: 'center',
      render: (_, record) => (
        <Fragment>
          <div>{fieldSelect[record.source]}</div>
        </Fragment>
      ),
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
      title: '申请时间',
      align: 'center',
      dataIndex: 'apply_time',
    },
    {
      title: '封号时间',
      align: 'center',
      dataIndex: 'lock_time',
    },
    {
      title: '操作',
      align: 'center',
      render: (_, record) => (
        <Fragment>
          <div><a onClick={() => this.lockSealNumber(record.id,record.nickname,record.source)}>解封</a></div>
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
            <FormItem label={fieldLabels.nickname}>
              {getFieldDecorator('nickname')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label={fieldLabels.source}>
              {getFieldDecorator('source')(
                <Select placeholder="请输入">
                  <Option value="0">全部</Option>
                  <Option value="1">待审核</Option>
                  <Option value="2">审核通过</Option>
                  <Option value="3">审核不通过</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label={fieldLabels.data}>
              {getFieldDecorator('date')(<RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />)}
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
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

  render() {
    const {
      locklist: { data },
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
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <Table
              loading={loading}
              rowKey={(r,i)=>(i)}
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

export default LockList;
