import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
// import router from 'umi/router';
import {
    Row,
    Col,
    Card,
    Form,
    Select,
    Icon,
    Button,
    DatePicker,
    Badge,
    Table,
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
            title: '后台时间',
            align: 'center',
            dataIndex: 'backstage_time',
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
            title: '后台金额',
            align: 'center',
            dataIndex: 'backstage_amount',
        },
        {
            title: '对应钻数',
            align: 'center',
            dataIndex: 'backstage_score',
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
            dataIndex: 'third_party_id',
        },
        {
            title: '第三方金额',
            align: 'center',
            dataIndex: 'third_party_amount',
        },
        {
            title: '第三方时间',
            align: 'center',
            dataIndex: 'third_party_time',
        },
        {
            title: '匹配结果',
            align: 'center',
            dataIndex: 'match_status',
            render(val) {
                return <div>{
                    val==1?(<span>匹配正常</span>):
                           (<span style={{color:"red"}}>匹配异常</span>)}
                        </div>
            },
        }
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
            // console.log(values)
            this.setState({
                formValues: values,
                uploading:true
            });
            dispatch({
                type: 'billCheck/defaultList',
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
                type: 'billCheck/defaultList',
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
                type: 'billCheck/defaultList',
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
            billCheck: { defaultData },
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
                    <div className={styles.tableAlert}>
                    {
                        defaultData.header.backstage_count?(
                            <Alert
                            message={
                                <Fragment>
                                    后台收入统计{defaultData.header.backstage_count}元,
                                    第三方收入统计{defaultData.header.third_party_count}元,
                                    金额差异为{defaultData.header.diff}
                                </Fragment>
                            }
                            type="info"
                            showIcon
                        />
                        ):("")
                    }
                    </div>
                    <Table
                        loading={loading}
                        key={defaultData.list.length || ''}
                        dataSource={defaultData.list}
                        columns={this.columns}
                        bordered
                        // pagination={paginationProps}
                        // onChange={this.handleStandardTableChange}
                    />
                </div>
            </Card>
        );
    }
}

export default BillCheckDefaultList;
