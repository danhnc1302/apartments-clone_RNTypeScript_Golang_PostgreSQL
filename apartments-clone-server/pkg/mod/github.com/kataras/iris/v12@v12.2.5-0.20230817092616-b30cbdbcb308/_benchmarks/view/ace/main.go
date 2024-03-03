package main

import "github.com/kataras/iris/v12"

func main() {
	app := iris.New()
	// By default Ace engine minifies the template before render.
	app.RegisterView(iris.Ace("./views", ".ace").SetIndent(""))

	app.Get("/", index)

	app.Listen(":8080")
}

func index(ctx iris.Context) {
	data := iris.Map{
		"Title":      "Page Title",
		"FooterText": "Footer contents",
		"Message":    "Main contents",
	}

	ctx.ViewLayout("layouts/main")
	if err := ctx.View("index", data); err != nil {
		ctx.HTML("<h3>%s</h3>", err.Error())
		return
	}
}