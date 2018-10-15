import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Form,Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DefaultList from './DefaultList';
import IosList from './IosList';
import router from 'umi/router';
@connect(({ profile, loading }) => ({
    profile,
    loading: loading.effects['profile/fetchBasic'],
}))
@Form.create()
class BasicProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            operationkey: 'defaultList',
            formLayout: 'horizontal',
        };
    }
    handleTabChange = key => {
        const { match } = this.props;
        console.log(match.url)
        switch (key) {
            case 'details-list':
                router.push({
                    pathname: `${match.url}/details-list`,
                })
                break;
            case 'ios-list':
                router.push({
                    pathname: `${match.url}/ios-list`,
                })
                break;
            default:
                break;
        }
    }
    render() {
        const tabList = [
            {
                key: 'details-list',
                tab: '账单核对',
            },
            {
                key: 'ios-list',
                tab: 'iOS账单核对',
            },
        ];
        const { children, match, location } = this.props;
        return (
            <PageHeaderWrapper
                title="账单核对"
                tabList={tabList}
                onTabChange={this.handleTabChange}
                tabActiveKey={location.pathname.replace(`${match.path}/`, '')}
            >
                <Card bordered={false}>
                    {children}
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default BasicProfile;
