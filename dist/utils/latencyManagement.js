"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.latencyManagement = void 0;
const net_1 = __importDefault(require("net"));
const latencyMetrics = {
    sentPackets: 0,
    receivedPackets: 0,
    rttTimes: []
};
const serverAddress = '127.0.0.1';
const serverPort = 3000;
const latencyManagement = () => {
    const sendPing = () => {
        const startTime = Date.now();
        const client = net_1.default.createConnection({ host: serverAddress, port: serverPort }, () => {
            const rtt = Date.now() - startTime;
            latencyMetrics.sentPackets++;
            latencyMetrics.receivedPackets++;
            latencyMetrics.rttTimes.push(rtt);
            console.log(`Received response in ${rtt}ms`);
            client.end();
        });
        client.on('error', (err) => {
            console.error('Error connecting to server:', err);
            client.end();
        });
    };
    const calculatePacketLoss = () => {
        const packetLoss = ((latencyMetrics.sentPackets - latencyMetrics.receivedPackets) / latencyMetrics.sentPackets) * 100;
        return packetLoss.toFixed(2);
    };
    const calculateAverageRTT = () => {
        const totalRTT = latencyMetrics.rttTimes.reduce((acc, curr) => acc + curr, 0);
        return (totalRTT / latencyMetrics.rttTimes.length).toFixed(2);
    };
    const printMetrics = () => {
        console.log('-- Latency and Packet Loss Metrics --');
        console.log(`Sent Packets: ${latencyMetrics.sentPackets}`);
        console.log(`Received Packets: ${latencyMetrics.receivedPackets}`);
        console.log(`Packet Loss: ${calculatePacketLoss()}%`);
        console.log(`Average RTT: ${latencyMetrics.rttTimes.length > 0 ? calculateAverageRTT() : 'N/A'}ms`);
    };
    setInterval(sendPing, 1000);
    setInterval(printMetrics, 5000);
};
exports.latencyManagement = latencyManagement;
