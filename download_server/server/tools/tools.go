package tools

import (
	"os"
	"path"
	"strings"
	"github.com/keepeye/log4go"
	"time"
	"runtime"
	"path/filepath"
	"os/exec"
	"errors"
	qrcode "github.com/skip2/go-qrcode"
	"fmt"
)

var GLogger log4go.Logger

//init for logger
func InitLogger(){
	var filenameOnly string
	filenameOnly = GetCurFilename()
	var logFilename string =  filenameOnly + ".log";

	//gLogger = log4go.NewLogger()
	GLogger = make(log4go.Logger)
	//for console
	//gLogger.AddFilter("stdout", log4go.INFO, log4go.NewConsoleLogWriter())
	GLogger.AddFilter("stdout", log4go.INFO, log4go.NewConsoleLogWriter())
	//for log file
	if _, err := os.Stat(logFilename); err == nil {
		//fmt.Printf("found old log file %s, now remove it\n", logFilename)
		os.Remove(logFilename)
	}
	//gLogger.AddFilter("logfile", log4go.FINEST, log4go.NewFileLogWriter(logFilename, true))
	GLogger.AddFilter("logfile", log4go.FINEST, log4go.NewFileLogWriter(logFilename, false))
	GLogger.Info("Current time is : %s", time.Now().Format("15:04:05 MST 2006/01/02"))

	return
}

// GetCurFilename
// Get current file name, without suffix
func GetCurFilename() string {
	_, fulleFilename, _, _ := runtime.Caller(0)
	//fmt.Println(fulleFilename)
	var filenameWithSuffix string
	filenameWithSuffix = path.Base(fulleFilename)
	//fmt.Println("filenameWithSuffix=", filenameWithSuffix)
	var fileSuffix string
	fileSuffix = path.Ext(filenameWithSuffix)
	//fmt.Println("fileSuffix=", fileSuffix)

	var filenameOnly string
	filenameOnly = strings.TrimSuffix(filenameWithSuffix, fileSuffix)
	//fmt.Println("filenameOnly=", filenameOnly)

	return filenameOnly
}

// 获取当前路径
func GetCurrentPath() (string, error) {
	file, err := exec.LookPath(os.Args[0])
	if err != nil {
		return "", err
	}
	path, err := filepath.Abs(file)
	if err != nil {
		return "", err
	}
	i := strings.LastIndex(path, "/")
	if i < 0 {
		i = strings.LastIndex(path, "\\")
	}
	if i < 0 {
		return "", errors.New(`error: Can't find "/" or "\".`)
	}
	return string(path[0 : i+1]), nil
}

// 生成二维码
func GenerateQrcode(app_name string)  {
	//var png []byte
	err := qrcode.WriteFile("https://sddeznsm.com/app?app_name="+app_name, qrcode.Medium, 256, "qr_"+ app_name +".png")
	if err != nil {
		fmt.Println("error", err)
	}
	// 保存到db中
	PutData("qrcode_"+app_name, "https://sddeznsm.com/static/qr_"+ app_name +".png")

}