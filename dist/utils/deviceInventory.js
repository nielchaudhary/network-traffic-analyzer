"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeviceInventory = exports.createPcapSession = void 0;
const pcap_1 = __importDefault(require("pcap"));
const deviceInventory = [];
const createPcapSession = () => {
    const pcapSession = pcap_1.default.createSession('en0');
    pcapSession.on('packet', (rawPacket) => {
        const packet = pcap_1.default.decode.packet(rawPacket);
        const ethernet = packet.payload;
        const ip = ethernet.payload;
        const srcMac = ethernet.shost.addr.join(':');
        const dstMac = ethernet.dhost.addr.join(':');
        const srcIp = ip.saddr.addr.join('.');
        const dstIp = ip.daddr.addr.join('.');
        // Update device inventory
        updateDeviceInventory(srcMac, srcIp, rawPacket.buf.length);
        updateDeviceInventory(dstMac, dstIp, rawPacket.buf.length);
    });
};
exports.createPcapSession = createPcapSession;
const updateDeviceInventory = (macAddress, ipAddress, packetSize) => {
    let device = deviceInventory.find(dev => dev.macAddress === macAddress);
    if (!device) {
        device = {
            macAddress,
            ipAddresses: new Set(),
            traffic: 0
        };
        deviceInventory.push(device);
    }
    device.ipAddresses.add(ipAddress);
    device.traffic += packetSize;
};
const getDeviceInventory = () => {
    return deviceInventory.map(device => ({
        macAddress: device.macAddress,
        ipAddresses: Array.from(device.ipAddresses),
        traffic: device.traffic
    }));
};
exports.getDeviceInventory = getDeviceInventory;
