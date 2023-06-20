// 获取商品列表

import Mock from "mockjs";

// 返回商品列表
Mock.mock("/api/goods", {
  code: 200,
  message: "查询成功",
  "data|50-100": [
    {
      id: "@id",
      // 标题
      title: "@ctitle(5, 10)",
      // 图片
      image: "@image(200x200, @color, @ctitle)",
      price: "@integer(100, 5000)",
      num: 1,
      category: '@pick(["手机", "笔记本", "台式电脑", "耳机", "智能设备"])',
    },
  ],
});
