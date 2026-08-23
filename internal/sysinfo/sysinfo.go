package sysinfo

import (
	"os"
	"os/user"
	"runtime"
	"strings"

	"github.com/jaypipes/ghw"
	"github.com/shirou/gopsutil/v3/cpu"
)

type SystemInfo struct {
	User             string   `json:"user"`
	Hostname         string   `json:"hostname"`
	OS               string   `json:"os"`
	Arch             string   `json:"arch"`
	CpuModel         string   `json:"cpuModel"`
	CpuVendor        string   `json:"cpuVendor"`
	CpuCoresLogical  int      `json:"cpuCoresLogical"`
	CpuCoresPhysical int      `json:"cpuCoresPhysical"`
	CpuMhz           float64  `json:"cpuMhz"`
	CpuCache         int32    `json:"cpuCache"`
	Gpus             []string `json:"gpus"`
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

	// Obtener información de CPU
	cpuModel := "Desconocido"
	cpuVendor := "Desconocido"
	var cpuMhz float64 = 0
	var cpuCache int32 = 0

	cpuInfos, err := cpu.Info()
	if err == nil && len(cpuInfos) > 0 {
		cpuModel = cpuInfos[0].ModelName
		cpuVendor = cpuInfos[0].VendorID
		cpuMhz = cpuInfos[0].Mhz
		cpuCache = cpuInfos[0].CacheSize
	}

	logicalCores, _ := cpu.Counts(true)
	physicalCores, _ := cpu.Counts(false)

	// Obtener GPUs
	var gpus []string
	gpuInfo, err := ghw.GPU()
	if err == nil && gpuInfo != nil {
		for _, card := range gpuInfo.GraphicsCards {
			if card.DeviceInfo != nil {
				name := ""
				if card.DeviceInfo.Product != nil && card.DeviceInfo.Product.Name != "" && !strings.EqualFold(card.DeviceInfo.Product.Name, "unknown") {
					name = card.DeviceInfo.Product.Name
				} else if card.DeviceInfo.Vendor != nil && card.DeviceInfo.Vendor.Name != "" && !strings.EqualFold(card.DeviceInfo.Vendor.Name, "unknown") {
					name = card.DeviceInfo.Vendor.Name
				}
				if name != "" {
					gpus = append(gpus, name)
				}
			}
		}
	}

	if len(gpus) == 0 {
		gpus = append(gpus, "Desconocida")
	}

	return SystemInfo{
		User:             username,
		Hostname:         hostname,
		OS:               runtime.GOOS,
		Arch:             runtime.GOARCH,
		CpuModel:         cpuModel,
		CpuVendor:        cpuVendor,
		CpuCoresLogical:  logicalCores,
		CpuCoresPhysical: physicalCores,
		CpuMhz:           cpuMhz,
		CpuCache:         cpuCache,
		Gpus:             gpus,
	}
}

func GetCpuUsage() float64 {
	percentages, err := cpu.Percent(0, false)
	if err == nil && len(percentages) > 0 {
		return percentages[0]
	}
	return 0
}

func GetCpuCoresUsage() []float64 {
	percentages, err := cpu.Percent(0, true)
	if err == nil {
		return percentages
	}
	return []float64{}
}


