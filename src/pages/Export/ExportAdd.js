import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import router from 'umi/router';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Icon, Button, DatePicker, Table, Modal, Alert } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import { recommendType, status, level, sort } from '@/pages/config'
import TextArea from 'antd/lib/input/TextArea';
import Avatar from './AvatarView';
const FormItem = Form.Item;
const { Option } = Select;
const fieldLabels = {
  avatar: '头像',
  username: '账号',
  nickname: '昵称',
  source: '来源',
  introduce: '个人简介',
  name: '真实姓名',
  id_card_no: '身份证',
  bank_card_no: '银行卡',
  bank: '所属银行',
  telephone: '手机号',
  wechat: '微信号',
};

/* eslint react/no-multi-comp:0 */
@connect(({ exportlist, loading }) => ({
  exportlist,
  loading: loading.models.exportlist,
}))
@Form.create()
class ExportAdd extends PureComponent {
  state = {
  };

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'exportlist/getExportlist',
    //   payload: {},
    // });
  }

  render() {
    const {
      loading,
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Fragment>
        <PageHeaderWrapper title="添加专家">
          <Card bordered={false}>
            <Form layout="vertical" hideRequiredMark>
              <Row>
                <Col span={3}>
                  <Form.Item label={fieldLabels.avatar}>
                    {getFieldDecorator('avatar')(<Avatar></Avatar>)}
                  </Form.Item>
                </Col>
                <Col span={21}>
                  <Row gutter={16}>
                    <Col span={8}>
                      <Form.Item label={fieldLabels.username}>
                        {getFieldDecorator('username', {
                          rules: [{ required: true, message: '请输入账号' }],
                        })(<Input placeholder="请输入账号" />)}
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label={fieldLabels.nickname}>
                        {getFieldDecorator('nickname', {
                          rules: [{ required: true, message: '请输入昵称' }],
                        })(<Input placeholder="请输入昵称" />)}
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label={fieldLabels.source}>
                        {getFieldDecorator('source', {
                          rules: [{ required: true, message: '请选择来源' }],
                        })(
                          <Select placeholder="请选择管理员">
                            <Option value="1">7m内部专家</Option>
                            <Option value="2">sportsDt</Option>
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={16}>
                      <Form.Item label={fieldLabels.introduce}>
                        {getFieldDecorator('introduce', {
                          rules: [{ required: true, message: '请输入个人简介' }],
                        })(<TextArea rows={2} placeholder="请输入个人简介" />)}
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className={styles.order}>
                    <span className={styles.line}></span>
                    <span className={styles.txt}>实名认证</span>
                    <span className={styles.line}></span>
                  </div>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label={fieldLabels.name}>
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: '请输入真实姓名' }],
                    })(<Input placeholder="请输入真实姓名" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={fieldLabels.id_card_no}>
                    {getFieldDecorator('id_card_no', {
                      rules: [{ required: true, message: '请输入身份证' }],
                    })(<Input placeholder="请输入身份证" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={fieldLabels.bank_card_no}>
                    {getFieldDecorator('bank_card_no', {
                      rules: [{ required: true, message: '请输入银行卡' }],
                    })(<Input placeholder="请输入银行卡" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label={fieldLabels.bank}>
                    {getFieldDecorator('bank', {
                      rules: [{ required: true, message: '请输入所属银行' }],
                    })(<Input placeholder="请输入所属银行" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={fieldLabels.telephone}>
                    {getFieldDecorator('telephone', {
                      rules: [{ required: true, message: '请输入手机号' }],
                    })(<Input placeholder="请输入手机号" />)}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={fieldLabels.wechat}>
                    {getFieldDecorator('wechat', {
                      rules: [{ required: true, message: '请输入微信号' }],
                    })(<Input placeholder="请输入微信号" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form.submit" />
              </Button>
            </Form>
          </Card>
        </PageHeaderWrapper>
      </Fragment>
    );
  }
}

export default ExportAdd;
