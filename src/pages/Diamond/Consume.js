import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Alert, Form, Input, Select, Icon, Button, DatePicker, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const payment = ['微信', '支付宝APP', '支付宝手机网页', 'App Store', 'Google Play'];
const recommend_type = ['', '让球胜负', '大小球', '胜平负'];
const expert_level = ["普通用户", "竞猜专家", "7M分析师", "7M特邀专家", "好波名家"];

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
      title: '消费日期',
      align: 'center',
      dataIndex: 'add_time',
    },
    {
      title: '类型',
      align: 'center',
      dataIndex: 'type'
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
      title: '消费M钻',
      align: 'center',
      dataIndex: 'score',
    },
    {
      title: '专家',
      render: (_, record) => (
        <Fragment>
          <div>昵称: {record.expert_nickname}</div>
          <div>[ID: {record.expert_id} | {expert_level[record.expert_level]}]</div>
        </Fragment>
      ),
    },
    {
      title: '比赛',
      render: (_, record) => (
        <Fragment>
          <div>{record.competition_name}</div>
          <div>{record.home_team} VS {record.away_team}</div>
        </Fragment>
      ),
    },
    {
      title: '推介类型',
      align: 'center',
      dataIndex: 'recommend_type',
      render(val) {
        return <div>{recommend_type[val]}</div>;
      },
    },
    {
      title: '消费端',
      align: 'center',
      dataIndex: 'plat',
      render(val) {
        return <div>{payment[val]}</div>;
      },
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'diamond/consumeList',
      payload: {},
    });
  }

  // StandardTable组件里面的Table组件 点击分页触发
  handleStandardTableChange = (pagination) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const params = {
      page: pagination.current,
      page_size: pagination.pageSize,
      ...formValues,
    };

    dispatch({
      type: 'diamond/consumeList',
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
      type: 'diamond/consumeList',
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
        type: 'diamond/consumeList',
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
        type: 'diamond/consumeList',
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
              {getFieldDecorator('key')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="消费数量">
              {getFieldDecorator('number')(
                <Select placeholder="请选择">
                  <Option value="0">免费</Option>
                  <Option value="12">12钻</Option>
                  <Option value="18">18钻</Option>
                  <Option value="28">28钻</Option>
                  <Option value="38">38钻</Option>
                  <Option value="58">58钻</Option>
                  <Option value="88">88钻</Option>
                  <Option value="100">100钻</Option>
                  <Option value="108">108钻</Option>
                </Select>
              )}
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
            <FormItem label="用户查询">
              {getFieldDecorator('key')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="消费数量">
              {getFieldDecorator('number')(
                <Select placeholder="请选择数量">
                  <Option value="0">免费</Option>
                  <Option value="12">12钻</Option>
                  <Option value="18">18钻</Option>
                  <Option value="28">28钻</Option>
                  <Option value="38">38钻</Option>
                  <Option value="58">58钻</Option>
                  <Option value="88">88钻</Option>
                  <Option value="100">100钻</Option>
                  <Option value="108">108钻</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="专家ID">
              {getFieldDecorator('expert_id')(
                <Select placeholder="请选择专家">
                  <Option value="194648">反对无效 ( zhangqi87 | 7M分析师 )</Option>
                  <Option value="238060">我是肉丸 ( bala5569 | 7M分析师 )</Option>
                  <Option value="292544">波波老师 ( outway | 7M分析师 )</Option>
                  <Option value="299527">日心传说 ( mm846999958 | 7M分析师 )</Option>
                  <Option value="305557">老老文 ( xiongtest | 7M分析师 )</Option>
                  <Option value="310511">琳Lei ( 15913985321 | 7M分析师 )</Option>
                  <Option value="310673">mrcat ( 13501413369 | 7M分析师 )</Option>
                  <Option value="311250">谁也别问我为啥为啥啦 ( wy66 | 7M分析师 )</Option>
                  <Option value="311480">叫姐 ( wy77 | 7M分析师 )</Option>
                  <Option value="316435">川师傅 ( weixin_1605261248392 | 7M分析师 )</Option>
                  <Option value="317683">轶星 ( 13690084245 | 7M分析师 )</Option>
                  <Option value="319666">卧看行 ( weixin_1606111111147 | 7M分析师 )</Option>
                  <Option value="347354">逝水忘川. ( wx16101607255112 | 7M分析师 )</Option>
                  <Option value="352224">柠檬_352224 ( wy11 | 7M分析师 )</Option>
                  <Option value="355512">Jason ( weixin_1612131112589 | 7M分析师 )</Option>
                  <Option value="368352">*^_^*Y_368352 ( wy00 | 7M分析师 )</Option>
                  <Option value="369945">怀大师 ( huaidashi | 7M分析师 )</Option>
                  <Option value="369946">不周山 ( buzhoushan | 7M分析师 )</Option>
                  <Option value="369947">香山居士 ( xiangshanjushi | 7M分析师 )</Option>
                  <Option value="369948">欧皇 ( ouhuang | 7M分析师 )</Option>
                  <Option value="369949">科比 ( kebi | 7M分析师 )</Option>
                  <Option value="369951">尊道宝 ( zundaobao | 7M分析师 )</Option>
                  <Option value="369952">叶师傅 ( yeshifu | 7M分析师 )</Option>
                  <Option value="369957">大元老师 ( dayuan | 7M分析师 )</Option>
                  <Option value="375035">明灯法师 ( mingdengfashi | 7M分析师 )</Option>
                  <Option value="376024">周不错 ( qq17040503183325 | 7M分析师 )</Option>
                  <Option value="382508">吳戴維davidwu ( wb17051004110998 | 7M分析师 )</Option>
                  <Option value="382755">赐我一个昵称 ( 13433355583 | 7M分析师 )</Option>
                  <Option value="384049">170518044933740 ( 13682713542 | 7M分析师 )</Option>
                  <Option value="389761">天才飞飞 ( wx17062103373367 | 7M分析师 )</Option>
                  <Option value="391484">EM重型机车社 ( 13172536667 | 7M分析师 )</Option>
                  <Option value="395860">北海上人 ( 6463129930 | 7M分析师 )</Option>
                  <Option value="395982">博文-郑 ( 18675412888 | 7M分析师 )</Option>
                  <Option value="396359">足球先驱 ( qq17073110582394 | 7M分析师 )</Option>
                  <Option value="400554">长远利益 ( wb17082206201583 | 7M分析师 )</Option>
                  <Option value="404936">财猫侃球 ( 13340726748 | 7M分析师 )</Option>
                  <Option value="404947">秦王赢正 ( 18818403342 | 7M分析师 )</Option>
                  <Option value="406608">长虹推荐 ( wx17092211471059 | 7M分析师 )</Option>
                  <Option value="413820">001 ( 13000000001 | 7M分析师 )</Option>
                  <Option value="413822">171109100504162 ( 13000000002 | 7M分析师 )</Option>
                  <Option value="413823">171109102428178 ( 13000000003 | 7M分析师 )</Option>
                  <Option value="413824">171109102520421 ( 13000000004 | 7M分析师 )</Option>
                  <Option value="414037">AI智能精算师 ( 16012341234 | 7M分析师 )</Option>
                  <Option value="414070">180828044102818 ( 19011111111 | 7M分析师 )</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="支付端">
              {getFieldDecorator('plat')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="1">安卓中文版APP</Option>
                  <Option value="2">苹果中文版APP</Option>
                  <Option value="3">webapp</Option>
                  <Option value="4">PCweb</Option>
                  <Option value="5">安卓国际版APP</Option>
                  <Option value="6">苹果国际版APP</Option>
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
            <FormItem label="时间范围">
              {getFieldDecorator('date')(<RangePicker placeholder={['开始日期', '结束日期']} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="推介类型">
              {getFieldDecorator('recommend_type')(
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
      <PageHeaderWrapper title="M钻消费">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableAlert}>
              <Alert
                message={
                  <Fragment>
                    累计{data.header.number}人进行{data.header.times}次操作,
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
