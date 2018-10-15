import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import router from 'umi/router';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, DatePicker, Table,Modal } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import {recommendType, status, level, sort} from '@/pages/config'

const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
/* eslint react/no-multi-comp:0 */
@connect(({ recommendlist, loading }) => ({
  recommendlist,
  loading: loading.models.recommendlist,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    expandForm: false,
    formValues: {},
    visible:false,
    content:''
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'recommendlist/getRelist',
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
      type: 'recommendlist/getRelist',
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
      type: 'recommendlist/getRelist',
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
        type: 'recommendlist/getRelist',
        payload: values,
      });
    });
  };
  //查看详情
	seenDetails = text =>{
		this.showModal(text);
	}
	//跳转页面
	gotoRecommondDetails(id) {
    router.push({
        pathname: '/recommend/recommend-list/list-details',
        query: {
            id,
        }
    })
	}
	//model弹出框
	showModal = text => {
    this.setState({
      visible: true,
      content:text
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      content:''
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      content:''
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
      title: '用户',
      render: (_, record) => (
        <Fragment>
          <div>账号: {record.user_info.username}</div>
          <div>昵称: {record.user_info.nickname}</div>
          <div>
            [ID: {record.user_info.id}]
          </div>
        </Fragment>
      ),
    },
    {
      title: '比赛',
      render: (_, record) => (
        <Fragment>
          <div>{record.game_info.competition_name}</div>
          <div>{record.game_info.home_team} VS {record.game_info.away_team}</div>
          <div>{record.game_info.game_time}</div>
        </Fragment>
      ),
    },
    {
      title: '推介内容',
      align: 'center',
      render: (_, record) => (
        <Fragment>
          <div>{record.viewmd}M钻</div>
          <div>{recommendType[record.type]}</div>
          <div>{record.add_time}</div>
          <div><a onClick={() => this.seenDetails(record.content)}>查看内容</a></div>
        </Fragment>
      ),
    },
    {
      title: '查看情况',
      render: (_, record) => (
        <Fragment>
          <div>{record.view_num}人解锁查看</div>
          <div>专家收入{record.expert_income}M钻</div>
          <div>平台收入{record.plat_income}M钻</div>
          <div>分成比例：{record.income_rate}%</div>
        </Fragment>
      ),
    },
    {
      title: '状态',
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
         		<div><a onClick={() => this.gotoRecommondDetails(record.id)}>查看详情</a></div>
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
              {getFieldDecorator('date')(<RangePicker style={{ width: '100%' }}  placeholder={['开始日期', '结束日期']} />)}
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

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      recommendlist: { data },
      loading,
    } = this.props;
    console.log("data",data)
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
    pageSize: parseInt(data.pagination.page_size),
    current: parseInt(data.pagination.current),
    total: parseInt(data.pagination.total),
    };
    console.log("datapagination",data.pagination)
    return (
	    <Fragment>
	      <PageHeaderWrapper title="推介列表">
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
	      <Modal  title="推荐内容"  visible={this.state.visible}  onOk={this.handleOk}  onCancel={this.handleCancel}>
	          <p>{this.state.content}</p>
	      </Modal>
	    </Fragment>
    );
  }
}

export default TableList;
