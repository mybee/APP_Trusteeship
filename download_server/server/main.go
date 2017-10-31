package main

import (
	"fmt"
	"github.com/devfeel/dotweb"
	"github.com/devfeel/dotweb/framework/file"
	"strconv"
	"github.com/devfeel/middleware/cors"
	. "./tools"
)

func main() {
	//初始化DotServer
	app := dotweb.New()

	//设置dotserver日志目录
	app.SetLogPath(file.GetCurrentDirectory())

	// 启用日志
	InitLogger()

	//app.HttpServer.SetEnabledListDir(true)

	//设置路由
	InitRoute(app.HttpServer)

	//启动 监控服务
	//app.SetPProfConfig(true, 8081)
	app.HttpServer.Renderer().SetTemplatePath("/root/download_server/server/", "d:/tmp")
	//app.HttpServer.Renderer().SetTemplatePath("/Users/mac/Desktop/download_server/server/", "d://temp")

	// 开始服务
	port := 9000
	fmt.Println("dotweb.StartServer => " + strconv.Itoa(port))
	err := app.StartServer(port)
	fmt.Println("dotweb.StartServer error => ", err)
}

func App(ctx dotweb.Context) error {
	ctx.Request().ParseForm()
	app_name, found1 := ctx.Request().Form["app_name"]
	if !(found1) {
		ctx.WriteString("请勿非法访问")
		return nil
	}
	GLogger.Info("访问ip:", ctx.Request().RemoteIP())
	ctx.ViewData().Set("app_name", app_name[0])
	ctx.View("index.html")
	return nil
}

func AdminView(ctx dotweb.Context)  error {
	ctx.ViewData().Set("title", "马峰")
	fmt.Println(GetCurrentPath())
	ctx.View("fileupload.html");
	return  nil
}

// 返回二维码
func Qrcode(ctx dotweb.Context) error {
	ctx.Request().ParseForm()
	callback, _ := ctx.Request().Form["callback"]
	result, err := GetQrcodeData()
	if err != nil {
		fmt.Println(err)
		return err
	}
	ctx.WriteJsonp(callback[0], result)
	return  nil
}

func FileUpload(ctx dotweb.Context) error {
	fmt.Println("调用了借口")
	ctx.Request().ParseForm()
	uptype, found1 := ctx.Request().Form["type"]
	app_name, found1 := ctx.Request().Form["app_name"]
	if !(found1) {
		ctx.WriteString("请勿非法访问")
		return nil
	}
	//ctx.FormValue()
	upload, err := ctx.Request().FormFile("file")
	if err != nil {
		ctx.WriteString("FormFile error " + err.Error())
		GLogger.Warn("FormFile error " + err.Error())
		return err
	} else {
		path, err := GetCurrentPath()
		fmt.Println("path" + path)
		if err != nil {
			GLogger.Warn("GetCurrentPath err", err)
			return err
		}
		_, err = upload.SaveFile(path+ uptype[0] + "/" + app_name[0] + upload.GetFileExt())
		if err != nil {
			ctx.WriteString("SaveFile error => " + err.Error())
			GLogger.Info("SaveFile error => " + err.Error())
			return err
		} else {
			// 存到数据kv
			PutData(app_name[0] + uptype[0], "https://sddeznsm.com/static/"+ uptype[0] + "/" + app_name[0] + upload.GetFileExt())
			fmt.Println(string(GetData(app_name[0] + uptype[0])))
			//ctx.WriteString("SaveFile success || " + app_name[0] + upload.GetFileExt() + " || " + upload.GetFileExt() + " || " + fmt.Sprint(upload.Size()))
			ctx.Response().SetStatusCode(200)
			GLogger.Info("SaveFile success || " + app_name[0] + upload.GetFileExt() + " || " + upload.GetFileExt() + " || " + fmt.Sprint(upload.Size()))
			// 生成二维码
			if uptype[0] == "plists" {
				GenerateQrcode(app_name[0])
			}
			return nil
		}
	}

}

func InitRoute(server *dotweb.HttpServer) {
	// enable cors
	option := cors.NewConfig().UseDefault()
	server.GET("/app", App)
	server.GET("/admin", AdminView)
	server.POST("/file", FileUpload).Use(cors.Middleware(option))
	server.GET("/qrcode", Qrcode)
	server.Router().ServerFile("/static/*filepath", "/root/download_server/server/")
	//server.ServerFile("/static/*filepath", "/Users/mac/Desktop/download_server/server/").Use(cors.Middleware(option))
}


