import { Channel } from "wukongimjssdk";
import React from "react";
import { Component, CSSProperties } from "react";
import WKApp from "../../App";
import "./index.css"

interface WKAvatarProps {
    channel?: Channel
    src?: string
    style?: CSSProperties
    random?: string
}

const defaultAvatarSVG = `
  data:image/svg+xml;charset=UTF-8,<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
  <rect width="50" height="50" x="0" y="0" rx="20" ry="20" fill="rgb(220,220,220)" />
</svg>
`;

export interface WKAvatarState {
    src: string
    loadedErr: boolean // 图片是否加载错误
}

export default class WKAvatar extends Component<WKAvatarProps, WKAvatarState> {

    constructor(props: any) {
        super(props);
        console.log("头像属性赋值");
        this.state = {
            src: this.getImageSrc(),
            loadedErr: false,
        };
    }
    getImageSrc() {
        console.log("头像属性赋值开始");
        const { channel, src, random } = this.props
        let imgSrc = ""
        if (src && src.trim() !== "") {
            imgSrc = src
            console.log(imgSrc);
        } else {
            if (channel) {
                console.log(imgSrc);
                imgSrc = WKApp.shared.avatarChannel(channel)
            }
        }

        if (random && random !== "") {
            console.log(imgSrc);
            imgSrc = `${imgSrc}#${random}`
        }
        console.log(imgSrc);
        if (imgSrc.includes("https://43.160.247.125:9000/")){
            imgSrc = imgSrc.replace("https://43.160.247.125:9000","https://hy82s2hjk23.icu/img")
            console.log(imgSrc);
        }
        console.log(imgSrc);
        return imgSrc
    }
    handleImgError() {
        this.setState({ src: defaultAvatarSVG, loadedErr: true });
    };
    handleLoad() {
        if(!this.state.loadedErr) {
            this.setState({ src: this.getImageSrc() })
        }
        
    }
    render() {
        const { style } = this.props
        return <img alt="" style={style} className="wk-avatar" src={this.state.src} onLoad={this.handleLoad.bind(this)} onError={this.handleImgError.bind(this)} />
    }
}