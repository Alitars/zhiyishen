var option = {
  grid: {
    show: false,
    left: 40,
    right: 20,
    bottom: 40,
    top: 15,
    containLabel: false,
    borderColor: '#fff',
  },
  tooltip: {},
  xAxis: [{
    axisLabel: {
      color: '#999',
      fontSize: 13,
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false,
    },
    data: [],
  }],
  yAxis: [{
    type: 'value',
    axisTick: {
      show: false
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: '#999',
      fontSize: 13,
    }
  }],
  series: [

    {
      type: 'bar',
      animation: true,
      barWidth: 8,
      barBorderRadius: '4',
      data: [],
      label: {
        normal: {
          show: false,
          position: 'inside',
        }
      },

      itemStyle: {
        barCategoryGap: '10%',
        normal: {
          barBorderRadius: [4, 4, 4, 4],
          color: {},
        },
      },
    },
  ]
};


var pie = {
  legend: {
    // type: 'scroll',
    // orient: 'vertical',
    // right: 10,
    // top: 20,
    // bottom: 20,
    show: true,
    data:[]
    // data: ['直接访问', '邮件营销', '联盟广告', '视频广告'],
    // selected: false
  },
  tooltip: {
    formatter: ''
  },
  // xAxis: [{
  //   show: false
  // }],
  // yAxis: [{
  //   show: false
  // }],
  // yAxis: [{
  //   type: 'value',
  //   axisTick: {
  //     show: false
  //   },
  //   axisLine: {
  //     show: true,
  //   },
  //   axisLabel: {
  //     color: '#999',
  //     fontSize: 13,
  //   },
  //   // data: ['直接访问', '邮件营销', '联盟广告', '视频广告']
  // }],
  series: [{
      type: 'pie',
      radius: ['20%', '60%'],
      center: ['50%', '50%'],
      data: [],
      // type: 'pie',
      // radius: '55%',
      roseType: 'angle',
      // label: {
      //   normal: {
      //     show: false,
      //     position: 'inside',
      //   }
      // },
  
      itemStyle: {
        normal: {
          // shadowBlur: 200,
          // shadowColor: 'rgba(0, 0, 0, 0.5)',
          color: '',
        },
        label: {
          color: 'rgba(0, 0, 1)'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(0, 0, 0, 1)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        // emphasis : {
        //   color: 'rgba(0,0,0,0)'
        //  }
      },
    },
    // 中心的圆圈
    {
      radius: ['20%', '25%'],
      center: ['50%', '50%'],
      type: 'pie',
      data: [{
        // value: 0,
        itemStyle: {
          normal: {
            color: '#2b3942',
          }
        }
      }],
      animation: false
    }

  ]
};

module.exports = {
  option: option,
  pie: pie,
}