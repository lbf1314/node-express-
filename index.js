const express = require("express");
const fortune = require("./lib/fortune");

var app = express();

// 配置模板引擎
const handlebars = require("express3-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// 设置端口号
app.set("port", process.env.PORT || 3000);

// 静态资源管理
app.use(express.static(__dirname + "/public"));

// 路由
app.get("/", function (req, res) {
  res.render("home");
});
app.get("/about", function (req, res) {
  res.render("about", { fortune: fortune.getFortune() });
});

// 404 catch-all 处理器（中间件）
app.use(function (req, res, next) {
  res.status(404);
  res.render("404");
});

// 500 错误处理器（中间件）
app.use(function (req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
