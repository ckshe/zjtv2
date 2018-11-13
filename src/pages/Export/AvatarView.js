import { Upload, Icon, message } from 'antd';
import host from '@/utils/host';
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('只支持JPG、GIF、PNG的图片格式');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小必须小于2M');
    }
    return isJPG && isLt2M;
}

class Avatar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        };
    }
    handleChange = (info) => {
        console.log("info====",info)
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        console.log("info====",info)
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
            const { onChange } = this.props;
            const avatarpic = info.file.response.data.avatar;
            onChange(avatarpic);
        }
    }
   postPic = ()=>{
       return `${host()}/expert/uploadAvatar`
   }
    render() {
        const uploadButton = (
            <div style={{width:"100px",height:"100px",display: "initial"}}>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={this.postPic}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                withCredentials={true}
                data={{mode:"backstage"}}
            >
                {imageUrl ? <img style={{width:"100px",height:"100px"}} src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
        );
    }
}
export default Avatar;