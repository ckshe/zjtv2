import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Button, DatePicker, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

@Form.create()
/* eslint react/no-multi-comp:0 */
@connect(({ rechargeList, loading }) => ({
  rechargeList,
  loading: loading.models.rechargeList,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    formValues: {},
  };

  columns = [
    {
      title: '日期',
      align: 'center',
      dataIndex: 'add_time',
    },
    {
      title: '7M推介条数',
      align: 'center',
      dataIndex: 'amount',
    },
    {
      title: '7M购买次数',
      align: 'center',
      dataIndex: 'amount',
    },
    {
      title: '7M购买人数',
      align: 'center',
      dataIndex: 'amount',
    },
    {
      title: '7M销售数(M钻)',
      align: 'center',
      dataIndex: 'amount',
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rechargeList/fetch',
    });
  }

  // StandardTable组件里面的Table组件 点击分页触发
  handleStandardTableChange = pagination => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
    };

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

  // 展开列表
  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="时间范围">
              {getFieldDecorator('date')(<RangePicker placeholder={['开始日期', '结束日期']} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              导出excel
            </Button>
          </Col>
        </Row>
      </Form>
    );
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
      <PageHeaderWrapper title="收益日报表">
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
    );
  }
}

export default TableList;
