# scratch-card-canvas 基于canvas刮刮卡

## 安装
``` js
npm install scratch-card-canvas
or
yarn add scratch-card-canvas
```

## 引用
``` js
import ScratchCard from 'scratch-card-canvas';
new ScratchCard({
  canvas: dom,
});
```

## 参数
| 参数 | 类型 | 说明 | 必填 | 默认 |  
| :-----| :---- | :---- | :---- | :---- |
| canvas | HTMLCanvasElement | canvas实例 | true | - |
| showAllPercent | number | 开启随机绘制比例 | false | 80 |
| radius | number | 绘制图片圆角度数 | false | 20 |
| coverColor | string | 蒙层颜色 | false | #666 |
| coverImg | string | 蒙层图片 | false | - |
| callback | function | 绘制完成回调函数 | false | void |

## 更新日志
[链接](./CHANGELOG.md)
