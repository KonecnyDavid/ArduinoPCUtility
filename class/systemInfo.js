import si from 'systeminformation';

const getSystemInfo = async () => {
    const currentSpeed = await si.cpuCurrentspeed();
    const temp = await si.cpuTemperature();
    const memory = await si.mem();
    const load =  await si.currentLoad();

    return {
        "cpu": {
            "avg_speed": currentSpeed.avg,
            "cores_speed": currentSpeed.cores,
        },
        "memory": {
            "total": memory.total,
            "used": memory.used
        },
        "load": {
            "current": load.currentload
        }
    };
};

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(2) + sizes[i];
 }

export const cpuInfoToLine = (info) => {

    const speed = info.cpu.avg_speed + "GHz";
    const load = info.load.current.toFixed(2) + "%";
    const loadAdj = load.length < 6 ?  " " + load : load;
    
    return `Cpu: ${loadAdj} | ${speed}`;
}

export const memoryInfoToLine = (info) => {
    const total = bytesToSize(info.memory.total);
    const used  = bytesToSize(info.memory.used);

    return `Mem: ${used}/${total}`;
}


export default getSystemInfo;