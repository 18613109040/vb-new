import React from 'react';
import PropTypes from 'prop-types'
import {createPortal} from 'react-dom';
import SetTitle from 'components/SetTitle'
import MeScroll from 'mescroll.js'
import 'mescroll.js/mescroll.min.css'
import './index.less'
class Header extends React.Component {
    static propTypes = {
        actionEvent: PropTypes.func,
        filterConditions: PropTypes.array,
        FetchAction:PropTypes.func
    };
    static defaultProps = {
        actionEvent: () => {},
        filterConditions: [
            {
                name: "综合",
                selected: true,
                downname: "comprehensive",
                upname: "comprehensive",
                up: true,
                down: false
            }, {
                name: "销量优先",
                selected: false,
                downname: "cost",
                upname: "cost",
                up: false,
                down: false
            }, {
                name: "价格",
                selected: false,
                downname: "descPrice",
                upname: "ascPrice",
                up: false,
                down: false
            }
        ]
    };
    constructor(props) {
        super(props)
        this.state = {
            listData:[]
        }

    }
    downCallback=()=>{

    }
    upCallback=()=>{

    }
    componentDidMount() {
        var isPC = typeof window.orientation == 'undefined' ;
        //创建MeScroll对象,内部已默认开启下拉刷新,自动执行up.callback,刷新列表数据;
			var mescroll = new MeScroll("mescroll", {
				//下拉刷新的所有配置项
				down:{
					use: true, //是否初始化下拉刷新; 默认true
					auto: true, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
					autoShowLoading: false, //如果在初始化完毕之后自动执行下拉回调,是否显示下拉刷新进度; 默认false
					isLock: false, //是否锁定下拉,默认false;
					isBoth: false, //下拉刷新时,如果滑动到列表底部是否可以同时触发上拉加载;默认false,两者不可同时触发;
					callback: (mescroll)=> {
						//加载轮播数据
						//loadSwiper();
						//下拉刷新的回调,默认重置上拉加载列表为第一页(down的auto默认true,初始化Mescroll之后会自动执行到这里,而mescroll.resetUpScroll会触发up的callback)
						mescroll.resetUpScroll();
					},
					offset: 60, //触发刷新的距离,默认80
					outOffsetRate: 0.2, //超过指定距离范围外时,改变下拉区域高度比例;值小于1且越接近0,越往下拉高度变化越小;
					bottomOffset: 20, //当手指touchmove位置在距离body底部20px范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
					minAngle: 45, //向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
					hardwareClass: "mescroll-hardware", //硬件加速样式;解决iOS下拉因隐藏进度条而闪屏的问题,参见mescroll.css
					//warpId: null, //可配置下拉刷新的布局添加到指定id的div;默认不配置,默认添加到mescrollId
					warpClass: "mescroll-downwarp", //容器,装载布局内容,参见mescroll.css
					resetClass: "mescroll-downwarp-reset", //高度重置的动画,参见mescroll.css
					htmlContent: '<p class="downwarp-progress"></p><p class="downwarp-tip">下拉刷新 </p>', //布局内容
					inited: function(mescroll, downwarp) {
						console.log("down --> inited");
						//初始化完毕的回调,可缓存dom
						mescroll.downTipDom = downwarp.getElementsByClassName("downwarp-tip")[0];
						mescroll.downProgressDom = downwarp.getElementsByClassName("downwarp-progress")[0];
					},
					inOffset: function(mescroll) {
						console.log("down --> inOffset");
						//进入指定距离offset范围内那一刻的回调
						if(mescroll.downTipDom) mescroll.downTipDom.innerHTML = "下拉刷新";
						if(mescroll.downProgressDom) mescroll.downProgressDom.classList.remove("mescroll-rotate");
					},
					outOffset: function(mescroll) {
						console.log("down --> outOffset");
						//下拉超过指定距离offset那一刻的回调
						if(mescroll.downTipDom) mescroll.downTipDom.innerHTML = "释放更新";
					},
					onMoving: function(mescroll, rate, downHight) {
						//下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离offset的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
						console.log("down --> onMoving --> mescroll.optDown.offset="+mescroll.optDown.offset+", downHight="+downHight+", rate="+rate);
						if(mescroll.downProgressDom) {
							var progress = 360 * rate;
							mescroll.downProgressDom.style.webkitTransform = "rotate(" + progress + "deg)";
							mescroll.downProgressDom.style.transform = "rotate(" + progress + "deg)";
						}
					},
					beforeLoading: function(mescroll, downwarp) {
						console.log("down --> beforeLoading");
						//准备触发下拉刷新的回调
						return false; //如果要完全自定义下拉刷新,那么return true,此时将不再执行showLoading(),callback();
					},
					showLoading: function(mescroll) {
						console.log("down --> showLoading");
						//触发下拉刷新的回调
						if(mescroll.downTipDom) mescroll.downTipDom.innerHTML = "加载中 ...";
						if(mescroll.downProgressDom) mescroll.downProgressDom.classList.add("mescroll-rotate");
					}
				},
				//上拉加载的所有配置项
				up: {
					use: true, //是否初始化上拉加载; 默认true
					auto: true, //是否在初始化时以上拉加载的方式自动加载第一页数据; 默认true
					isLock: false, //是否锁定上拉,默认false
					isBoth: false, //上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认false,两者不可同时触发; 这里为了演示改为true,不必等列表加载完毕才可下拉;
					isBounce: false, //是否允许ios的bounce回弹;默认true,允许回弹; 此处配置为false,可解决微信,QQ,Safari等等iOS浏览器列表顶部下拉和底部上拉露出浏览器灰色背景和卡顿2秒的问题
					callback: (page,mescroll)=>{
                      
                        this.getListData(page,mescroll)
                    }, //上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
					page: {
						num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
						size: 10, //每页数据条数
						time: null //加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
					},
					noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
					offset: 100, //离底部的距离
					toTop: {
						//回到顶部按钮,需配置src才显示
						warpId: null, //父布局的id; 默认添加在body中
						src: require("assets/images/mescroll-totop.png"), //图片路径,默认null;
						html: null, //html标签内容,默认null; 如果同时设置了src,则优先取src
						offset: 1000, //列表滚动多少距离才显示回到顶部按钮,默认1000
						warpClass: "mescroll-totop", //按钮样式,参见mescroll.css
						showClass: "mescroll-fade-in", //显示样式,参见mescroll.css
						hideClass: "mescroll-fade-out", //隐藏样式,参见mescroll.css
						duration: 300, //回到顶部的动画时长,默认300ms
						supportTap: false //默认点击事件用onclick,会有300ms的延时;如果您的运行环境支持tap,则可配置true;
					},
					loadFull: {
						use: false, //列表数据过少,不足以滑动触发上拉加载,是否自动加载下一页,直到满屏或者无更多数据为止;默认false,因为可通过调高page.size或者嵌套mescroll-bounce的div避免这个情况
						delay: 500 //延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
					},
					empty: {
						//列表第一页无任何数据时,显示的空提示布局; 需配置warpId或clearEmptyId才生效;
						warpId:null, //父布局的id; 如果此项有值,将不使用clearEmptyId的值;
						icon: require("assets/images/empty.png"), //图标,默认null
						tip: "暂无相关数据~", //提示
						btntext: "去逛逛 >", //按钮,默认""
						btnClick: function(){//点击按钮的回调,默认null
							alert("点击了按钮,具体逻辑自行实现");
						},
						supportTap: false //默认点击事件用onclick,会有300ms的延时;如果您的运行环境支持tap,则可配置true;
					},
					clearId: null, //加载第一页时需清空数据的列表id; 如果此项有值,将不使用clearEmptyId的值;
					//clearEmptyId: "dataList", //相当于同时设置了clearId和empty.warpId; 简化写法,默认null;
					hardwareClass: "mescroll-hardware", //硬件加速样式,动画更流畅,参见mescroll.css
					warpId: null, //可配置上拉加载的布局添加到指定id的div;默认不配置,默认添加到mescrollId
					warpClass: "mescroll-upwarp", //容器,装载布局内容,参见mescroll.css
					htmlLoading: '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>', //上拉加载中的布局
					htmlNodata: '<p class="upwarp-nodata">小主，到底了噢~</p>', //无数据的布局
					inited: function(mescroll, upwarp) {
						console.log("up --> inited");
						//初始化完毕的回调,可缓存dom 比如 mescroll.upProgressDom = upwarp.getElementsByClassName("upwarp-progress")[0];
					},
					showLoading: function(mescroll, upwarp) {
						console.log("up --> showLoading");
						//上拉加载中.. mescroll.upProgressDom.style.display = "block" 不通过此方式显示,因为ios快速滑动到底部,进度条会无法及时渲染
						upwarp.innerHTML = mescroll.optUp.htmlLoading;
					},
					showNoMore: function(mescroll, upwarp) {
						console.log("up --> showNoMore");
						//无更多数据
						upwarp.innerHTML = mescroll.optUp.htmlNodata;
					},
					onScroll: function(mescroll, y, isUp){ //列表滑动监听,默认onScroll: null;
						//y为列表当前滚动条的位置
						console.log("up --> onScroll 列表当前滚动的距离 y = " + y + ", 是否向上滑动 isUp = " + isUp);
					},
					scrollbar: {
						use: isPC, //默认只在PC端自定义滚动条样式
						barClass: "mescroll-bar"
					}
				}
			});
    }
    getListData=(page,mescroll)=>{
        this.props.FetchAction({
            pageNow:page.num,
            pageSize:page.size,
            platform:1,
            type:1  
        },(res)=>{
            mescroll.endByPage(res.data.pageSize, res.data.totalPage);
            this.setState({
                listData:[].concat(res.data.datas,this.state.listData)
            })
        })
    }
    renderFilterBar() {
        let {filterConditions} = this.props;
        return (
            <div className="filter-bar">
                {
                    filterConditions.map((item,id)=>
                        <div className="meun" key={id}>
                            <div className={item.selected?'select':''}>{item.name}</div>
                            {
                               item.downname==item.upname?"":<div>
                               <div className={item.up?'iconfont icon-top box select':'iconfont icon-top box'}></div>
                               <div className={item.down?'iconfont icon-down box select':'iconfont icon-down box'}></div>
                           </div>
                            }
                            
                        </div>
                    )
                }
            </div>
        )
    }
  
    renderContent(){
        let {listData} = this.state;
        return (
            <div className='content'>
                <div id="mescroll" className="mescroll"> 
                    <div>
                    {
                       listData.map((item,index)=>(
                           <div className="item" key={index}>
                                ss
                           </div>
                       ))
                    }
                    </div>
                </div>
            </div> 
        )
    }
    render() {
      
        return (
            <div className="content-view">
                {this.renderFilterBar()}
                {this.renderContent()}
            </div>

        )
    }
}

export default Header