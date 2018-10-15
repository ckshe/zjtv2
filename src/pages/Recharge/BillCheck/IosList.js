import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
// import router from 'umi/router';
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
    message,
    Checkbox,
    Upload,
    Alert,
    Tag
} from 'antd';

import styles from '../Record.less';
const { RangePicker } = DatePicker;
const { CheckableTag } = Tag;
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
@connect(({ billCheck, loading }) => ({
    billCheck,
    loading: loading.models.billCheck,
}))
@Form.create()

class DefaultList extends PureComponent {
    state = {
        formValues: {},
        stepFormValues: {},
        uploading: false,
        fileList: [],
        checked: false
    };


    columns = [
        {
            title: '日期',
            align: 'center',
            dataIndex: 'date',
            width:150,
            fixed:'left'
        },
        {
            title: 'iTunes',
            children: [
                {
                    title: '30M钻',
                    align: 'center',
                    dataIndex: 'iTunes_30',
                },
                {
                    title: '68M钻',
                    align: 'center',
                    dataIndex: 'iTunes_68',
                },
                {
                    title: '128M钻',
                    align: 'center',
                    dataIndex: 'iTunes_128',
                },
                {
                    title: '288M钻',
                    align: 'center',
                    dataIndex: 'iTunes_288',
                },
                {
                    title: '388M钻',
                    align: 'center',
                    dataIndex: 'iTunes_388',
                },
                {
                    title: '648M钻',
                    align: 'center',
                    dataIndex: 'iTunes_648',
                },
            ]
        },
        {
            title: '后台',
            children: [
                {
                    title: '30M钻',
                    align: 'center',
                    dataIndex: 'backstage_30',
                },
                {
                    title: '68M钻',
                    align: 'center',
                    dataIndex: 'backstage_68',
                },
                {
                    title: '128M钻',
                    align: 'center',
                    dataIndex: 'backstage_128',
                },
                {
                    title: '288M钻',
                    align: 'center',
                    dataIndex: 'backstage_288',
                },
                {
                    title: '388M钻',
                    align: 'center',
                    dataIndex: 'backstage_388',
                },
                {
                    title: '648M钻',
                    align: 'center',
                    dataIndex: 'backstage_648',
                },
            ]
        },
        {
            title: '差额',
            children: [
                {
                    title: '30M钻',
                    align: 'center',
                    dataIndex: 'diff_30',
                },
                {
                    title: '68M钻',
                    align: 'center',
                    dataIndex: 'diff_68',
                },
                {
                    title: '128M钻',
                    align: 'center',
                    dataIndex: 'diff_128',
                },
                {
                    title: '288M钻',
                    align: 'center',
                    dataIndex: 'diff_288',
                },
                {
                    title: '388M钻',
                    align: 'center',
                    dataIndex: 'diff_388',
                },
                {
                    title: '648M钻',
                    align: 'center',
                    dataIndex: 'diff_648',
                },
            ]
        },
    ];

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'billCheck/iOSList',
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
            type: 'billCheck/iOSList',
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
            type: 'billCheck/iOSList',
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
                type: 'billCheck/iOSList',
                payload: values,
            });
        });
    };
    onChangeCheckbox = (checked) => {
        this.setState({ checked });
        console.log(checked)
    }

    // 收起列表
    renderSimpleForm() {
        const {
            form: { getFieldDecorator },
        } = this.props;
        const { uploading } = this.state;
        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
        };
        return (
            <Fragment>
                <Form onSubmit={this.handleSearch} layout="inline">
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                        <Col md={8} sm={24}>
                            <FormItem label="支付类型">
                                {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                            </FormItem>
                        </Col>
                        <Col md={8} sm={24}>
                            <FormItem label="时间范围">
                                {getFieldDecorator('date')(<RangePicker placeholder={['开始日期', '结束日期']} />)}
                            </FormItem>
                        </Col>
                        <Col md={8} sm={24}>
                            <span className={styles.submitButtons}>
                                <Button type="primary" htmlType="submit">查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>导出excel</Button>
                            </span>
                        </Col>
                    </Row>
                </Form>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={5} sm={14}>
                        <span className={styles.submitButtons}>
                            <span>账单导入 : &nbsp;&nbsp;&nbsp;</span>
                            <Upload {...props}>
                                <Button><Icon type="upload" />导入</Button>
                            </Upload>
                        </span>
                    </Col>
                    <Col md={3} sm={10}>
                        <Button
                            type="primary"
                            onClick={this.handleUpload}
                            disabled={this.state.fileList.length === 0}
                            loading={uploading}
                        >
                            {uploading ? '匹配中...' : '匹配核对账单'}
                        </Button>
                    </Col>

                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <span className={styles.submitButtons}>
                            <span>显示异常 : &nbsp;&nbsp;&nbsp;</span>
                            <CheckableTag
                                style={{ border: "1px solid #ddd", fontSize: "14px" }}
                                checked={this.state.checked}
                                onChange={this.onChangeCheckbox}>
                                只显示异常
                            </CheckableTag>
                        </span>
                    </Col>
                </Row>
            </Fragment >
        );
    }

    handleUpload = () => {
        const { fileList } = this.state;
        const { dispatch } = this.props;
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });
        dispatch({
            type: 'billCheck/default',
            payload: {},
        });
        // You can use any AJAX library you like
        reqwest({
            url: '//jsonplaceholder.typicode.com/posts/',
            method: 'post',
            processData: false,
            data: formData,
            success: () => {
                this.setState({
                    fileList: [],
                    uploading: false,
                });
                message.success('upload successfully.');
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('upload failed.');
            },
        });
    }
    render() {
        const {
            billCheck: { data },
            loading,
        } = this.props;
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...data.pagination,
        };
        return (
            <Card bordered={false}>
                <div className={styles.tableList}>
                    <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
                    <div style={{marginBottom:'8px'}} className={styles.tableAlert}>
                        <Alert
                            message={
                                <Fragment>
                                    已选择 0 项&nbsp;&nbsp;
                                </Fragment>
                            }
                            type="info"
                            showIcon
                        />
                    </div>
                    <Table
                        loading={loading}
                        rowKey={'id'}
                        scroll={{ x: '180%'}}
                        bordered
                        size="small"
                        dataSource={data.list}
                        columns={this.columns}
                        pagination={paginationProps}
                        onChange={this.handleStandardTableChange}
                    />
                </div>
            </Card>
        );
    }
}

export default DefaultList;
