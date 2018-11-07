import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableForm from './TableForm';
import styles from './style.less';

const FormItem = Form.Item;

@Form.create()
@connect(({ pushConfigModel, loading }) => ({
  pushConfigModel,
  loading: loading.models.pushConfigModel,
}))
class PushConfig extends PureComponent {
  state = {

  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'pushConfigModel/pushConfigList',
    });
  }

  render() {
    const {
      pushConfigModel: { data },
      loading,
    } = this.props;
    console.log("render====",data && data.data.list)
    return (
      <PageHeaderWrapper title="推介配置">
        <Card bordered={false}>
          <TableForm value={data && data.data.list} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default PushConfig;
