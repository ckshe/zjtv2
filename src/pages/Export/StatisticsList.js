import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import router from 'umi/router';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, DatePicker, Table, Modal, Alert } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import { recommendType, status, level, sort } from '@/pages/config'

const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const sourceArr = ['全部', '7m内部专家', 'b端SportsDT']
@Form.create()
/* eslint react/no-multi-comp:0 */
@connect(({ statisticslist, loading }) => ({
  statisticslist,
  loading: loading.models.statisticslist,
}))
class StatisticsList extends PureComponent {
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
      type: 'statisticslist/getStatisticsList',
      payload: {},
    });
  }

  // 重置按钮
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'statisticslist/getStatisticsList',
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
        sort:e.currentTarget.getAttribute('data-value')
      };
      this.setState({
        formValues: values,
      });
      dispatch({
        type: 'statisticslist/getStatisticsList',
        payload: values,
      });
    });
  };
  //table表头
  columns = [
    {
      title: '序号',
      align: 'center',
      dataIndex: 'id',
    },
    {
      title: '专家信息',
      // align: 'center',
      render: (_, record) => (
        <Fragment>
          <div>专家昵称：{record.nickname}</div>
          <div>真实姓名：{record.name}</div>
          <div>身份证号：{record.id_card_no}</div>
          <div>专家帐号：{record.username}</div>
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
      title: '投放平台',
      dataIndex: 'plat',
      align: 'center',
    },
    {
      title: '命中率',
      // align: 'center',
      render: (_, record) => (
        <Fragment>
          <div>近7天：{record.last_sevenDays_info.rate}% 胜{record.last_sevenDays_info.win}走{record.last_sevenDays_info.draw}负{record.last_sevenDays_info.lose}</div>
          <div>近30天：{record.last_thirtyDays_info.rate}% 胜{record.last_thirtyDays_info.win}走{record.last_thirtyDays_info.draw}负{record.last_thirtyDays_info.lose}</div>
          <div>生涯：{record.career_info.rate}% 胜{record.career_info.win}走{record.career_info.draw}负{record.career_info.lose}</div>
        </Fragment>
      ),
    },
    {
      title: '推介(当前时间区间)',
      render: (_, record) => (
        <Fragment>
          <div> 发布 {record.recommend_info.number} 推介；撤销 {record.recommend_info.cancel_num} 条；</div>
          <div> {record.recommend_info.unlock_num} 人解锁；收入 {record.recommend_info.income} M钻</div>
        </Fragment>
      ),
    },
    {
      title: '剩余M钻',
      align: 'center',
      render: (_, record) => (
        <Fragment>
          <div>{record.score} M钻</div>
        </Fragment>
      ),
    },
  ];



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
            <FormItem label="真实姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="选择日期">
              {getFieldDecorator('date')(<RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="专家来源">
              {getFieldDecorator('source')(
                <Select placeholder="请输入">
                  <Option value="0">全部</Option>
                  <Option value="1">7m内部专家</Option>
                  <Option value="2">b端SportsDT</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  查询
            </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
            </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row style={{ marginLeft: -32, marginRight: -32, padding: -10 }}>
          <Col span={24}>
            <div className={styles.order} style={{ height: 20 }}>
              <span className={styles.line}></span>
            </div>
          </Col>
        </Row>
        <Row gutter={{ md: 8 }} style={{ marginBottom: 20 }}>
          <Col span={3}>
            <Button block onClick={this.handleSearch}  data-value='1'>按近7天胜率排序</Button>
          </Col>
          <Col span={3}>
            <Button block onClick={this.handleSearch}  data-value='2'>按近30天胜率排序</Button>
          </Col>
          <Col span={3}>
            <Button block onClick={this.handleSearch} data-value='3'>按生涯胜率排序</Button>
          </Col>
          <Col span={3}>
            <Button block onClick={this.handleSearch} data-value='4'>按剩余M钻排序</Button>
          </Col>
          <Col span={3}>
            <Button block onClick={this.handleSearch} data-value='5'>按已发布推介排序</Button>
          </Col>
          <Col span={3}>
            <Button block onClick={this.handleSearch} data-value='6'>按撤销推介排序</Button>
          </Col>
          <Col span={3}>
            <Button block onClick={this.handleSearch} data-value='7'>按撤销推介排序</Button>
          </Col>
          <Col span={3}>
            <Button block onClick={this.handleSearch} data-value='8'>按撤销推介排序</Button>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      statisticslist: { data },
      loading,
      form: { getFieldDecorator },
    } = this.props;
    console.log("data=====", data)
    return (
      <Fragment>
        <PageHeaderWrapper title="推介列表">
          <Card bordered={false}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.renderAdvancedForm()}</div>
              <Table
                loading={loading}
                rowKey="id"
                dataSource={data.list}
                columns={this.columns}
                pagination={false}
              // onChange={this.handleStandardTableChange}
              />
            </div>
          </Card>
        </PageHeaderWrapper>

      </Fragment>
    );
  }
}

export default StatisticsList;
