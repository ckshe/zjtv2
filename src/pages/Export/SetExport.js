import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import router from 'umi/router';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, Modal } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import TextArea from 'antd/lib/input/TextArea';
import Avatar from './AvatarView';
import { level } from '@/pages/config'
const FormItem = Form.Item;
const confirm = Modal.confirm;
const { Option } = Select;
const fieldLabels = {
  avatar: '专家头像',
  username: '账号',
  nickname: '专家昵称',
  source: '来源',
  summary: '专家简介',
  level: '专家称号'
};
const fieldSelect = ['', '7m内部专家', 'b端SportsDT']

/* eslint react/no-multi-comp:0 */
@connect(({ setexport, loading }) => ({
  setexport,
  loading: loading.effects['setexport/getExpertDtail']
}))
@Form.create()
class ExportAdd extends PureComponent {
  state = {
    lockSuccess: false,
    avatar: ''
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'setexport/getExpertDtail',
      payload: this.props.location.query,
    });
  }
  handleSubmit = e => {
    const { dispatch, form,setexport: { data }} = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      console.log("333333333333",data.avatar)
      if(!values.avatar){
            values.avatar = data.avatar;
      }
      if (!err) {
        dispatch({
          type: 'setexport/expertUpdate',
          payload: values,
        });
      }
    });
  };
  onAvatarPic = (avatarpic) => {
    console.log("avatarpic=============",avatarpic)
    return avatarpic;
  }
  handleCategoryChange = (source)=>{
    console.log("source===============",source)
  }
  //封号
  sealNumber = () => {
    const {
      dispatch,
      setexport: { data },
    } = this.props;
    confirm({
      title: '确认对该专家进行封号吗？',
      content: (
        <div>
          <p>专家昵称： {data.nickname}</p>
          <p>来源: {fieldSelect[data.source]}</p>
        </div>
      ),
      okText: '封号',
      cancelText: '取消',
      onOk() {
        const param = {
          id: data.id,
          status: '1'
        }
        dispatch({
          type: 'setexport/updateLockStatus',
          payload: param,
        });
      },
      onCancel() { },
    });
  }
  
  render() {
    const {
      setexport: { data },
      loading,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Fragment>
        <PageHeaderWrapper title="专家设置">
          <Card bordered={false}>
            <Form layout="inline" hideRequiredMark onSubmit={this.handleSubmit}>
              <Row gutter={16} type="flex" justify="space-around" align="middle" >
                <Col span={8}>
                  <Form.Item label={fieldLabels.username}>
                    {data.username}
                  </Form.Item>
                </Col>
                <Col span={0}>
                  <Form.Item>
                    {getFieldDecorator('id',{initialValue: data.id})(
                      <Input />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={fieldLabels.source}>
                    {getFieldDecorator('source', {
                      initialValue: data.source+'',
                    })(
                      <Select placeholder="请选择来源" style={{ width: 120 }}>
                        <Option value="1">7m内部专家</Option>
                        <Option value="2">sportsDt</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Button type="primary" ghost onClick={this.sealNumber}>封号</Button>
                </Col>
              </Row>

              <Row style={{ marginBottom: 20, marginTop: 20 }}>
                <Col span={24}>
                  <div className={styles.order}>
                    <span className={styles.line}></span>
                    <span className={styles.txt}>7M中文</span>
                    <span className={styles.line}></span>
                  </div>
                </Col>
              </Row>

              <Row style={{ marginBottom: 20, marginTop: 20 }}>
                <Col span={24}>
                  <Form.Item label={fieldLabels.nickname}>
                    {getFieldDecorator('nickname', { initialValue: data.nickname, rules: [{ required: true, message: '请输入昵称' }], })(<Input placeholder="请输入昵称" style={{ width: 360 }} />)}
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ marginBottom: 20, marginTop: 20 }}>
                <Col span={24}>
                  <Form.Item label={fieldLabels.level}>
                    {getFieldDecorator('level', {
                      initialValue: data.level+'',
                      rules: [{ required: true, message: '请输入称号' }]
                    })(
                      <Select placeholder="请输入称号" style={{ width: 360 }}>
                        <Option value="1">精英玩家</Option>
                        <Option value="2">7M分析师</Option>
                        <Option value="4">好波名家</Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ marginBottom: 20, marginTop: 20 }}>
                <Col span={16}>
                  <Form.Item label={fieldLabels.summary}>
                    {getFieldDecorator('summary', {
                      initialValue: data.summary, rules: [{ required: true, message: '请输入专家个人简介' }],
                    })(<TextArea rows={4} placeholder="请输入专家个人简介" style={{ width: 360 }} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ marginBottom: 20, marginTop: 20 }}>
                <div className={styles.addExportAvatar} style={{ width: "200px", display: "inline" }}>
                  <Form.Item label={fieldLabels.avatar}>
                    {getFieldDecorator('avatar', { getValueFromEvent: this.onAvatarPic })(<Avatar avatar={data.avatar} onChange={this.onAvatarPic} />)}
                  </Form.Item>
                </div>
              </Row>
              <Row style={{ marginBottom: 20, marginTop: 20 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  保存
              </Button>
              </Row>
            </Form>
          </Card>
        </PageHeaderWrapper>
      </Fragment>
    );
  }
}

export default ExportAdd;
