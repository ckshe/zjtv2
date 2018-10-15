import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    DatePicker,
    Badge,
    Table,
    Popconfirm,
    message
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Record.less';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');
const statusMap = ['warning', 'success', 'error'];
const status = ["待审核", "通过", "不通过"];
const payment = ["微信", "支付宝APP", "支付宝手机网页", "App Store", "Google Play"]


@Form.create()

/* eslint react/no-multi-comp:0 */
@connect(({ rechargeList, loading }) => ({
    rechargeList,
    loading: loading.models.rechargeList,
}))
@Form.create()

class TableList extends PureComponent {
    state = {
        modalVisible: false,
        expandForm: false,
        selectedRows: [],
        formValues: {},
        stepFormValues: {},
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
                    <div>[ID: {record.user_id} | IP: {record.client_ip}]</div>
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
            render: (_, record) => (
                <Fragment>
                    <div>[{record.ping_id}]</div>
                </Fragment>
            )
        },
        {
            title: '状态',
            align: 'center',
            dataIndex: 'status',
            render(val) {
                return <Badge status={statusMap[val]} text={status[val]} />;
            },
        },
        {
            title: '审核人',
            align: 'center',
            render: (_, record) => (
                <Fragment>
                    <Popconfirm title="你确定通过吗?" onConfirm={this.confirm} onCancel={this.cancel} okText="确定" cancelText="取消">
                        <a href="#">通过</a>
                    </Popconfirm>
                    <Popconfirm title="你确定拒绝通过?" onConfirm={this.confirm} onCancel={this.cancel} okText="确定" cancelText="取消">
                        <a style={{ marginLeft: 8 }} href="#">不通过</a>
                    </Popconfirm>
                </Fragment>
            )
        }
    ];

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'rechargeList/fetch',
        });

    }

    // StandardTable组件里面的Table组件 点击分页触发
    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

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

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

    // 查询按钮
    handleSearch = e => {
        e.preventDefault();

        const { dispatch, form } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;
            console.log(fieldsValue)
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
                            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="昵称">
                            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>导出excel</Button>
                            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                                展开 <Icon type="down" />
                            </a>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }
    onChange(date, dateString) {
        console.log(date, dateString);
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
                            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="昵称">
                            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="支付方式">
                            {getFieldDecorator('status')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="0">关闭</Option>
                                    <Option value="1">运行中</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="充值数">
                            {getFieldDecorator('name')(<Input placeholder="请输入充值数" />)}
                        </FormItem>
                    </Col>
                    <Col md={10} sm={26}>
                        <FormItem label="时间范围">
                            {getFieldDecorator('date')(<RangePicker placeholder={['开始日期', '结束日期']} />)}
                        </FormItem>
                    </Col>
                </Row>
                <div style={{ overflow: 'hidden' }}>
                    <div style={{ float: 'right', marginBottom: 24 }}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>导出excel</Button>
                        <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                            收起 <Icon type="up" />
                        </a>
                    </div>
                </div>
            </Form>
        );
    }

    // 显示对应查询组件
    renderForm() {
        const { expandForm } = this.state;
        return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }

    confirm(e) {
        console.log(e);
        message.success('Click on Yes');
    }

    cancel(e) {
        console.log(e);
        message.error('Click on No');
    }
    render() {
        const {
            rechargeList: { data },
            loading,
            rowKey,
        } = this.props;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...data.pagination,
        };
        console.log(data)
        return (
            <PageHeaderWrapper title="冲账审核">
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>{this.renderForm()}</div>
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
