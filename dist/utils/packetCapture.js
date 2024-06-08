"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pcapSesh = void 0;
const pcap_1 = __importDefault(require("pcap"));
const pcapSesh = () => {
    const pcapSession = pcap_1.default.createSession('en0');
    let packetCount = 0;
    let protocolDistribution = {};
    let packetSizeDistribution = {};
    pcapSession.on('packet', (rawPacket) => {
        var _a, _b, _c;
        packetCount++;
        const packet = pcap_1.default.decode.packet(rawPacket);
        const protocol = (_b = (_a = packet.payload) === null || _a === void 0 ? void 0 : _a.payload) === null || _b === void 0 ? void 0 : _b.protocol;
        protocolDistribution[protocol] = (protocolDistribution[protocol] || 0) + 1;
        const packetSize = (_c = packet.pcap_header) === null || _c === void 0 ? void 0 : _c.caplen;
        packetSizeDistribution[packetSize] = (packetSizeDistribution[packetSize] || 0) + 1;
        setInterval(() => {
            console.log('-- Metrics Summary --');
            console.log(`Total Packets: ${packetCount}`);
            console.log('Protocol Distribution:');
            console.log(protocolDistribution);
            console.log('Packet Size Distribution:');
            console.log(packetSizeDistribution);
        }, 60000);
    });
};
exports.pcapSesh = pcapSesh;
