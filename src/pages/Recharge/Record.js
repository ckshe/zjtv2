import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Row, Col, Card, Form, Input, Select, Icon, Button, DatePicker, Badge, Table, Alert, Modal } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Record.less';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const statusMap = ['warning', 'success', 'error'];
const status = ["未付款", "已完成", "已取消"];
const payment = ["", "微信", "支付宝APP", "支付宝手机网页", "App Store", "Google Play"]


@Form.create()

/* eslint react/no-multi-comp:0 */
@connect(({ rechargeList, loading }) => ({
    rechargeList,
    loading: loading.models.rechargeList,
}))
@Form.create()

class Record extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            expandForm: false,
            modalVisible: false,
            formValues: {},
        };
    }

    columns = [
        {
            title: '创建日期',
            align: 'center',
            dataIndex: 'add_time',
        },
        {
            title: '完成日期',
            align: 'center',
            dataIndex: 'is_first',
        },
        {
            title: '订单号[第三方ID]',
            align: 'center',
            width: 150,
            render: (_, record) => (
                <Fragment>
                    <div>{record.order_no}</div>
                    <div>[{record.ping_id}]</div>
                </Fragment>
            )
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
            title: '用户',
            width: 150,
            render: (_, record) => (
                <Fragment>
                    <div>账号: {record.username}</div>
                    <div>昵称: {record.nickname}</div>
                    <div>[ID: {record.user_id} | IP: {record.client_ip}]</div>
                </Fragment>
            )
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
            title: '金额',
            align: 'center',
            dataIndex: 'amount',
        },
        {
            title: 'M钻',
            align: 'center',
            dataIndex: 'score',
        },
        {
            title: '操作',
            align: 'center',
            dataIndex: 'id',
            render: (text) => (
                <Fragment>
                    <a onClick={() => this.gotoOrderDetails(text)}>详情</a>
                </Fragment>
            ),
        },
    ];

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'rechargeList/fetch',
            payload: {},
        });
    }

    // 跳转至详情
    gotoOrderDetails(id) {
        router.push({
            pathname: '/recharge/record/order-details/details',
            query: {
                id,
            }
        })
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
                type: 'rechargeList/fetch',
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
                type: 'rechargeList/fetch',
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
                        <FormItem label="选择充值数">
                            {getFieldDecorator('shoplist_id')(
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
                    <Col md={8} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
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
                        <FormItem label="充值数">
                            {getFieldDecorator('shoplist_id')(
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
                        <FormItem label="订单状态">
                            {getFieldDecorator('status')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">未付款</Option>
                                    <Option value="1">已完成</Option>
                                    <Option value="2">已取消</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="是否测试">
                            {getFieldDecorator('is_test')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">正式</Option>
                                    <Option value="1">测试</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
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
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="是否首冲">
                            {getFieldDecorator('is_first')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">否</Option>
                                    <Option value="1">是</Option>
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

    // 切换显示查询列表
    renderForm() {
        const { expandForm } = this.state;
        return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }

    showModalVisible = (e) => {
        this.setState({
            modalVisible: true,
        });
    };

    hideModalVisible = (e) => {
        this.setState({
            modalVisible: false,
        });
    };

    render() {
        const {
            rechargeList: { data },
            loading,
        } = this.props;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: parseInt(data.pagination.page_size),
            current: parseInt(data.pagination.current),
            total: parseInt(data.pagination.total),
        };
        const { modalVisible } = this.state;
        return (
            <PageHeaderWrapper title="充值记录">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>{this.renderForm()}</div>
                        <div className={styles.tableAlert}>
                            <Alert
                                message={
                                    <Fragment>
                                        累计{data.header.user_count}人进行{data.header.times}次充值,
                                        累计销售{data.header.score_count}M钻,
                                        总收入{data.header.amount_count}元。
                                        {
                                            data.header.over_recharge_count ?
                                            (<a onClick={this.showModalVisible}>
                                                注意：24小时内有{data.header.over_recharge_count}个用户连续充值超过1800元
                                            </a>):("")
                                        }
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
                        <Modal
                            destroyOnClose
                            title="名单"
                            visible={modalVisible}
                            onOk={this.hideModalVisible}
                            onCancel={this.hideModalVisible}
                        >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default Record;
