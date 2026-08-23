export namespace sysinfo {
	
	export class SystemInfo {
	    user: string;
	    hostname: string;
	    os: string;
	    arch: string;
	    cpuModel: string;
	    cpuVendor: string;
	    cpuCoresLogical: number;
	    cpuCoresPhysical: number;
	    cpuMhz: number;
	    cpuCache: number;
	    gpus: string[];
	
	    static createFrom(source: any = {}) {
	        return new SystemInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.user = source["user"];
	        this.hostname = source["hostname"];
	        this.os = source["os"];
	        this.arch = source["arch"];
	        this.cpuModel = source["cpuModel"];
	        this.cpuVendor = source["cpuVendor"];
	        this.cpuCoresLogical = source["cpuCoresLogical"];
	        this.cpuCoresPhysical = source["cpuCoresPhysical"];
	        this.cpuMhz = source["cpuMhz"];
	        this.cpuCache = source["cpuCache"];
	        this.gpus = source["gpus"];
	    }
	}

}

