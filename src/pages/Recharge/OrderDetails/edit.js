import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Select, Form, Input, Button } from 'antd';
// import DescriptionList from '@/components/DescriptionList';
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;

@connect(({ reachargDetails, loading }) => ({
    reachargDetails,
    loading: loading.models.reachargDetails,
}))
@Form.create()
class rechargeOrderEdit extends Component {
    state = {
        formLayout: 'horizontal',
    };
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'reachargDetails/fetch',
            payload: this.props.location.query
        });
    }
    handleSubmit = e => {
        const { dispatch, form } = this.props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
                id: this.props.location.query.id
            }
            dispatch({
                type: 'reachargDetails/edit',
                payload: values
            });
        });
    }
    render() {
        const {
            form: { getFieldDecorator },
            reachargDetails: { data },
        } = this.props;
        console.log(data)
        const { formLayout } = this.state;
        const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: { span: 3 },
            wrapperCol: { span: 8 },
        } : null;
        const buttonItemLayout = formLayout === 'horizontal' ? {
            wrapperCol: { span: 8, offset: 3 },
        } : null;
        return (
            <Fragment>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="订单状态">
                        {getFieldDecorator('status', {
                            initialValue:data.status+'',
                            rules: [{ required: true, message: '请选择订单状态' }],
                        })(
                            <Select placeholder="请选择" >
                                <Option value="0">未付款</Option>
                                <Option value="1">已完成</Option>
                                <Option value="2">已取消</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="备注">
                        {getFieldDecorator('remark',{
                            initialValue:data.remark,
                        })(
                            <TextArea
                                style={{ minHeight: 32 }}
                                placeholder="请输入备注"
                                rows={4}
                            />
                        )}
                    </FormItem>
                    <FormItem {...buttonItemLayout}>
                        <Button type="primary" htmlType="submit">保存</Button>
                    </FormItem>
                </Form>
            </Fragment>
        );
    }
}

export default rechargeOrderEdit;
