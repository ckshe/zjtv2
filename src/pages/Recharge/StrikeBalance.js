import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Row, Col, Card, Form, Input, Select, Icon, Button, DatePicker, Table, Badge, Popconfirm, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Record.less';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const payment = ["", "微信", "支付宝APP", "支付宝手机网页", "App Store", "Google Play"]
const statusMap = ['warning', 'success', 'error'];
const status = ["待审核", "通过", "不通过"];

@Form.create()

/* eslint react/no-multi-comp:0 */
@connect(({ strikeBalance, loading }) => ({
    strikeBalance,
    loading: loading.models.strikeBalance,
}))
@Form.create()

class TableList extends PureComponent {
    state = {
        modalVisible: false,
        expandForm: false,
        formValues: {},
    };

    columns = [
        {
            title: '时间',
            align: 'center',
            dataIndex: 'add_time',
        },
        {
            title: '用户',
            render: (_, record) => (
                <Fragment>
                    <div>账号: {record.username}</div>
                    <div>昵称: {record.nickname}</div>
                    <div>ID: {record.user_id}</div>
                </Fragment>
            )
        },
        {
            title: '充值金额',
            align: 'center',
            dataIndex: 'amount',
        },
        {
            title: '对应钻数',
            align: 'center',
            dataIndex: 'score',
        },
        {
            title: '支付方式',
            align: 'center',
            dataIndex: 'pay_type',
            render(val) {
                return <div>{payment[val]}</div>
            },
        },
        {
            title: '第三方ID',
            align: 'center',
            dataIndex: 'third_party_id'
        },
        {
            title: '订单状态',
            align: 'center',
            dataIndex: 'status',
            render(val) {
                return <Badge status={statusMap[val]} text={status[val]} />;
            },
        },
        {
            title: '提交者',
            align: 'center',
            dataIndex: 'creator',
        },
        {
            title: '审核人',
            align: 'center',
            dataIndex: 'reviewer',
        },
        {
            title: '审核人',
            align: 'center',
            render: (_, record) => (
                <Fragment>
                    <Popconfirm title="你确定通过吗?" onConfirm={() => this.confirm({ id: record.id, status: 1 })} onCancel={this.cancel} okText="确定" cancelText="取消">
                        <a href="#">通过</a>
                    </Popconfirm>
                    <Popconfirm title="你确定拒绝通过?" onConfirm={() => this.confirm({ id: record.id, status: 2 })} onCancel={this.cancel} okText="确定" cancelText="取消">
                        <a style={{ marginLeft: 8 }} href="#">不通过</a>
                    </Popconfirm>
                </Fragment>
            )
        }
    ];

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'strikeBalance/list',
            payload: {},
        });
    }
    // 如果审核请求触发成功时 models的state发生变化 就会执行该生命周期函数
    // 如果models的state 的review有值则重新请求列表数据
    componentWillReceiveProps(nextProps){
        const { dispatch } = this.props;
        if(nextProps.strikeBalance.review){
            dispatch({
                type: 'strikeBalance/list',
                payload: {},
            });
        }
    }
    // 气泡确认按钮
    confirm(values) {
        const { dispatch } = this.props;
        dispatch({
            type: 'strikeBalance/review',
            payload: values,
        });
    }
    // 气泡取消
    cancel(e) {}

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
            type: 'strikeBalance/list',
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
            type: 'strikeBalance/list',
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
                type: 'strikeBalance/list',
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
                type: 'strikeBalance/list',
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
                        <FormItem label="昵称">
                            {getFieldDecorator('nickname')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormExcel}>导出excel</Button>
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
                        <FormItem label="昵称">
                            {getFieldDecorator('nickname')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="支付类型">
                            {getFieldDecorator('pay_type')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="1">微信</Option>
                                    <Option value="2">支付宝 APP</Option>
                                    <Option value="3">支付宝手机网页</Option>
                                    <Option value="4">App Store</Option>
                                    <Option value="5">Google Play</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="充值数">
                            {getFieldDecorator('recharge_id')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="1">6M钻(6元)</Option>
                                    <Option value="7">6M钻(7元)</Option>
                                    <Option value="2">30M钻</Option>
                                    <Option value="3">68M钻</Option>
                                    <Option value="4">128M钻</Option>
                                    <Option value="5">288M钻</Option>
                                    <Option value="8">388M钻</Option>
                                    <Option value="9">648M钻</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={10} sm={26}>
                        <FormItem label="时间范围">
                            {getFieldDecorator('date')(<RangePicker format="YYYY-MM-DD" style={{ width: '100%' }} placeholder={['开始日期', '结束日期']} />)}
                        </FormItem>
                    </Col>
                </Row>
                <div style={{ overflow: 'hidden' }}>
                    <div style={{ float: 'right', marginBottom: 24 }}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleFormExcel}>导出excel</Button>
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

    gotoOrderDetails() {
        router.push({
            pathname: '/recharge/strike-balance/recharge-from'
        })
    }

    render() {
        const {
            strikeBalance: { data },
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
            <PageHeaderWrapper title="冲账列表">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>{this.renderForm()}</div>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={this.gotoOrderDetails}>冲账充值</Button>
                        </div>
                        <Table
                            loading={loading}
                            rowKey={'id'}
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
