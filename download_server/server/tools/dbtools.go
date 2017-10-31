package tools

import (
	"github.com/syndtr/goleveldb/leveldb"
	"fmt"
	"github.com/syndtr/goleveldb/leveldb/util"
)

type Item struct {
	Title string `json:"title"`
	Src string `json:"src"`
	Height int `json:"height"`
	Width int `json:"width"`
}

func PutData(key string, value string)  {
	db, err := leveldb.OpenFile("./db", nil)
	if err  != nil {
		fmt.Println(err)
	}
	defer db.Close()
	// 放值
	err = db.Put([]byte(key), []byte(value), nil)
	if err != nil {
		GLogger.Error("putdata", err)
	}
}

func GetData(key string) []byte {
	db, err := leveldb.OpenFile("./db", nil)
	if err  != nil {
		fmt.Println(err)
	}
	defer db.Close()
	// 取值
	// //记住，返回的片段的内容不应该被修改。
	data, err := db.Get([]byte(key), nil)
	fmt.Println(data)
	if err != nil {
		GLogger.Error("getdata", err)
	}
	return data
}

func GetQrcodeData() ([]Item, error) {
	db, err := leveldb.OpenFile("./db", nil)
	if err  != nil {
		fmt.Println(err)
	}
	defer db.Close()

	// map
	slice := make([]Item, 0, 1000)
	// 用特定前缀迭代数据库内容的子集：
	iter := db.NewIterator(util.BytesPrefix([]byte("qrcode_")), nil)
	for iter.Next() {
		// Use key/value.
		key := iter.Key()
		value := iter.Value()
		fmt.Println(string(key))
		fmt.Println(string(value))
		//
		item := Item{
			Title : string(key),
			Src : string(value),
			Height : 200,
			Width : 200,
		}
		slice = append(slice, item)

	}
	//将数组转化为json

	iter.Release()
	err = iter.Error()
	if err  != nil {
		fmt.Println(err)
	}
	if len(slice) == 0 {
		return []Item{}, nil
	} else  {
		return slice, nil
	}

}