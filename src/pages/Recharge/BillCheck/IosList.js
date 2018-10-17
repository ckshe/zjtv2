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
    Tag,
    Switch
} from 'antd';
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
import styles from '../Record.less';
const { RangePicker } = DatePicker;
const { CheckableTag } = Tag;
const FormItem = Form.Item;
const { Option } = Select;
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

class BillCheckDefaultList extends PureComponent {
    state = {
        formValues: {
            bill: '',
            date: '',
            pay_type: '',
            show_error: ''
        },
        uploading: false,
        fileList: [],
    };

    columns = [
        {
            title: '日期',
            align: 'center',
            dataIndex: 'date',
            width: 150,
            fixed: 'left'
        },
        {
            title: 'iTunes',
            children: [
                {
                    title: '30M钻',
                    align: 'center',
                    // dataIndex: 'iTunes_30',
                    render(_, record) {
                        return (
                            record.diff_30 > 0 ?
                                (<div style={{ color: "red" }}>{record.iTunes_30}</div>)
                                :
                                (<div>{record.iTunes_30}</div>)
                        )
                    },
                },
                {
                    title: '68M钻',
                    align: 'center',
                    // dataIndex: 'iTunes_68',
                    render(_, record) {
                        return (
                            record.diff_68 > 0 ?
                                (<div style={{ color: "red" }}>{record.iTunes_68}</div>)
                                :
                                (<div>{record.iTunes_68}</div>)
                        )
                    },
                },
                {
                    title: '128M钻',
                    align: 'center',
                    // dataIndex: 'iTunes_128',
                    render(_, record) {
                        return (
                            record.diff_128 > 0 ?
                                (<div style={{ color: "red" }}>{record.iTunes_128}</div>)
                                :
                                (<div>{record.iTunes_128}</div>)
                        )
                    },
                },
                {
                    title: '288M钻',
                    align: 'center',
                    // dataIndex: 'iTunes_288',
                    render(_, record) {
                        return (
                            record.diff_288 > 0 ?
                                (<div style={{ color: "red" }}>{record.iTunes_288}</div>)
                                :
                                (<div>{record.iTunes_288}</div>)
                        )
                    },
                },
                {
                    title: '388M钻',
                    align: 'center',
                    // dataIndex: 'iTunes_388',
                    render(_, record) {
                        return (
                            record.diff_388 > 0 ?
                                (<div style={{ color: "red" }}>{record.iTunes_388}</div>)
                                :
                                (<div>{record.iTunes_388}</div>)
                        )
                    },
                },
                {
                    title: '648M钻',
                    align: 'center',
                    // dataIndex: 'iTunes_648',
                    render(_, record) {
                        return (
                            record.diff_648 > 0 ?
                                (<div style={{ color: "red" }}>{record.iTunes_648}</div>)
                                :
                                (<div>{record.iTunes_648}</div>)
                        )
                    },
                },
            ]
        },
        {
            title: '后台',
            children: [
                {
                    title: '30M钻',
                    align: 'center',
                    // dataIndex: 'backstage_30',
                    render(_, record) {
                        return (
                            record.diff_30 > 0 ?
                                (<div style={{ color: "red" }}>{record.backstage_30}</div>)
                                :
                                (<div>{record.backstage_30}</div>)
                        )
                    },
                },
                {
                    title: '68M钻',
                    align: 'center',
                    // dataIndex: 'backstage_68',
                    render(_, record) {
                        return (
                            record.diff_68 > 0 ?
                                (<div style={{ color: "red" }}>{record.backstage_68}</div>)
                                :
                                (<div>{record.backstage_68}</div>)
                        )
                    },
                },
                {
                    title: '128M钻',
                    align: 'center',
                    // dataIndex: 'backstage_128',
                    render(_, record) {
                        return (
                            record.diff_128 > 0 ?
                                (<div style={{ color: "red" }}>{record.backstage_128}</div>)
                                :
                                (<div>{record.backstage_128}</div>)
                        )
                    },
                },
                {
                    title: '288M钻',
                    align: 'center',
                    // dataIndex: 'backstage_288',
                    render(_, record) {
                        return (
                            record.diff_288 > 0 ?
                                (<div style={{ color: "red" }}>{record.backstage_288}</div>)
                                :
                                (<div>{record.backstage_288}</div>)
                        )
                    },
                },
                {
                    title: '388M钻',
                    align: 'center',
                    // dataIndex: 'backstage_388',
                    render(_, record) {
                        return (
                            record.diff_388 > 0 ?
                                (<div style={{ color: "red" }}>{record.backstage_388}</div>)
                                :
                                (<div>{record.backstage_388}</div>)
                        )
                    },
                },
                {
                    title: '648M钻',
                    align: 'center',
                    // dataIndex: 'backstage_648',
                    render(_, record) {
                        return (
                            record.diff_648 > 0 ?
                                (<div style={{ color: "red" }}>{record.backstage_648}</div>)
                                :
                                (<div>{record.backstage_648}</div>)
                        )
                    },
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
                    render(val) {
                        return (val > 0 ? (<div style={{ color: "red" }}>{val}</div>) : (<div>{val}</div>))
                    },
                },
                {
                    title: '68M钻',
                    align: 'center',
                    dataIndex: 'diff_68',
                    render(val) {
                        return (val > 0 ? (<div style={{ color: "red" }}>{val}</div>) : (<div>{val}</div>))
                    },
                },
                {
                    title: '128M钻',
                    align: 'center',
                    dataIndex: 'diff_128',
                    render(val) {
                        return (val > 0 ? (<div style={{ color: "red" }}>{val}</div>) : (<div>{val}</div>))
                    },
                },
                {
                    title: '288M钻',
                    align: 'center',
                    dataIndex: 'diff_288',
                    render(val) {
                        return (val > 0 ? (<div style={{ color: "red" }}>{val}</div>) : (<div>{val}</div>))
                    },
                },
                {
                    title: '388M钻',
                    align: 'center',
                    dataIndex: 'diff_388',
                    render(val) {
                        return (val > 0 ? (<div style={{ color: "red" }}>{val}</div>) : (<div>{val}</div>))
                    },
                },
                {
                    title: '648M钻',
                    align: 'center',
                    dataIndex: 'diff_648',
                    render(val) {
                        return (val > 0 ? (<div style={{ color: "red" }}>{val}</div>) : (<div>{val}</div>))
                    },
                },
            ]
        },
    ];
    

