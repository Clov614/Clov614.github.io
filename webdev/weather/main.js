// 请求地址:http://wthrcdn.etouch.cn/weather_mini
// 请求方法:get
// 请求参数:city(城市名)
// 响应内容:天气信息

// 1. 点击回车
// 2. 查询数据
// 3. 渲染数据
// https://restapi.amap.com/v3/geocode/geo
//?key=a78611edd18b27abf8211658dbf05c95&address=%E5%8E%A6%E9%97%A8
//https://restapi.amap.com/v3/weather/weatherInfo
//?key=a78611edd18b27abf8211658dbf05c95&city=350200
// extensions

// 气象类型

// 可选值：base/all

// base:返回实况天气

// all:返回预报天气

var app = new Vue({
    el: '#app',
    data: {
        key: "a78611edd18b27abf8211658dbf05c95",
        city: '',
        cityId: '',
        cityIdUrl: 'https://restapi.amap.com/v3/geocode/geo',
        weatherUrl: 'https://restapi.amap.com/v3/weather/weatherInfo',
        weatherList: [],
        week: {
            1:"星期一",
            2:"星期二",
            3:"星期三",
            4:"星期四",
            5:"星期五",
            6:"星期六",
            7:"星期日",
        },
        cityList: [
            '北京',
            '上海',
            '广州',
            '厦门',
            '泉州',
        ],
    },
    methods: {
        // 注意同步的问题
        getCityId: async function() {
            var that = this;
            await axios.get(this.cityIdUrl+'?key='+this.key+'&address='+this.city)
            .then(res => {
                // console.log(res.data.geocodes[0].adcode);
                if (res.status == 200) {
                    that.cityId = res.data.geocodes[0].adcode;
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
        searchWeather: async function() {
            var that = this;
            await this.getCityId();
            // console.log("查询天气");
            // console.log(this.city);
            await axios.get(this.weatherUrl+'?key='+this.key+'&city='+this.cityId+'&extensions='+'all')
            .then(res => {
                // console.log(res);
                // console.log(res.data.forecasts[0].casts);
                that.weatherList = res.data.forecasts[0].casts;
            })
            .catch(err => {
                console.error(err);
            })
            console.log(this.weatherList[0]);
        },
        clickCity: function(city) {
            // console.log(city);
            this.city = city;
        },
    },
})