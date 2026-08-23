package main

import (
	"context"
	"sys_info_app/internal/sysinfo"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetSystemInfo() sysinfo.SystemInfo {
	return sysinfo.GetInfo()
}

func (a *App) GetCpuUsage() float64 {
	return sysinfo.GetCpuUsage()
}

func (a *App) GetCpuCoresUsage() []float64 {
	return sysinfo.GetCpuCoresUsage()
}