    // 查询按钮
    handleSearch = e => {
        e.preventDefault();

        const { dispatch, form } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
            };
            console.log(values)
            this.setState({
                formValues: values,
                uploading: true
            });
            dispatch({
                type: 'billCheck/iOSList',
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
                type: 'billCheck/iOSList',
                payload: values,
            });
        });
    };

    onChangeSwitch = (checked) => {
        const { dispatch, form } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
                show_error: checked
            };

            dispatch({
                type: 'billCheck/iOSList',
                payload: values,
            });
        });
    }
    // 收起列表
    renderSimpleForm() {
        const {
            form: { getFieldDecorator },
        } = this.props;
        // const { uploading } = this.state;
        const props = {
            action: '',
            accept: ".xlsx",
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
                        <Col md={8} sm={24}>
                            <FormItem label="时间范围">
                                {getFieldDecorator('date')(<RangePicker format={dateFormat} placeholder={['开始日期', '结束日期']} />)}
                            </FormItem>
                        </Col>
                        <Col md={8} sm={24}>
                            <FormItem label="账单导入">
                                {getFieldDecorator('bill')(
                                    <Upload {...props}>
                                        <Button><Icon type="upload" />导入</Button>
                                    </Upload>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={{ md: 8, lg: 24, xl: 48 }}>

                        <Col md={8} sm={24}>
                            <FormItem label="只显示异常">
                            {getFieldDecorator('show_error', { valuePropName: 'checked' })(
                                    <Switch onChange={this.onChangeSwitch}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col md={8} sm={24}>
                            <span className={styles.submitButtons}>
                                <Button type="primary"
                                    htmlType="submit"
                                    disabled={this.state.fileList.length === 0}
                                // loading={uploading}
                                >
                                    匹配核对账单
                                    {/* {uploading ? '匹配核对账单中' : '匹配核对账单'} */}
                                </Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleFormExcel}>导出excel</Button>
                            </span>
                        </Col>
                    </Row>
                </Form>
            </Fragment >
        );
    }
    render() {
        const {
            billCheck: { iOSData },
            loading,
        } = this.props;
        // const paginationProps = {
        //     showSizeChanger: true,
        //     showQuickJumper: true,
        //     ...data.pagination,
        // };
        return (
            <Card bordered={false}>
                <div className={styles.tableList}>
                    <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
                    <div className={styles.tableAlert} style={{ marginBottom: '20px' }}>
                        {
                            iOSData.header.match_status == 1 ?
                                (<Alert message="匹配结果正常" type="success" showIcon />)
                                :
                                (iOSData.header.match_status == 2 ?
                                    (<Alert message="匹配结果有异常" type="warning" showIcon />) : (""))
                        }
                    </div>
                    <Table
                        loading={loading}
                        key={iOSData.list.length || ''}
                        dataSource={iOSData.list}
                        columns={this.columns}
                        bordered
                        scroll={{ x: 1800 }}
                    // pagination={paginationProps}
                    // onChange={this.handleStandardTableChange}
                    />
                </div>
            </Card>
        );
    }
}

export default BillCheckDefaultList;
