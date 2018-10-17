import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Button,
    DatePicker,
    Table
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Record.less';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;
const description = ["","新增订单", "订单审核通过", "订单审核不通过", "修改订单状态", "修改订单备注","删除订单备注","删除订单"]


@Form.create()

/* eslint react/no-multi-comp:0 */
@connect(({ orderOperationLog, loading }) => ({
    orderOperationLog,
    loading: loading.models.orderOperationLog,
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
            title: '序号',
            align: 'center',
            dataIndex: 'id',
        },
        {
            title: '订单号 [第三方ID]',
            render: (_, record) => (
                <Fragment>
                    <div>[ID: {record.order_no} | IP: {record.third_party_id}]</div>
                </Fragment>
            )
        },
        {
            title: '描述',
            align: 'center',
            dataIndex: 'description',
        },
        {
            title: '操作人',
            align: 'center',
            dataIndex: 'operator',
        },
        {
            title: '操作时间',
            align: 'center',
            dataIndex: 'add_time',
        }
    ];

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'orderOperationLog/list',
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
            type: 'orderOperationLog/list',
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
            type: 'orderOperationLog/list',
            payload: {},
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
                type: 'orderOperationLog/list',
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
                type: 'orderOperationLog/list',
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
                        <FormItem label="操作人">
                            {getFieldDecorator('operator')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="操作类型">
                            {getFieldDecorator('type')(
                                <Select placeholder="请选择" style={{ width: '100%' }}>
                                    <Option value="1">新增订单</Option>
                                    <Option value="2">订单审核通过</Option>
                                    <Option value="3">订单审核不通过</Option>
                                    <Option value="4">修改订单状态</Option>
                                    <Option value="5">修改订单备注</Option>
                                    <Option value="6">删除订单备注</Option>
                                    <Option value="7">删除订单</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="时间范围">
                            {getFieldDecorator('date')(<RangePicker placeholder={['开始日期', '结束日期']} />)}
                        </FormItem>
                    </Col>
                    <div style={{ float: 'right', marginBottom: 24 }}>
                        <Button type="primary" htmlType="submit">查询</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleFormExcel}>导出excel</Button>
                    </div>
                </Row>
            </Form>
        );
    }

    renderForm() {
        const { expandForm } = this.state;
        return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }

    render() {
        const {
            orderOperationLog: { data },
            loading,
        } = this.props;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: parseInt(data.pagination.page_size),
            current: parseInt(data.pagination.current),
            total: parseInt(data.pagination.total),
        };
        const { selectedRows } = this.state;
        return (
            <PageHeaderWrapper title="订单操作记录">
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
