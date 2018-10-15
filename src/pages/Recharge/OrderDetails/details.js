import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import DescriptionList from '@/components/DescriptionList';
import { Divider } from 'antd';

const { Description } = DescriptionList;
const orderStatus = ["未付款", "已完成", "已取消"];
const orderPayment = ["", "微信", "支付宝APP", "支付宝手机网页", "App Store", "Google Play"];
const orderPlat = ["安卓中文版app", "苹果中文版APP", "webapp", "PCweb", "安卓国际版app", "苹果国际版app"];

@connect(({ reachargDetails, loading }) => ({
    reachargDetails,
    loading: loading.models.reachargDetails,
}))
class RechargeDetails extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'reachargDetails/fetch',
            payload: this.props.location.query
        });
    }

    render() {
        const {
            reachargDetails: { data },
        } = this.props;
        return (
            <Fragment>
                <DescriptionList size="large" title="订单信息" style={{ marginBottom: 32 }}>
                    <Description style={{ color: 'red !important' }} term="创建日期">{data.add_time}</Description>
                    <Description term="完成日期">{data.hooks_time}</Description>
                    <Description term="订单号">{data.order_no}</Description>
                    <Description term="第三方ID">{data.ping_id}</Description>
                    <Description term="订单状态">{orderStatus[data.status]}</Description>
                </DescriptionList>
                <Divider style={{ marginBottom: 32 }} />
                <DescriptionList size="large" title="付款信息" style={{ marginBottom: 32 }}>
                    <Description term="支付方式">{orderPayment[data.pay_type]}</Description>
                    <Description term="支付端">{orderPlat[data.plat]}</Description>
                    <Description term="销售金额">{data.amount}</Description>
                    <Description term="钻">{data.score}</Description>
                </DescriptionList>
                <Divider style={{ marginBottom: 32 }} />
                <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
                    <Description term="账号">{data.username}</Description>
                    <Description term="昵称">{data.nickname}</Description>
                    <Description term="ID">{data.user_id}</Description>
                    <Description term="IP">{data.client_ip}</Description>
                    <Description term="备注">{data.remark ? data.remark : '无'}</Description>
                </DescriptionList>
            </Fragment>
        );
    }
}

export default RechargeDetails;
