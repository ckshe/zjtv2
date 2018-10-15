import React, { Component } from 'react';
import { Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
class BasicProfile extends Component {

  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'details':
        router.push({
          pathname: `${match.url}/details`,
          query: {
            id: this.props.location.query.id
          }
        })
        break;
      case 'edit':
        router.push({
          pathname: `${match.url}/edit`,
          query: {
            id: this.props.location.query.id
          }
        })
        break;
      default:
        break;
    }
  }
  
  render() {
    const tabList = [
      {
        key: 'details',
        tab: '详情',
      },
      {
        key: 'edit',
        tab: '编辑',
      },
    ];

    const { children,match,location } = this.props;
    return (
      <PageHeaderWrapper
        title="订单详情页"
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
