"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPcapSession = void 0;
const pcap_1 = __importDefault(require("pcap"));
const createPcapSession = () => {
    const pcapSession = pcap_1.default.createSession('en0');
    let packetCount = 0;
    let protocolDistribution = {};
    let packetSizeDistribution = {};
    pcapSession.on('packet', (rawPacket) => {
        var _a;
        packetCount++;
        const packet = pcap_1.default.decode.packet(rawPacket);
        const ethernetPacket = packet.payload;
        const ipPacket = ethernetPacket === null || ethernetPacket === void 0 ? void 0 : ethernetPacket.payload;
        const tcpPacket = ipPacket.payload;
        const srcIP = ipPacket.saddr.addr.join('.');
        const dstIP = ipPacket.daddr.addr.join('.');
        const srcPort = tcpPacket.sport;
        const dstPort = tcpPacket.dport;
        const protocol = (ipPacket === null || ipPacket === void 0 ? void 0 : ipPacket.protocol) || 'unknown';
        const packetSize = ((_a = packet.pcap_header) === null || _a === void 0 ? void 0 : _a.caplen) || 0;
        protocolDistribution[protocol] = (protocolDistribution[protocol] || 0) + 1;
        packetSizeDistribution[packetSize] = (packetSizeDistribution[packetSize] || 0) + 1;
        console.log({
            ipPacket,
            srcIP: srcIP,
            dstIP: dstIP,
            srcPort: srcPort,
            dstPort: dstPort
        });
    });
};
exports.createPcapSession = createPcapSession;
