import React, { PureComponent, Fragment } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, DatePicker, Table, Modal, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
const statusValue = ['', '待审核', '审核通过', '审核不通过']
const fieldLabels = {
  username: '专家账号：',
  nickname: '用户昵称：',
  add_time: '注册时间：',
  telephone: '手机号：',
  wechat: '微信号：',
  sevenDays: '近7天：',
  thirtyDays: '近30天：',
  career: '生涯：',
  name: '真实姓名：',
  id_card_no: '身份证号：',
  status: '状态：',
  apply_time: '申请时间：',
};
const FormItem = Form.Item;
const confirm = Modal.confirm;
const { TextArea } = Input;

@Form.create()
/* eslint react/no-multi-comp:0 */
@connect(({ exportdetail, loading }) => ({
  exportdetail,
  loading: loading.models.exportdetail,
}))
class ApplicatonDetails extends PureComponent {
  state = {
    visible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'exportdetail/getApplicationDetail',
      payload: this.props.location.query,
    });
  }

  sealNumber = (id) => {
    const {
      dispatch,
      exportdetail: { data },
    } = this.props;
    console.log(status)
    confirm({
      title: '确认通过该用户的审核吗',
      content: (
        <div>
          <p>用户昵称： {data.nickname}</p>
          <p>近30天： {data.last_thirtyDays_info && data.last_thirtyDays_info.rate}% 胜{data.last_thirtyDays_info && data.last_thirtyDays_info.win}走{data.last_thirtyDays_info && data.last_thirtyDays_info.draw}负{data.last_thirtyDays_info && data.last_thirtyDays_info.lose}</p>
        </div>
      ),
      okText: '通过',
      cancelText: '取消',
      onOk() {
        const param = {
          id: id,
          state: 1
        }
        dispatch({
          type: 'exportdetail/exportUpdateState',
          payload: param,
        });
      },
      onCancel() { },
    });
  }
  goback = () => {
    router.push({
      pathname: "/export/application"
    })
  }

  reject = () => {
    const {
      dispatch,
      exportdetail: { data },
      form
    } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return ;
      const values = {
        ...fieldsValue,
        state: 3,
        id: this.props.location.query.id
      };
      console.log(values)
      dispatch({
        type: 'exportdetail/exportUpdateState',
        payload: values,
      });
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  hideModal = () => {
    this.setState({
      visible: false,
    });
  }

  revocation = () => {
    const { dispatch, exportdetail: { data } } = this.props;
    const param = {
      id: data.id,
      status: '1'
    }
    dispatch({
      type: 'exportdetail/updateLockStatus',
      payload: param,
    });
  }
  applicatonDetails() {
    const {
      exportdetail: { data },
    } = this.props;
    return (
      <Form layout="inline">
        <Row style={{ marginLeft: -32, marginRight: -32 }}>
          <Col span={24}>
            <div className={styles.order}>
              <span className={styles.line}></span>
              <span className={styles.txt}>用户信息</span>
              <span className={styles.line}></span>
            </div>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            {fieldLabels.username} {data.username}
          </Col>
          <Col md={6} sm={24}>
            {fieldLabels.nickname} {data.nickname}
          </Col>
          <Col md={6} sm={24}>
            {fieldLabels.add_time} {data.add_time}
          </Col>
          <Col md={6} sm={24}>
            {fieldLabels.telephone} {data.telephone}
          </Col>
        </Row>
        <Row style={{ marginLeft: -32, marginRight: -32, marginTop: 20 }}>
          <Col span={24}>
            <div className={styles.order}>
              <span className={styles.line}></span>
              <span className={styles.txt}>命 中 率</span>
              <span className={styles.line}></span>
            </div>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            {fieldLabels.sevenDays}{data.last_sevenDays_info && data.last_sevenDays_info.rate}% 胜{data.last_sevenDays_info && data.last_sevenDays_info.win}走{data.last_sevenDays_info && data.last_sevenDays_info.draw}负{data.last_sevenDays_info && data.last_sevenDays_info.lose}
          </Col>
          <Col md={8} sm={24}>
            {fieldLabels.sevenDays}{data.last_thirtyDays_info && data.last_thirtyDays_info.rate}% 胜{data.last_thirtyDays_info && data.last_thirtyDays_info.win}走{data.last_thirtyDays_info && data.last_thirtyDays_info.draw}负{data.last_thirtyDays_info && data.last_thirtyDays_info.lose}
          </Col>
          <Col md={8} sm={24}>
            {fieldLabels.sevenDays}{data.career_info && data.career_info.rate}% 胜{data.career_info && data.career_info.win}走{data.career_info && data.career_info.draw}负{data.career_info && data.career_info.lose}
          </Col>
        </Row>
        <Row style={{ marginLeft: -32, marginRight: -32, marginTop: 20 }}>
          <Col span={24}>
            <div className={styles.order}>
              <span className={styles.line}></span>
              <span className={styles.txt}>自我介绍</span>
              <span className={styles.line}></span>
            </div>
          </Col>
        </Row>
        <Row style={{ marginLeft: -32, marginRight: -32, marginTop: 20 }}>
          <Col span={22} offset={1}>
            {data.introduce}
          </Col>
        </Row>
        <Row style={{ marginLeft: -32, marginRight: -32, marginTop: 20 }}>
          <Col span={24}>
            <div className={styles.order}>
              <span className={styles.line}></span>
              <span className={styles.txt}>实名认证</span>
              <span className={styles.line}></span>
            </div>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <div>{fieldLabels.name}{data.name}</div>
          </Col>
          <Col md={8} sm={24}>
            <div>{fieldLabels.id_card_no}{data.id_card_no}</div>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ marginTop: 20 }}>
          <Col md={8} sm={24}>
            <div><img style={{ width: "237px", height: "150px" }} src={data.id_card_front} /></div>
          </Col>
          <Col md={8} sm={24}>
            <div><img style={{ width: "237px", height: "150px" }} src={data.id_card_front} /></div>
          </Col>
        </Row>
        <Row style={{ marginLeft: -32, marginRight: -32, marginTop: 20 }}>
          <Col span={24}>
            <div className={styles.order}>
              <span className={styles.line}></span>
              <span className={styles.txt}>审核状态</span>
              <span className={styles.line}></span>
            </div>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            {fieldLabels.status}{statusValue[data.status]}
          </Col>
          <Col md={8} sm={24}>
            {fieldLabels.apply_time}{data.apply_time}
          </Col>
        </Row>
        {data.status == 2 ? (<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ margin: 24 }}>
              <Button type="primary" onClick={() => this.revocation()}>
                撤销该用户的专家资格
            </Button>
              <Button style={{ marginLeft: 8 }} onClick={() => this.goback()}>
                返回
            </Button>
            </div>
          </div>
        </Row>) : (<Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ margin: 24 }}>
              <Button type="primary" onClick={() => this.sealNumber(this.props.location.query.id)}>
                通过
            </Button>
              <Button style={{ marginLeft: 8 }} onClick={() => this.showModal()}>
                拒绝
            </Button>
            </div>
          </div>
        </Row>)}

      </Form>
    );
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Fragment>
        <PageHeaderWrapper title="查看详情">
          <Card className={styles.cardDetails} bordered={false}>
            <div className={styles.tableList}>
              <div className={styles.tableListForm}>{this.applicatonDetails()}</div>
            </div>
            <div> <Modal
              title="拒绝原因"
              visible={this.state.visible}
              onOk={this.reject}
              onCancel={this.hideModal}
              okText="确认"
              cancelText="取消"
            >
              <Form>
                <Row>
                  <Col md={24} sm={24}>
                    <Form.Item>
                      {getFieldDecorator('reason', {
                        rules: [{ required: true, message: '请输入拒绝原因' }],
                      })(<TextArea rows={4} placeholder="请输入拒绝原因" style={{ width: '100%' }} />)}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Modal></div>
          </Card>
        </PageHeaderWrapper>
      </Fragment>
    );
  }
}

export default ApplicatonDetails;
