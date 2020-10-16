
export class ModelEmail {
	constructor(value) {
		this.value = value;
	}
}

export class ModelMd5 {
	constructor(Md5_32, Md5_16, SN) {
		this.Md5_32 = Md5_32;
		this.Md5_16 = Md5_16;
		this.SN = SN;
	}
}

export class ModelUrl {
	constructor(url, title) {
		this.Url = url;
		this.Title = title;
	}
}

export class ModeMX {
	constructor(mx, ip) {
		this.mxr = mx;
		this.ip = ip;
	}
}

export class ModeNs {
	constructor(ns, ip) {
		this.nsr = ns;
		this.ip = ip;
	}
}

export class ModeSubDomain {
	constructor(url, ip) {
		this.url = url;
		this.ip = ip;
	}
}