import React, {
	Component,
	Fragment
} from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Button, Modal, Form, Input, Radio  } from 'antd';
import Link from 'umi/link';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Details.less';
import { level, recommendType } from '@/pages/config'

const {	Description} = DescriptionList;
const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
@connect(({
	recommendDetails,
	loading
}) => ({
	recommendDetails,
	loading: loading.effects.recommendDetails,
}))
class Details extends Component {
	state = {
		visible1: false,
		visible2: false,
		formValues: {},
		reason:'',
		loading: false,
		id:0,
	};

	componentDidMount() {
		const {
			dispatch
		} = this.props;
		dispatch({
			type: 'recommendDetails/getReDetail',
			payload: this.props.location.query
		});
	}
	// 如果审核请求触发成功时 models的state发生变化 就会执行该生命周期函数
    // 如果models的state 的review有值则重新请求列表数据
    componentWillReceiveProps(nextProps){
//  	console.log("nextProps",nextProps)
        const { dispatch } = this.props;
        if(nextProps.recommendDetails.review){
            dispatch({
                type: 'recommendDetails/getReDetail',
                payload: this.props.location.query
            });
        }
    }
	//显示解锁内容
	showUnlockModal = () => {
		this.setState({
			visible1: true,
		});
	}
	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible1: false,
		});
	}
	//显示解锁内容
	showUnlockModal_other = (id) => {
		this.setState({
			visible2: true,
			id:id
		});
	}
	handleCancel_other = (e) => {
		console.log(e);
		this.setState({
			visible2: false,
		});
	}

	handleOk_other = (e) => {
		e.preventDefault();
		const {
			form,
			dispatch,
		} = this.props;
		this.setState({
			loading: true
		});
		setTimeout(() => {
			form.validateFields((err, fieldsValue) => {
				if(err) return;
				const values = {
					...fieldsValue,
					id:this.state.id
				};
				this.setState({
					formValues: values,
				});
				console.log("fieldsValue==",values)
				dispatch({
					type: 'recommendDetails/setReason',
					payload: values,
				});
			});
			this.setState({
				loading: false,
				visible2: false
			});
		}, 1000);
	}

	columns = [{
		title: '序号',
		dataIndex: 'id',
	}, {
		title: '账号',
		dataIndex: 'username',
	}, {
		title: '昵称',
		dataIndex: 'nickname',
	}, {
		title: '解锁时间',
		dataIndex: 'time',
	}];
	
	render() {
		const {
			recommendDetails: {
				data
			},
			form: { getFieldDecorator },
			loading
		} = this.props;
		let recommend_state;
		if(data.recommend_type == 1) {
			if(data.recommend_side == 1) {
				recommend_state = data.game_info.home_team
			} else if(data.recommend_side == 2) {
				recommend_state = data.game_info.away_team
			}
		} else if(data.recommend_type == 2) {
			if(data.recommend_side == 1) {
				recommend_state = "大球"
			} else if(data.recommend_side == 2) {
				recommend_state = "小球"
			}
		} else if(data.recommend_type == 3) {
			if(data.recommend_side == 1) {
				recommend_state = data.game_info.home_team + "(胜)";
			} else if(data.recommend_side == 2) {
				recommend_state = data.game_info.away_team + "(胜)";
			} else if(data.recommend_side == 3) {
				recommend_state = data.game_info.home_team + "(平)";
			} else if(data.recommend_side == 4) {
				recommend_state = data.game_info.home_team + "(胜平)";
			} else if(data.recommend_side == 5) {
				recommend_state = data.game_info.away_team + "(胜平)";
			}
		}
		const dataSource = data.view_user_list;
		const cancel_reason = data.cancel_reason;
		const contentList = {
			detail: (
				<Fragment>
		          <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }} col="3">
		            <Description term="账号">{data.user_info.username}</Description>
		            <Description term="注册时间">{data.user_info.add_time}</Description>
		            <Description term="昵称">{data.user_info.nickname}</Description>
		            <Description term="手机">{data.user_info.telephone}</Description>
		            <Description term="称号">{level[data.user_info.level]}</Description>
		          </DescriptionList>
		          <Divider style={{ marginBottom: 32 }} />
		          <DescriptionList size="large" title="比赛信息" style={{ marginBottom: 32 }} col="1">
			            <Description><div className={styles.text1}>[{data.game_info.competition_name}]</div></Description>
			            <Description><div className={styles.text1}>{data.game_info.home_team} VS {data.game_info.away_team}</div></Description>
			            <Description>{data.game_info.game_time}</Description>
		          </DescriptionList>
		          <Divider style={{ marginBottom: 32 }} />
		          <DescriptionList size="large" title="推介内容" style={{ marginBottom: 16 }} col="1">
			            <Description term="推介"><div className={styles.colorRed}>{recommend_state}</div></Description>
			            <Description term="描述"><div className={styles.text1}>{data.content}</div></Description>
		          </DescriptionList>
		          <DescriptionList className={styles.headerList} size="small" col="3">
					    <Description term="查看所需M钻">{data.viewmd}</Description>
					    <Description term="推介类型">{recommendType[data.recommend_type]}</Description>
					    <Description term="时间">{data.add_time}</Description>
				  </DescriptionList>
		          <DescriptionList className={styles.headerList} size="small" col="4">
					    <Description term="查看人数">{data.view_num}</Description>
					    <Description term="专家收入M钻">{data.expert_income}</Description>
					    <Description term="平台收入M钻">{data.plat_income}</Description>
					    <Description term="分成比例">{data.income_rate}%</Description>
				  </DescriptionList>
		          <Divider style={{ marginBottom: 32 }} />
			        <div className={styles.headerList}>
					  <Button type="primary" ghost className={styles.buttonMarginRight} onClick={this.showUnlockModal}>查看解锁用户</Button>
					  <Button type="primary" ghost onClick={()=>this.showUnlockModal_other(data.id)}>撤销该条推介</Button>
					</div>
					<Link to="/recommend/recommend-list" ><Button type="primary"> 返回</Button></Link>
					  <Modal title="查看解锁用户" centered  footer={null} visible={this.state.visible1} onOk={this.handleOk}  onCancel={this.handleCancel} >
					  		<Table rowKey="id" columns={this.columns} dataSource={dataSource} pagination={false} />
			    	</Modal>
	      </Fragment>
			)
		}
		return(
		  <PageHeaderWrapper title="推介详情">
	    	  <Card bordered={false}>
	          {contentList["detail"]}
	        </Card>
	          
	    <Modal
          visible={this.state.visible2}
          title="撤销该推介"
          onCancel={this.handleCancel_other}
          centered
          footer={null}
        >
          <Form layout="horizontal" onSubmit={this.handleOk_other}>
            <FormItem label="填写撤销原因">
              {getFieldDecorator('reason',{initialValue : cancel_reason })(<TextArea  rows={4} />)}
            </FormItem>
            <div className={styles.modalFoot}>
	            <Button key="back" onClick={this.handleCancel_other}>取消</Button>,
	            <Button key="submit" type="primary"  loading={this.state.loading}   htmlType="submit">
	              	更新
	            </Button>
            </div>
          </Form>
        </Modal>
	      </PageHeaderWrapper>
		);
	}
}

export default Details;