package sysinfo

import (
	"os"
	"os/user"
	"runtime"
)

type SystemInfo struct {
	User     string `json:"user"`
	Hostname string `json:"hostname"`
	OS       string `json:"os"`
	Arch     string `json:"arch"`
}

func GetInfo() SystemInfo {
	currentUser, err := user.Current()
	username := "Desconocido"
	if err == nil {
		username = currentUser.Username
	}

	hostname, err := os.Hostname()
	if err != nil {
		hostname = "Desconocido"
	}
	return SystemInfo{
		User:     username,
		Hostname: hostname,
		OS:       runtime.GOOS,
		Arch:     runtime.GOARCH,
	}
}
