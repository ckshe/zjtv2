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

const sourceArr = ['', '7m内部专家', 'b端SportsDT']
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
            <FormItem label="称号">
              {getFieldDecorator('level')(
                <Select placeholder="请输入">
                  <Option value="0">全部</Option>
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
            <FormItem label="类型">
              {getFieldDecorator('status')(
                <Select placeholder="请输入">
                  <Option value="1">让球胜负</Option>
                  <Option value="2">大小球</Option>
                  <Option value="3">胜平负</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem label="选择日期">
              {getFieldDecorator('date')(<RangePicker style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="状态">
              {getFieldDecorator('status')(
                <Select placeholder="请输入">
                  <Option value="0">正常</Option>
                  <Option value="1">发布者撤销</Option>
                  <Option value="2">管理员撤销</Option>
                  <Option value="3">系统自动撤销</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="主队名">
              {getFieldDecorator('home_team')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="客队名">
              {getFieldDecorator('away_team')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="开赛时间">
              {getFieldDecorator('match_time')(
                <DatePicker format={dateFormat} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="排序">
              {getFieldDecorator('sort')(
                <Select placeholder="请输入">
                  <Option value="1">按发布时间倒序排序</Option>
                  <Option value="2">按发布时间正序排序</Option>
                  <Option value="3">按解锁人数倒序排序</Option>
                  <Option value="4">按解锁人数正序排序</Option>
                  <Option value="5">按M钻收入倒序排序</Option>
                  <Option value="6">按M钻收入正序排序</Option>
                </Select>)}
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
