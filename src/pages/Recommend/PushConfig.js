import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableForm from './TableForm';
import isEqual from 'lodash/isEqual';

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

  onChange = (saveData) =>{
    console.log(saveData);
    const { dispatch } = this.props;
    dispatch({
      type: 'pushConfigModel/updatePushConfig',
      payload: saveData,
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
          <TableForm value={data && data.data.list} onChange = {this.onChange} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default PushConfig;
