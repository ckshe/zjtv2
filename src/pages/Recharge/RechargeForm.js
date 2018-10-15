import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {Form,Input,DatePicker,Select,Button,Card,} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

@connect(({ loading }) => ({
    submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
class BasicForms extends PureComponent {
    handleSubmit = e => {
        const { dispatch, form } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
                add_time: fieldsValue.add_time ? fieldsValue.add_time.format('L') : '',
                recharge_time: fieldsValue.recharge_time ? fieldsValue.recharge_time.format('L') : '',
            }
            if (!err) {
                dispatch({
                    type: 'strikeBalance/add',
                    payload: values,
                });
            }
        });
    };

    render() {
        const { submitting } = this.props;
        const {
            form: { getFieldDecorator, getFieldValue },
        } = this.props;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
                md: { span: 10 },
            },
        };

        const submitFormLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 10, offset: 7 },
            },
        };

        return (
            <PageHeaderWrapper
                title="冲账充值"
            >
                <Card bordered={false}>
                    <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
                        <FormItem {...formItemLayout} label="用户名">
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入用户名',
                                    },
                                ],
                            })(<Input placeholder="请输入用户名" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="用户ID">
                            {getFieldDecorator('user_id', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入用户ID',
                                    },
                                ],
                            })(<Input placeholder="请输入用户ID" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="用户充值时间">
                            {getFieldDecorator('recharge_time', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择用户充值时间',
                                    },
                                ],
                            })(<DatePicker />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="运营补账时间">
                            {getFieldDecorator('add_time', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入运营补账时间',
                                    },
                                ],
                            })(<DatePicker />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="客户端">
                            {getFieldDecorator('plat', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择客户端',
                                    },
                                ],
                            })(
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
                        <FormItem {...formItemLayout} label="支付方式">
                            {getFieldDecorator('pay_type', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择充值数',
                                    },
                                ],
                            })(
                                <Select placeholder="请选择">
                                    <Option value="1">微信</Option>
                                    <Option value="2">支付宝 APP</Option>
                                    <Option value="3">支付宝手机网页</Option>
                                    <Option value="4">App Store</Option>
                                    <Option value="5">Google Play</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="充值数">
                            {getFieldDecorator('recharge_id', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择充值数',
                                    },
                                ],
                            })(
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
                        <FormItem {...formItemLayout} label="是否首冲">
                            {getFieldDecorator('is_first', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择是否首冲',
                                    },
                                ],
                            })(
                                <Select placeholder="请选择">
                                    <Option value="0">否</Option>
                                    <Option value="1">是</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label="需到账钻数">
                            {getFieldDecorator('arrival_num', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入到账钻数',
                                    },
                                ],
                            })(<Input placeholder="请输入到账钻数" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="第三方ID">
                            {getFieldDecorator('third_party_id', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入第三方ID',
                                    },
                                ],
                            })(<Input placeholder="请输入第三方ID" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="订单号">
                            {getFieldDecorator('order_no', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入订单号',
                                    },
                                ],
                            })(<Input placeholder="请输入订单号" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="备注">
                            {getFieldDecorator('remark')(
                                <TextArea style={{ minHeight: 32 }} placeholder="请输入备注" rows={4} />
                            )}
                        </FormItem>
                        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                            <Button type="primary" htmlType="submit" loading={submitting}>
                                提交审核
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default BasicForms;
