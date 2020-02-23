import SerialPort from "serialport";
import Readline from "@serialport/parser-readline";
import DeviceChanger from "./class/deviceChanger.js";
import SpotifyWebApi from "spotify-web-api-js";
import getSystemInfo, { cpuInfoToLine, memoryInfoToLine } from "./class/systemInfo.js";

const port = new SerialPort("COM6", {
  baudRate: 9600
});
const parser = new Readline();
port.pipe(parser);

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(
  "BQDoNNLAWZTraTrU8dzTY9Cisg_7FiMx3cT5ujX3HL3vLk8QiuysGk1Qa9_NXGXKhXD8fcjsqPKG_5VLeiOHST5MCHSk739GarWG-W-RunKyQn24DuK-qLQ7sFNU2vrEv8irGWyxEzSiYc415eW22dLB9G0zwkkky5A"
);

const deviceChanger = new DeviceChanger("Speakers");

parser.on("data", line => {
  if (line === "false" && deviceChanger.currentDevice !== "Speakers") {
    deviceChanger.setDevice("Speakers");
  } else if (line === "true" && deviceChanger.currentDevice !== "Headphones") {
    deviceChanger.setDevice("Headphones");
  }
});

port.on("open", () => {
  const interval = setInterval(async () => {
    const si = await getSystemInfo()
    const cpuInfo = cpuInfoToLine(si);
    const memoryInfo = memoryInfoToLine(si)

    const data = `${cpuInfo};${memoryInfo};-;-`;

    port.write(data, err => {
      if (err) {
        return console.log("Error on write: ", err.message);
      }
      console.log("Data written: " + data);
    });
  }, 2000);
});
