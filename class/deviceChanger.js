import { exec } from "child_process";

export default class Device {
    constructor(defaultDevice) {
        this.currentDevice = defaultDevice;

        this.setDevice(defaultDevice);
    }

    setDevice(deviceName){
        exec(`nircmd setdefaultsounddevice \"${deviceName}\" `, (error, stdout, stderr) => {
            if (error) {
                console.log(`General ERROR: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`Execution ERROR: ${stderr}`);
                return;
            }

            console.log(`Current device: ${deviceName}`)
            this.currentDevice = deviceName;
        });

    }
}